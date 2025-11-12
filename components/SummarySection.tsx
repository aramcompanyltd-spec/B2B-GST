import React, { useMemo } from 'react';

interface SummaryProps {
    data: any[];
    categories: { [key: string]: { type: 'income' | 'expense' } };
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

const SummarySection: React.FC<SummaryProps> = ({ data, categories }) => {
  const summary = useMemo(() => {
    const initial: { sales: SummaryData; expenses: SummaryData } = {
      sales: { total: 0, gst: 0, items: {} },
      expenses: { total: 0, gst: 0, items: {} },
    };

    data.forEach(tx => {
      const categoryInfo = categories[tx.category];
      if (!categoryInfo) return; // Skip if category is somehow invalid

      const summaryGroup: 'sales' | 'expenses' = categoryInfo.type === 'income' ? 'sales' : 'expenses';
      
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

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SummaryCard title="Sales & Income" data={summary.sales} />
      <SummaryCard title="Purchases & Expenses" data={summary.expenses} />
    </div>
  );
};

export default SummarySection;