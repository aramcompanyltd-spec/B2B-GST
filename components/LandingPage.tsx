

import React, { useState, PropsWithChildren } from 'react';
import AuthScreen from './AuthScreen';

const NavHeader = ({ onSignIn, onSignUp, onGoHome, onNavClick }: { onSignIn: () => void; onSignUp: () => void; onGoHome: () => void, onNavClick: (id: string) => void; }) => (
    <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-800 cursor-pointer whitespace-nowrap" onClick={onGoHome}>
                NZ GST <span className="text-blue-600">Simple</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
                <button onClick={() => onNavClick('features')} className="text-gray-600 hover:text-blue-600">Features</button>
                <button onClick={() => onNavClick('how-it-works')} className="text-gray-600 hover:text-blue-600">How It Works</button>
                <button onClick={() => onNavClick('faq')} className="text-gray-600 hover:text-blue-600">FAQ</button>
                <button onClick={() => onNavClick('contact')} className="text-gray-600 hover:text-blue-600">Contact</button>
            </nav>
            <div className="flex items-center space-x-2 md:space-x-4">
                <button onClick={onSignIn} className="text-gray-600 font-medium hover:text-blue-600 text-sm md:text-base whitespace-nowrap">Sign In</button>
                <button onClick={onSignUp} className="bg-blue-600 text-white px-3 md:px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors text-sm md:text-base whitespace-nowrap">Sign up</button>
            </div>
        </div>
    </header>
);

const Hero = ({ onSignUp }: { onSignUp: () => void; }) => (
    <section className="relative text-white py-20 md:py-32" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">복잡한 뉴질랜드 GST 신고 이제 쉽게하세요.</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                가장 스마트한 자동 GST 계산 솔루션입니다. 은행 거래 내역 CSV 파일을 한 번만 업로드하여 소중한 시간을 절약하세요.
            </p>
            <button onClick={onSignUp} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                지금 바로 시작하기
            </button>
        </div>
    </section>
);

const HowItWorks = () => {
    const steps = [
        { num: 1, title: '업로드', description: "은행 거래 내역 CSV 또는 엑셀 파일을 드래그 앤 드롭으로 간편하게 올리세요." },
        { num: 2, title: '검토', description: "NZ GST Simple이 모든 거래를 자동으로 분류하고 GST를 계산합니다. 직관적인 대시보드에서 결과를 검토하고 필요에 따라 수정하세요." },
        { num: 3, title: '다운로드', description: "완성된 GST 보고서를 CSV 또는 엑셀 파일로 다운로드하여 IRD 신고를 준비하세요. 개인 정보 보호를 위해 귀하의 데이터는 저장되지 않습니다." }
    ];

    return (
        <section id="how-it-works" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">3가지 간단한 단계로 GST 신고 준비를 끝내세요</h2>
                    <p className="text-gray-600 mt-2">처음부터 끝까지, 간편하고 정확하게.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-10 text-center">
                    {steps.map(step => (
                        <div key={step.num} className="bg-white p-8 rounded-lg shadow-md">
                            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">{step.num}</div>
                            <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Features = () => {
    const featuresData = [
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: "은행 CSV 자동 분석", description: "ASB, BNZ, ANZ, Westpac, Kiwibank 등 뉴질랜드 주요 은행을 지원하며 파일 형식을 자동으로 인식합니다." },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: "AI 기반 자동 분류", description: "지능적인 규칙이 수백 건의 거래를 수입, 구매, 비용 카테고리로 즉시 분류합니다." },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>, title: "편리한 일괄 편집", description: "여러 항목을 한 번에 선택하여 카테고리나 GST 세율을 변경하고, 수동 수정 시간을 획기적으로 줄이세요." },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>, title: "실시간 GST 계산", description: "변경 사항이 발생할 때마다 납부 또는 환급받을 GST 금액이 즉시 재계산되어 대시보드에 표시됩니다." },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>, title: "시각적 대시보드", description: "색상으로 구분된 카드와 차트를 통해 수입, 구매, 비용 내역을 한눈에 명확하게 파악하세요." },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: "안전한 클라우드 관리", description: "모든 데이터는 SSL 암호화가 적용된 Google Firebase 플랫폼에서 안전하게 관리되며, 오직 귀하만 정보에 접근할 수 있습니다." },
    ];
    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">강력하고 스마트한 기능</h2>
                    <p className="text-gray-600 mt-2">스트레스 없는 GST 신고를 위해 필요한 모든 것.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresData.map(feature => (
                        <div key={feature.title} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">{feature.icon}</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FaqItem = ({ q, a }: { q: string, a: string }) => (
    <details className="border-b last:border-b-0 py-4">
        <summary className="font-semibold text-lg cursor-pointer hover:text-blue-600">{q}</summary>
        <p className="mt-2 text-gray-600 leading-relaxed">{a}</p>
    </details>
);


const FAQ = () => (
    <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">자주 묻는 질문</h2>
            </div>
            <div className="max-w-3xl mx-auto">
                <FaqItem
                    q="제 금융 데이터는 안전한가요?"
                    a="고객님의 개인 정보 보호는 최우선입니다. NZ GST Simple은 모든 파일을 웹 브라우저에서 직접 처리합니다. 저희는 고객님의 금융 거래 데이터를 서버에 업로드하거나 저장하지 않습니다. 브라우저 탭을 닫으면 데이터는 사라집니다. 이러한 설계는 최고 수준의 보안과 기밀성을 보장합니다."
                />
                 <FaqItem
                    q="업로드한 파일은 처리 후 어떻게 되나요?"
                    a="파일은 서버에 절대 업로드되지 않습니다. 파일 읽기, 거래 분류, GST 계산 등 모든 과정은 사용자의 컴퓨터 브라우저 내에서 로컬로 이루어집니다. 즉, 민감한 금융 정보가 기기를 떠나지 않으므로 완벽한 개인 정보 보호가 가능합니다."
                />
                <FaqItem
                    q="뉴질랜드의 GST는 무엇이며, 누가 등록해야 하나요?"
                    a="GST(상품 및 서비스세)는 뉴질랜드 대부분의 상품과 서비스에 부과되는 15%의 세금입니다. 연간 매출이 $60,000를 초과하거나 초과할 것으로 예상되는 사업자는 IRD에 GST를 등록해야 합니다. 사업 비용에 대한 GST를 환급받기 위해 자발적으로 등록할 수도 있습니다."
                />
                <FaqItem
                    q="GST 신고는 얼마나 자주 해야 하나요?"
                    a="신고 주기는(매월, 2개월, 6개월) 연간 매출액에 따라 다릅니다. 대부분의 소규모 사업자는 2개월마다 신고합니다. 매출액이 $500,000 미만인 경우 6개월 주기를 선택할 수 있습니다. NZ GST Simple을 사용하면 어떤 기간에 대한 보고서든 쉽게 생성할 수 있습니다."
                />
                <FaqItem
                    q="자동으로 잘못 분류된 거래를 수정할 수 있나요?"
                    a="물론입니다. 저희 시스템은 매우 정확하지만, 어떤 분류든 쉽게 수정할 수 있습니다. 개별 거래의 '수정' 버튼을 클릭하여 변경하거나, '일괄 수정' 기능을 사용하여 여러 거래를 한 번에 변경할 수 있습니다."
                />
                <FaqItem
                    q="차량 유지비와 접대비의 GST 공제율이 다른 이유는 무엇인가요?"
                    a="뉴질랜드 세법에 따라 일부 비용은 GST 공제에 제한이 있습니다. 예를 들어, 접대비는 일반적으로 50% 공제로 제한되며, 사업 및 개인 용도로 함께 사용되는 차량 유지비에는 특정 조정 규칙이 적용됩니다. 저희 시스템은 정확성을 보장하기 위해 이러한 표준 세율을 자동으로 적용합니다."
                />
                <FaqItem
                    q="자동 분류는 얼마나 정확한가요?"
                    a="저희 AI 기반 분류 엔진은 일반적인 뉴질랜드 사업 거래를 기반으로 한 정교한 규칙을 사용하여 높은 정확도를 자랑합니다. 하지만 항상 분류된 거래를 검토하는 것을 권장합니다. 사용하기 쉬운 개별 및 일괄 편집 도구를 사용하면 완벽한 GST 신고를 위해 필요한 모든 조정을 간단하게 할 수 있습니다."
                />
                <FaqItem
                    q="제 은행이 목록에 없거나 파일 형식이 다르면 어떻게 하나요?"
                    a="저희 시스템은 유연하게 설계되었으며 현재 모든 뉴질랜드 주요 은행의 표준 CSV/XLSX 형식을 지원합니다. 특정 파일에 문제가 발생하면 고객 지원팀에 문의해 주세요. 저희는 호환성을 개선하고 다양한 은행 형식을 지원하기 위해 지속적으로 노력하고 있습니다."
                />
            </div>
        </div>
    </section>
);

// FIX: Used PropsWithChildren to correctly type the component, resolving errors with the children prop.
// FIX: Refactored `LegalPageWrapper` to use a named interface for props to resolve TypeScript error.
interface LegalPageWrapperProps {
    title: string;
    onBack: () => void;
}

const LegalPageWrapper = ({ title, children, onBack }: PropsWithChildren<LegalPageWrapperProps>) => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
                 <button onClick={onBack} className="mb-8 text-blue-600 hover:underline flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    홈으로 돌아가기
                </button>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">{title}</h2>
                <div className="prose max-w-none bg-gray-50 p-8 rounded-lg shadow-md">
                    {children}
                </div>
            </div>
        </div>
    </section>
);

const TermsPage = ({ onBack }: { onBack: () => void }) => (
    <LegalPageWrapper title="이용약관" onBack={onBack}>
        <h4><strong>서비스 개요</strong></h4>
        <p>본 서비스 "NZ GST Simple"은 은행 거래 내역 파일(CSV/XLSX)을 처리하여 뉴질랜드 사업자의 상품 및 서비스세(GST) 신고서 계산을 돕는 자동화된 도구를 제공합니다.</p>
        <h4><strong>사용자 계정</strong></h4>
        <p>귀하는 귀하의 계정 및 비밀번호의 기밀을 유지하고 컴퓨터에 대한 접근을 제한할 책임이 있습니다. 귀하는 귀하의 계정 또는 비밀번호 하에서 발생하는 모든 활동에 대한 책임을 수락하는 데 동의합니다. 귀하는 당사에 제공하는 세부 정보가 정확하고 완전한지 확인해야 합니다.</p>
        <h4><strong>결제 및 크레딧</strong></h4>
        <p>본 서비스는 다양한 구독 플랜 또는 크레딧 시스템 하에서 제공될 수 있습니다. 귀하가 구매하는 모든 구독 플랜 또는 크레딧 구매에 대해 결제가 이루어져야 합니다. 디지털 서비스의 특성상 서비스가 이용된 후에는 구매에 대한 환불을 제공하지 않습니다.</p>
        <h4><strong>사용자 책임</strong></h4>
        <p>귀하는 업로드하는 데이터의 정확성과 완전성에 대해 전적인 책임을 집니다. "NZ GST Simple"은 회계 지원 도구이며 전문적인 세무 조언을 대체하지 않습니다. IRD에 대한 GST 신고서의 정확성과 제출에 대한 최종 책임은 사용자에게 있습니다.</p>
        <h4><strong>서비스 제한 및 중단</strong></h4>
        <p>당사는 유지보수 또는 기타 운영상의 이유로 서비스를 수시로 중단해야 할 수 있습니다. 또한 귀하가 본 약관을 위반한 것으로 확인될 경우 귀하의 계정을 중단하거나 해지할 권리를 보유합니다.</p>
        <h4><strong>면책 조항</strong></h4>
        <p>당사는 제공되는 계산 및 정보의 정확성을 보장하기 위해 모든 노력을 기울이지만, "NZ GST Simple"은 어떠한 보증 없이 "있는 그대로" 제공됩니다. 당사는 당사 서비스 이용으로 인해 발생하는 모든 재정적 손실이나 손해에 대해 책임을 지지 않습니다.</p>
        <h4><strong>준거법</strong></h4>
        <p>본 이용약관은 뉴질랜드 법률에 따라 규율되고 해석됩니다.</p>
    </LegalPageWrapper>
);

const PrivacyPage = ({ onBack }: { onBack: () => void }) => (
    <LegalPageWrapper title="개인정보처리방침" onBack={onBack}>
        <h4><strong>수집하는 정보</strong></h4>
        <ul>
            <li><strong>가입 시:</strong> 이름 및 이메일 주소.</li>
            <li><strong>프로필 정보(선택 사항):</strong> 주소, 전화번호.</li>
            <li><strong>서비스 이용 중:</strong> 업로드한 파일의 거래 데이터(가능한 경우 이 데이터를 비식별화하기 위해 노력합니다), IP 주소 및 브라우저 유형.</li>
        </ul>
        <h4><strong>정보의 사용</strong></h4>
        <p>당사는 수집한 정보를 서비스 제공 및 개선, 고객 지원, 마케팅 커뮤니케이션(수신 거부 가능)을 위해 사용합니다.</p>
        <h4><strong>정보 공유</strong></h4>
        <p>당사는 법률에 의해 요구되거나 Google Firebase와 같이 당사 서비스 운영을 지원하는 신뢰할 수 있는 파트너와 함께하는 경우를 제외하고는 개인 식별 정보를 제3자와 공유하지 않습니다. 이러한 파트너는 기밀 유지 의무를 준수합니다.</p>
        <h4><strong>데이터 보안</strong></h4>
        <p>당사는 귀하의 데이터를 보호하기 위해 최선을 다하고 있습니다. 당사는 Google Firebase 플랫폼의 보안 기능을 활용하고 자체 접근 제어를 구현하여 귀하의 정보를 보호합니다.</p>
        <h4><strong>사용자 권리</strong></h4>
        <p>뉴질랜드의 개인정보보호법 2020에 따라 귀하는 귀하의 개인 정보에 접근, 수정 또는 삭제를 요청할 권리가 있습니다.</p>
        <h4><strong>쿠키 정책</strong></h4>
        <p>당사는 사이트 운영 및 관리, 그리고 귀하의 경험 개선을 위해 쿠키를 사용합니다. 쿠키는 웹사이트에서 귀하의 브라우저로 전송되는 정보 조각입니다.</p>
        <h4><strong>연락처 정보</strong></h4>
        <p>개인 정보와 관련하여 질문이나 우려 사항이 있는 경우, <a href="mailto:contact@gstsimple.co.nz">contact@gstsimple.co.nz</a>로 문의해 주십시오.</p>
    </LegalPageWrapper>
);

const AboutPage = ({ onBack }: { onBack: () => void }) => (
    <LegalPageWrapper title="회사 소개" onBack={onBack}>
        <h4><strong>우리의 미션</strong></h4>
        <p>NZ GST Simple의 미션은 GST 준수의 복잡성을 단순화하여 뉴질랜드의 소규모 사업체, 프리랜서, 개인 사업자를 지원하는 것입니다. 저희는 세금 관리가 성공의 장벽이 되어서는 안 된다고 믿습니다. 시간을 절약하고 스트레스를 줄여주는 직관적이고 정확하며 안전한 도구를 제공하여, 귀하가 가장 잘하는 일인 사업 운영에 집중할 수 있도록 돕는 데 전념하고 있습니다.</p>
        <h4><strong>회사 소개</strong></h4>
        <p>저희는 뉴질랜드에 기반을 둔 열정적인 개발자 및 금융 전문가 팀입니다. 간단하고 현대적인 GST 신고 도구가 부족하다는 점에 불만을 느끼고, 우리가 원했던 솔루션을 직접 만들기로 결정했습니다. 최첨단 기술과 뉴질랜드 세금 시스템에 대한 깊은 이해를 결합하여 강력하면서도 놀랍도록 사용하기 쉬운 제품을 만듭니다.</p>
        <h4><strong>핵심 가치</strong></h4>
        <ul>
            <li><strong>단순성:</strong> 저희는 소프트웨어를 간단하고 사용자 친화적으로 설계합니다. 회계 용어나 복잡한 설정이 없습니다.</li>
            <li><strong>정확성:</strong> 저희 시스템은 최신 뉴질랜드 세법 규칙을 기반으로 구축되어 계산의 신뢰성을 보장합니다.</li>
            <li><strong>보안:</strong> 귀하의 금융 데이터는 민감합니다. 저희는 Google의 안전한 Firebase 플랫폼을 활용하여 업계 최고의 보안 관행을 사용하여 귀하의 정보를 안전하고 비공개로 유지합니다.</li>
            <li><strong>고객 중심:</strong> 저희는 서비스를 개선하고 중요한 기능을 추가하기 위해 귀하와 같은 사용자로부터의 피드백을 지속적으로 듣고 있습니다.</li>
        </ul>
        <h4><strong>연락처</strong></h4>
        <p>이 여정에 함께하게 되어 기쁩니다. 질문, 피드백 또는 제안 사항이 있으시면 언제든지 저희에게 연락해 주십시오. 귀하의 의견은 모두를 위한 더 나은 도구를 만드는 데 도움이 됩니다.</p>
    </LegalPageWrapper>
);

const Footer = ({ onShowTerms, onShowPrivacy, onShowAbout }: { onShowTerms: () => void; onShowPrivacy: () => void; onShowAbout: () => void; }) => (
    <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-bold mb-2">NZ GST Simple</h3>
                    <p className="text-gray-400">Making GST filing easier.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Links</h4>
                    <ul className="space-y-2">
                        <li><button onClick={onShowAbout} className="text-gray-400 hover:text-white text-left">About Us</button></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-3">Legal</h4>
                    <ul className="space-y-2">
                        <li><button onClick={onShowTerms} className="text-gray-400 hover:text-white text-left">Terms and Conditions</button></li>
                        <li><button onClick={onShowPrivacy} className="text-gray-400 hover:text-white text-left">Privacy Policy</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Contact</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="mailto:info@webpole.co.nz" className="hover:text-white">info@webpole.co.nz</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} NZ GST Simple. All rights reserved.
            </div>
        </div>
    </footer>
);

export default function LandingPage() {
    const [showAuth, setShowAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [activeView, setActiveView] = useState<'main' | 'terms' | 'privacy' | 'about'>('main');

    const openAuth = (loginMode: boolean) => {
        setIsLogin(loginMode);
        setShowAuth(true);
    };

    const handleGoHome = () => {
        setActiveView('main');
        window.scrollTo(0, 0);
    };
    
    const handleShowInfoPage = (view: 'terms' | 'privacy' | 'about') => {
        setActiveView(view);
        window.scrollTo(0, 0);
    };

    const handleNavClick = (targetId: string) => {
        if (activeView !== 'main') {
            setActiveView('main');
            // Wait for the main view to render before scrolling
            setTimeout(() => {
                document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        } else {
             document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const renderContent = () => {
        switch (activeView) {
            case 'terms':
                return <TermsPage onBack={handleGoHome} />;
            case 'privacy':
                return <PrivacyPage onBack={handleGoHome} />;
            case 'about':
                return <AboutPage onBack={handleGoHome} />;
            default:
                return (
                    <>
                        <Hero onSignUp={() => openAuth(false)} />
                        <HowItWorks />
                        <Features />
                        <FAQ />
                    </>
                );
        }
    };

    return (
        <div className="bg-white text-gray-800 antialiased">
            {showAuth && <AuthScreen initialIsLogin={isLogin} onClose={() => setShowAuth(false)} />}
            
            <NavHeader 
                onSignIn={() => openAuth(true)} 
                onSignUp={() => openAuth(false)}
                onGoHome={handleGoHome}
                onNavClick={handleNavClick}
            />
            
            <main>
                {renderContent()}
            </main>

            <Footer 
                onShowTerms={() => handleShowInfoPage('terms')} 
                onShowPrivacy={() => handleShowInfoPage('privacy')}
                onShowAbout={() => handleShowInfoPage('about')}
            />
        </div>
    );
}