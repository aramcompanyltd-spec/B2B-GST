

import React, { useMemo } from 'react';
import type { AccountCategory } from '../types';

interface SummaryProps {
    data: any[];
    categories: { [key: string]: { type: 'income' | 'expense' } };
    accountTable: AccountCategory[];
    clientName: string;
}

interface SummaryData {
    total: number;
    gst: number;
    items: {
        [key: string]: {
            total: number;
            gst: number;
            gstRatio: number;
        }
    }
}

const SummaryCard: React.FC<{ title: string; data: SummaryData }> = ({ title, data }) => {
    const sortedItems = useMemo(() => {
        // With customizable categories, a simple alphabetical sort is more robust.
        return Object.entries(data.items).sort((a, b) => a[0].localeCompare(b[0]));
    }, [data.items]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm text-gray-800">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left font-medium text-gray-500 py-2 px-2">Category</th>
                        <th className="text-right font-medium text-gray-500 py-2 px-2">Total</th>
                        <th className="text-right font-medium text-gray-500 py-2 px-2">GST</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map(([cat, values]: [string, { total: number; gst: number; gstRatio: number }]) => (
                        <tr key={cat} className="odd:bg-gray-50">
                            <td className="py-2 px-2 text-gray-900">{cat}</td>
                            <td className="text-right py-2 px-2 text-gray-900">${Math.abs(values.total).toFixed(2)}</td>
                            <td className="text-right py-2 px-2 text-gray-900">${values.gst.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="border-t-2 font-bold">
                        <td className="py-2 px-2 text-gray-900">Total</td>
                        <td className="text-right py-2 px-2 text-gray-900">${Math.abs(data.total).toFixed(2)}</td>
                        <td className="text-right py-2 px-2 text-gray-900">${Math.abs(data.gst).toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

const SummarySection: React.FC<SummaryProps> = ({ data, categories, accountTable, clientName }) => {
  const summary = useMemo(() => {
    const initial: { sales: SummaryData; expenses: SummaryData } = {
      sales: { total: 0, gst: 0, items: {} },
      expenses: { total: 0, gst: 0, items: {} },
    };

    data.forEach(tx => {
      const categoryInfo = categories[tx.category];
      if (!categoryInfo) return; // Skip if category is somehow invalid

      let summaryGroup: 'sales' | 'expenses';

      if (tx.category === 'Transfers') {
        summaryGroup = tx.Amount > 0 ? 'sales' : 'expenses';
      } else {
        summaryGroup = categoryInfo.type === 'income' ? 'sales' : 'expenses';
      }
      
      initial[summaryGroup].total += tx.Amount;
      initial[summaryGroup].gst += tx.gstAmount;

      if (!initial[summaryGroup].items[tx.category]) {
        initial[summaryGroup].items[tx.category] = { total: 0, gst: 0, gstRatio: tx.gstRatio };
      }
      
      initial[summaryGroup].items[tx.category].total += tx.Amount;
      initial[summaryGroup].items[tx.category].gst += tx.gstAmount;
    });

    return initial;
  }, [data, categories]);

  const handleDownload = (format: 'csv' | 'xlsx') => {
    const journalData: { Account: string; debit: string | number; credit: string | number }[] = [];
    const salesItems = summary.sales.items as { [key: string]: { total: number, gst: number } };
    const expensesItems = summary.expenses.items as { [key: string]: { total: number, gst: number } };
    
    let subtotalDebit = 0;
    let subtotalCredit = 0;

    // Sales (excluding transfers)
    Object.entries(salesItems).forEach(([category, values]) => {
        if (category !== 'Transfers') {
            const exclusiveAmount = values.total - values.gst;
            journalData.push({ Account: category, debit: '', credit: exclusiveAmount.toFixed(2) });
            subtotalCredit += exclusiveAmount;
        }
    });

    // Expenses (excluding transfers)
    Object.entries(expensesItems).forEach(([category, values]) => {
        if (category !== 'Transfers') {
            const exclusiveAmount = Math.abs(values.total) - values.gst;
            journalData.push({ Account: category, debit: exclusiveAmount.toFixed(2), credit: '' });
            subtotalDebit += exclusiveAmount;
        }
    });

    // GST
    const totalSalesGst = Object.entries(salesItems)
        .filter(([cat]) => cat !== 'Transfers')
        .reduce((sum, [, item]) => sum + item.gst, 0);
    const totalExpensesGst = Object.entries(expensesItems)
        .filter(([cat]) => cat !== 'Transfers')
        .reduce((sum, [, item]) => sum + item.gst, 0);

    if (totalExpensesGst > 0) {
        journalData.push({ Account: 'GST Payment or Refund', debit: totalExpensesGst.toFixed(2), credit: '' });
        subtotalDebit += totalExpensesGst;
    }
    if (totalSalesGst > 0) {
        journalData.push({ Account: 'GST Payment or Refund', debit: '', credit: totalSalesGst.toFixed(2) });
        subtotalCredit += totalSalesGst;
    }
    
    const accountOrder = accountTable.reduce((acc, cat, index) => {
        acc[cat.name] = index;
        return acc;
    }, {} as { [key: string]: number });

    journalData.sort((a, b) => {
        const orderA = accountOrder[a.Account] ?? Infinity;
        const orderB = accountOrder[b.Account] ?? Infinity;
        return orderA - orderB;
    });

    // Transfers
    const transferCredit = salesItems['Transfers'] ? (salesItems['Transfers'].total - salesItems['Transfers'].gst) : 0;
    const transferDebit = expensesItems['Transfers'] ? (Math.abs(expensesItems['Transfers'].total) - expensesItems['Transfers'].gst) : 0;
    const netTransfer = transferCredit - transferDebit;

    const finalTransferDebit = netTransfer < 0 ? Math.abs(netTransfer) : 0;
    const finalTransferCredit = netTransfer > 0 ? netTransfer : 0;

    const totalDebit = subtotalDebit + finalTransferDebit;
    const totalCredit = subtotalCredit + finalTransferCredit;

    // Add summary rows
    journalData.push({ Account: '', debit: '', credit: '' }); // Spacer
    journalData.push({ Account: 'Subtotal', debit: subtotalDebit.toFixed(2), credit: subtotalCredit.toFixed(2) });
    journalData.push({ Account: 'Transfers', debit: finalTransferDebit > 0 ? finalTransferDebit.toFixed(2) : '-', credit: finalTransferCredit > 0 ? finalTransferCredit.toFixed(2) : '-' });
    journalData.push({ Account: 'Total', debit: totalDebit.toFixed(2), credit: totalCredit.toFixed(2) });
    journalData.push({ Account: '', debit: '0.00', credit: '0.00' }); // Final check row as in image

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
    const safeClientName = clientName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `${safeClientName}_journal_${timestamp}`;

    if (format === 'csv') {
        const csv = (window as any).Papa.unparse(journalData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (format === 'xlsx') {
        const worksheet = (window as any).XLSX.utils.json_to_sheet(journalData);
        const workbook = (window as any).XLSX.utils.book_new();
        (window as any).XLSX.utils.book_append_sheet(workbook, worksheet, "Journal");
        (window as any).XLSX.writeFile(workbook, `${filename}.xlsx`);
    }
  };

  return (
    <div>
        <div className="flex justify-end items-center mb-4 space-x-2">
            <span className="text-sm font-medium text-gray-700">Download Journal:</span>
            <button onClick={() => handleDownload('csv')} className="text-sm bg-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-300">CSV</button>
            <button onClick={() => handleDownload('xlsx')} className="text-sm bg-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-300">Excel</button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <SummaryCard title="Sales & Income" data={summary.sales} />
            <SummaryCard title="Purchases & Expenses" data={summary.expenses} />
        </div>
    </div>
  );
};

export default SummarySection;