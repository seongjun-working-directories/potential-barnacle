/** @file 투자 보고서 투자 포인트 관리 */
import type { InvestmentFundReportExitPlan } from '../../information/index';
export interface FiBs {
    /** 기준일 */
    standardDate: string;
    /** 자산총계 */
    totalAssets: number;
    /** 부채총계 */
    totalLiabilities: number;
    /** 자본총계 */
    totalEquity: number;
    /** 자본금 */
    capitalStock: number;
}
export interface FiIs {
    /** 기준일(시작일) */
    fromDate: string;
    /** 기준일(종료일) */
    toDate: string;
    /** 매출액 */
    sales: number;
    /** 영업이익 */
    operatingIncome: number;
    /** 당기순익 */
    netIncome: number;
}
export interface Impairment {
    /** 기준일(시작일) */
    fromDate: string;
    /** 기준일(종료일) */
    toDate: string;
    /** 매출액 */
    sales: number;
    /** 영업이익 */
    operatingIncome: number;
    /** 당기순익 */
    netIncome: number;
}
export interface InvestmentAndPayback {
    /** 기준일 */
    standardDate: string;
    /** 형태(보통주,CB등) */
    investmentType: string;
    /** 투자일 */
    investmentDate: string;
    /** 단가 */
    perPrice: number;
    /** 투자금액 */
    investmentPrice: number;
    /** 투자지분수량 */
    shareCount: number;
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
    paybackDate: string;
    /** 회수방법 */
    paybackType: string;
}
export interface InvestmentPoint {
    /** 기준일 */
    standardDate: string;
    /** 투자포인트 */
    investmentPoint: string;
    /** 사업진행현황 */
    businessState: string;
    /** 사후관리현황 */
    maintenanceState: string;
    /** Exit방안 */
    exitPlan: InvestmentFundReportExitPlan;
    /** Exit방안-상세 */
    exitPlanRemark: string;
    /** Exit예상시기-연도 */
    exitTimingYear: number;
    /** Exit예상시기-분기 */
    exitTimingQuarter: 1 | 2 | 3 | 4;
    /** Exit예상 - 금액 */
    exitPrice: number;
    /** Exit예상-상세 */
    exitTimingRemark: string;
}
export interface JointInvestment {
    /** 기준일 */
    standardDate: string;
    /** 기관(조합명) */
    fundName: string;
    /** 투자일자 */
    investmentDate: string;
    /** 투자단가 */
    investmentPerPrice: number;
    /** 투자금액 */
    investmentTotalPrice: number;
    /** 투자형태 */
    investmentType: string;
    /** 투자지분수량 */
    shareCount: number;
    /** 지분율 */
    shareRatio: number;
    /** 비고 */
    remark: string;
}
//# sourceMappingURL=report.data.d.ts.map