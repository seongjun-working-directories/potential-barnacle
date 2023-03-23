import type { StockMarket, EnterpriseSize } from '../../information/index';
export interface InformationCompany<D = Date> {
    /** 회사명 */
    companyCode: string;
    /** 회사명 */
    name: string;
    /** 대표자 */
    ceo: string;
    /** 고유번호(법인등록번호,주민번호 등) */
    uniqueNumber: number;
    /** 사업자번호 */
    businessNumber?: number;
    /** 한국산업분류코드 */
    ksicCode: string;
    /** 한국산업분류코드 명칭 */
    ksicName: string;
    /** 회사 설립일 */
    establishmentDate: D;
    /** 임직원 수 */
    numberOfEmployee: number;
    /** 주요제품 */
    mainProducts: string;
    /** 전화번호 */
    telephone: string;
    /** 팩스번호 */
    fax: string;
    /** 회사주소 */
    address: string;
    /** 발행 가능 주식 수 */
    authorizedShares: number;
    /** 총 발행 주식 수 */
    issuedShares: number;
    /** 주당 액면가액 */
    faceValue: number;
    /** 상장여부 */
    isListed: boolean;
    /** 상장된 증권 시장 종류 */
    stockMarket?: StockMarket;
    /** 상장일 */
    listingDate?: D;
    /** 기업규모 */
    enterpriseSize: EnterpriseSize;
    /** 홈페이지 */
    website: string;
    /** 회사 API 키 */
    apiToken: string;
}
//# sourceMappingURL=company.d.ts.map