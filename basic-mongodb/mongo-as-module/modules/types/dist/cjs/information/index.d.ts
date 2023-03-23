/** 통화종류 */
export declare type Currency = 'KRW' | 'USD' | 'JPY' | 'EUR' | 'CNY' | 'GBP' | 'RUB';
/**상장시장 종류 */
export declare type FiStandard = 'K-GAAP' | 'IFRS';
/**상장시장 종류 */
export declare type StockMarket = 'KOSPI' | 'KOSDAQ' | 'KONEX' | 'NASDAQ' | 'none';
/**기업 크기 유형 */
export declare type EnterpriseSize = 'smallMediumEnterprises' | 'mediumLargeEnterprises' | 'largeEnterprises' | 'unknown';
/**TCB인증 종류 */
export declare type TCBCertificationType = 'investment' | 'etc';
/**TCB인증기관 */
export declare type TCBCertificationIssuedOrganization = 
/** 기술보증기금 */
'kibo'
/** 나이스디엔비 */
 | 'nicednb'
/** 나이스평가정보 */
 | 'niceinfo'
/** 이크레더블 */
 | 'ecredible'
/** 한국기업데이터 */
 | 'ked'
/** 한국기업평가 */
 | 'korearatings';
/**TCB인증 등급 */
export declare type TCBCertificationGrade = 'TI1' | 'TI2' | 'TI3' | 'TI4' | 'TI5' | 'TI6' | 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6';
/**피투자회사가 요청 받은 투자회사 레포트요청 상태 */
export declare type InvesteeInvestorReportState = 'receive' | 'write' | 'send' | 'reject' | 'hold' | 'back' | 'recall';
/**피투자회사가 요청 받은 투자회사 레포트 문서 상태 */
export declare type InvesteeInvestorReportDocumentState = 'ready' | 'write' | 'complete';
/**투자회사에서 요청하는 피투자회사 레포트 문서 상태 */
export declare type InvestmentInvesteeReportDocumentState = 'temp' | 'send' | 'close' | 'delete';
/**투자회사에서 요청하는 피투자회사 레포트의 요청 상태 */
export declare type InvestmentInvesteeReportReceiptState = 'wait' | 'origin' | 'temp' | 'confirm' | 'reject';
/**투자회사에서 요청하는 피투자회사 레포트 상태 */
export declare type InvestmentInvesteeReportState = 'temp' | 'send' | 'close' | 'delete' | 'recall';
export declare type SystemCompanyServiceType = 'hosting' | 'local' | 'premium';
export declare type SystemCompanyType = 'investor' | 'investee';
/**투자모듈: 피투자회사에서 수령받은 보고서 상태 */
export declare type InvestmentInvesteeReportDocumentType = 
/**원본 */
'origin'
/**검토중 */
 | 'temp'
/**확정 */
 | 'confirm';
/**투자모듈 : 펀드 Exit 방안 */
export declare type InvestmentFundReportExitPlan = 
/** IPO */
'ipo'
/** M&A */
 | 'm&a'
/** 구주매각 */
 | 'shareSales'
/** 기타 */
 | 'etc'
/** 선택없음 */
 | 'blank';
/**투자모듈 : 펀드(조합) 상태값 */
export declare type InvestmentFundState = 
/**결성전 */
'beforeOperate'
/**운영중 */
 | 'operate'
/**청산중 */
 | 'beforeClearing'
/**청산완료 */
 | 'clearing';
/**투자모듈 : LP보고서 문서 상태값 */
export declare type InvestmentFundReportDocumentState = 
/** 생성 */
'create'
/**작성중 */
 | 'writing'
/**확정 */
 | 'closing';
//# sourceMappingURL=index.d.ts.map