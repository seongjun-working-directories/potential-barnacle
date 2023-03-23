import type { InformationTypes } from '../../index';
declare type Currency = InformationTypes.Currency;
export interface FundReportDocument<_ID = string> {
    /** 투자기업 회사개요 */
    companyOverview: {
        /** 피투자회사 Document ID */
        investeeId: _ID;
        /** 기업명 */
        companyName: string;
        /** 주소 */
        address: string;
        /** 상장된 증권 시장 종류 */
        stockMarket?: string;
        /** 상장일 */
        listingDate?: string;
        /** 사업자번호 */
        businessNumber?: number;
        /** 고유번호(법인등록번호,주민번호 등) */
        uniqueNumber: number;
        /** 대표자 */
        ceo: string;
        /** 한국산업분류코드 */
        ksicCode: string;
        /** 한국산업분류코드 명칭 */
        ksicName: string;
        /** 회사 설립일 */
        establishmentDate: string;
        /** 임직원 수 */
        numberOfEmployee: number;
        /** 발굴자 */
        identifyMember: string;
        /** 심사자 */
        screeningMember: string;
        /** 사후관리자 */
        maintenanceMember: string;
        /** 통화 */
        currency: Currency;
    };
    /** 투자기업 재무현황 */
    financialStatus: {
        /** 라벨 */
        label: string;
        /** 기준일 */
        standardDate: string;
        /** 시작기준일 */
        fromDate: string;
        /** 종료기준일 */
        toDate: string;
        /** 매출액 */
        sales: number;
        /** 영업이익 */
        operatingIncome: number;
        /** 당기순익 */
        netIncome: number;
        /** 자산총계 */
        totalAssets: number;
        /** 부채총계 */
        totalLiabilities: number;
        /** 자본총계 */
        totalEquity: number;
        /** 자본금 */
        capitalStock: number;
        /** 통화 */
        currency: Currency;
    }[];
    /** 투자 및 회수 내역 */
    investmentAndPaybackStatus: {
        /** fundId */
        fundId: string;
        /** fund이름 */
        fundName: string;
        /** 형태(보통주,CB등) */
        investmentType: string;
        /** 투자일 */
        investmentDate: string;
        /** 단가 */
        perPrice: number;
        /** 투자금액 */
        investmentPrice: number;
        /** 지분율 */
        shareRatio: number;
        /** 회수금액-원금 */
        paybackPrincipal: number;
        /** 회수금액-손익 */
        paybackIncome: number;
        /** 회수금액-계 */
        paybackTotal: number;
        /** 감액금액 */
        impairmentPrice: number;
        /** 투자잔액 */
        investmentBalance: number;
        /** 최종회수일 */
        paybackDate?: string;
        /** 회수방법 */
        paybackType?: string;
        /** 통화 */
        currency: Currency;
    }[];
    /** 투자기업 공동투자내역 */
    jointInvestmentStatus: {
        /** fundId */
        fundId: string;
        /** fund이름 */
        fundName: string;
        /** 기관(조합명) */
        organizationName: string;
        /** 투자일자 */
        investmentDate: string;
        /** 투자단가 */
        investmentPerPrice: number;
        /** 투자금액 */
        investmentTotalPrice: number;
        /** 투자형태 */
        investmentType: string;
        /** 지분율 */
        shareRatio: number;
        /** 비고 */
        remark: string;
        /** 통화 */
        currency: Currency;
    }[];
    /** 감액발생내역(추가) */
    impairmentState: {
        /** 발생일자 */
        impairmentDate: string;
        /** 발생사유 */
        impairmentReasons: string;
        /** 사후관리 */
        maintenance: string;
        /** 통화 */
        currency: Currency;
    }[];
    /** 투자기업 투자포인트 및 진행현황 */
    investmentPointAndProgressStatus: {
        /** 투자포인트 */
        investmentPoint: string;
        /** 사업진행현황 */
        businessState: string;
        /** 사후관리현황 */
        maintenanceState: string;
        /** Exit방안 */
        exitPlan: InformationTypes.InvestmentFundReportExitPlan;
        /** Exit방안-상세 */
        exitPlanRemark?: string;
        /** Exit예상시기-연도 */
        exitTimingYear?: number;
        /** Exit예상시기-분기 */
        exitTimingQuarter?: 1 | 2 | 3 | 4 | '';
        /** Exit예상 - 금액 */
        exitPrice?: number;
        /** Exit예상-상세 */
        exitTimingRemark?: string;
        /** 통화 */
        currency: Currency;
    };
    /** 투자기업 Valuation */
    investeeValuation: {
        /** fundId */
        fundId: string;
        /** fund이름 */
        fundName: string;
        /** 평가기준일 */
        evaluationDate: string;
        /** 투자일자 */
        investmentDate: string;
        /** 투자방법 */
        investmentType: string;
        /** 투자당시기업가치 */
        investmentOpeningValuation: number;
        /** 투자잔액 */
        investmentBalance: number;
        /** 평가금액 */
        valuationPrice: number;
        /** Multiple(RVPI) */
        rvpi: string;
        /** 평가방법 */
        evaluationType: string;
        /** 통화 */
        currency: Currency;
    }[];
}
export {};
//# sourceMappingURL=fund.report.d.ts.map