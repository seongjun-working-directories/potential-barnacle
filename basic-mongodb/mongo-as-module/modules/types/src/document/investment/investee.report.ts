import type { AccountBsType, AccountIsType } from '../../fi/index';
import type {
  EnterpriseSize,
  StockMarket,
  TCBCertificationGrade,
  TCBCertificationIssuedOrganization,
  TCBCertificationType,
  FiStandard,
} from '.././../information/index';
export interface InvesteeReportDocument {
  /** 회사기본정보-회사개요 데이터 집합 */
  companyOverview: {
    /** 피투자회사 Document ID */
    investeeId: string;
    /** 회사명 */
    companyName: string;
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
    establishmentDate: string;
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
    listingDate?: string;
    /** 기업규모 */
    enterpriseSize: EnterpriseSize;
    /** 홈페이지 */
    website: string;
  };
  /** 이사회 이사 리스트 */
  boardOfDirectors: {
    /** 직위 */
    jobPosition: string;
    /** 이름 */
    name: string;
    /** 선임일 */
    appointmentDate: string;
    /** 최대주주 등과의 관계 */
    largestShareholderRelation: string;
    /** 메모 */
    memo: string;
  }[];
  /** 주요연락처 리스트 */
  mainContact: {
    /** 직책 */
    jobTitle: string;
    /** 이름 */
    name: string;
    /** 이메일 */
    email: string;
    /** 전화번호 */
    telephone: string;
    /** 휴대폰번호 */
    mobile: string;
    /** 담당업무 */
    responsibilitiesWork: string;
  }[];
  /** 인력현황 리스트 */
  employeeStatus: {
    /** 부서명 */
    organizationName: string;
    /** 인원(수) */
    numberOfStaff: number;
  }[];
  /** 회사정보 첨부파일 */
  companyInfoAttachmentFile: {
    /** File Document Id */
    _id: string;
    /** 파일 이름 */
    name: string;
    /** 파일 크기 */
    size: number;
  }[];
  /** TCB인증 관련 정보​ */
  TCBCertification: {
    /** 인증여부 */
    isCertification: boolean;
    /** 종류 */
    type?: TCBCertificationType;
    /** 발급처 */
    issuedOrganization?: TCBCertificationIssuedOrganization;
    /** 발급일 */
    issuedDate?: string;
    /** 등급 */
    grade?: TCBCertificationGrade;
  };
  /** 재무상태표 */
  bs: {
    /** 고유ID */
    id: string;
    /** 라벨 */
    label: string;
    /** 기준일 */
    standardDate: string;
    /** 전표아이템 리스트 */
    itemList: {
      /** 계정코드 */
      accountCode: string;
      /** 계정코드 분류 */
      accountCategory: AccountBsType;
      /** 계정명 */
      accountText: string;
      /** 금액 */
      value: number;
    }[];
    /** (화폐)통화 */
    currency: string;
    /** 연결여부 */
    isLinked: boolean;
    /** 확정여부 */
    isClosing: boolean;
    /** 회계기준(IFRS/KGAAP) */
    accountingStandards: FiStandard;
    /** (회계)감사인 */
    accountingAuditor: string;
  }[];
  /** 손익계산서 */
  is: {
    /** 고유ID */
    id: string;
    /** 라벨 */
    label: string;
    /** 기준시작일 */
    fromDate: string;
    /** 기준종료일 */
    toDate: string;
    /** 전표아이템 리스트 */
    itemList: {
      /** 계정코드 */
      accountCode: string;
      /** 계정코드 분류 */
      accountCategory: AccountIsType;
      /** 계정명 */
      accountText: string;
      /** 금액 */
      value: number;
    }[];
    /** (화폐)통화 */
    currency: string;
    /** 연결여부 */
    isLinked: boolean;
    /** 확정여부 */
    isClosing: boolean;
    /** 회계기준(IFRS/KGAAP) */
    accountingStandards: FiStandard;
    /** (회계)감사인 */
    accountingAuditor: string;
  }[];
  /** 현금성 자산 */
  cashableAssets: {
    /** 고유ID */
    id: string;
    /** 라벨 */
    label: string;
    /** 기준일 */
    standardDate: string;
    /** 자산 리스트 */
    assetList: {
      /** 고유ID */
      assetCode: string;
      /** 자산 명칭 */
      text: string;
      /** 금액 */
      value: number;
    }[];
    /** 현금총액 */
    cashTotal: number;
    /** 사용제한금액 */
    usageLimitAsset: number;
    /** 가용총액 */
    useableCashTotal: number;
  }[];
  /** 차입금 현황 */
  loansPayableStatus: {
    /** 고유ID */
    id: string;
    /** 라벨 */
    label: string;
    /** 기준시작일 */
    fromDate: string;
    /** 기준종료일 */
    toDate: string;
    /** 기초잔액 */
    openingBalance: number;
    /** 감소 */
    decrease: number;
    /** 증가 */
    increase: number;
    /** 기말잔액 */
    endingBalance: number;
  }[];
  /** 차입금 상세내역 */
  loansPayableDetails: {
    /** 금융기관 */
    financialInstitution: string;
    /** 지점명 */
    branchOffice: string;
    /** 금액 */
    price: number;
    /** (화폐)통화 */
    currency: string;
    /** 이자율 */
    interestRate: number;
    /** 만기일 */
    dueDate: string;
    /** 질권/담보 */
    pledgeAndCollateral: string;
  }[];
  /** 주요지표(KPI) */
  KPI: {
    /** KPI명칭 */
    title: string;
    /** 설명 */
    description: string;
    /** KPI 성과 리스트 */
    elementList: {
      /** 기준일 */
      standardDate: string;
      /** 결과 */
      value: number | string;
    }[];
  }[];
  /** 주요지표 첨부파일 */
  keyIndicatorsAttachmentFile: {
    /** File Document Id */
    _id: string;
    /** 파일 이름 */
    name: string;
    /** 파일 크기 */
    size: number;
  }[];
  /** 지분 현황 */
  shareStatus: {
    /** 주주명 */
    shareHolderName: string;
    /** 보통주식수 */
    commonShareOfNumber: number;
    /** 우선주식수 */
    preferredShareOfNumber: number;
    /** 희석 전 총 주식 수 */
    beforeDilutedShares: number;
    /** 희석 전 지분율 */
    beforeDilutedShareRatio: number;
    /** 희석가능 주식 수 */
    allowDilutedShares: number;
    /** 희석 후 총 주식 수 */
    fullyDilutedShares: number;
    /** 희석 후 지분율 */
    afterDilutedShareRatio: number;
    /** 비고 */
    memo: string;
  }[];
  /** 자본 변동 현황 */
  capitalChangeStatus: {
    /** 변동일자 */
    changeDate: string;
    /** 종류 */
    type: string;
    /** 참여기관명 */
    institutionalInvestor: string;
    /** 변동 주식 수 */
    changeShareOfNumber: number;
    /** 최종 주식 수 */
    resultShareOfNumber: number;
    /** 최종 자본금 */
    resultCapital: number;
    /** 단가 */
    sharePerPrice: number;
    /** 통화 */
    currency: string;
    /** 증자금액 */
    capitalIncrease: number;
  }[];
  /** 옵션 현황 */
  stockOptionStatus: {
    /** 부여일자 */
    stockOptionGrantDate: string;
    /** 부여대상자 */
    name: string;
    /** 부여방법 */
    type: string;
    /** 최초부여수량 */
    initialGrantQuantity: number;
    /** 행사수량 */
    exerciseQuantity: number;
    /** 취소수량 */
    cancellationAmountQuantity: number;
    /** 잔여수량 */
    remainingQuantity: number;
    /** 행사시작일 */
    exerciseStartDate: string;
    /** 행사종료일 */
    exerciseEndDate: string;
    /** 행사가격 */
    strikePrice: number;
    /** 통화 */
    currency: string;
    /** 비고 */
    memo: string;
  }[];
  /** 자회사 및 관계회사 내역 */
  subsidiariesAndAffiliates: {
    /** 회사명 */
    companyName: string;
    /** 관계 */
    relation: string;
    /** 지분율 */
    shareRatio: number;
    /** 국가/지역 */
    country: string;
    /** 최초투자금액 */
    initialInvestment: number;
    /** 장부가액 */
    bookValue: number;
    /** 통화 */
    currency: string;
    /** 영위사업 */
    runningBusiness: string;
  }[];
  /** 지분현황 첨부파일 */
  shareStatusAttachmentFile: {
    /** File Document Id */
    _id: string;
    /** 파일 이름 */
    name: string;
    /** 파일 크기 */
    size: number;
  }[];
  /** 사업현황 */
  businessStatus: {
    /** 라벨(구분) */
    label: string;
    /** 설명 */
    description: string;
  }[];
  /** 계류중인 소송사건 */
  pendingLitigation: {
    /** 원고 */
    plaintiff: string;
    /** 피고 */
    defendant: string;
    /** 소송가액 */
    litigationValue: number;
    /** (화폐)통화 */
    currency: string;
    /** 소송내용 */
    litigationContent: string;
    /** 진행상황 */
    progressStatus: string;
  }[];
  /** 사업현황 첨부파일 */
  businessStatusAttachmentFile: {
    /** File Document Id */
    _id: string;
    /** 파일 이름 */
    name: string;
    /** 파일 크기 */
    size: number;
  }[];
}

export type InvesteeReportTemplateTab =
  | 'tab:companyInfo'
  | 'tab:keyIndicators'
  | 'tab:shareStatus'
  | 'tab:businessStatus';
export interface InvesteeReportTemplateItem {
  id: InvesteeReportTemplateTab;
  text: string;
  element: {
    id: keyof InvesteeReportDocument;
    text: string;
    col: number;
  }[];
}
export type InvesteeReportTemplate = InvesteeReportTemplateItem[];

export interface InvesteeReportTemplateConfig {
  /** 보기 Tab */
  viewTabId: string[];
  /** 필수아이템 */
  requiredItem: string[];
  /** 옵션아이템 */
  optionalItem: string[];
  /** 제외아이템 */
  excludedItem: string[];
  /** 항목별 메모 */
  memo: {
    [key: string]: string;
  };
}

export interface InvesteeReportConfig {
  is: {
    label: string;
    fromDate: string;
    toDate: string;
  }[];
  isAccount: {
    accountCode: string;
    accountName: string;
    accountType: AccountIsType;
  }[];
  bs: {
    label: string;
    standardDate: string;
  }[];
  bsAccount: {
    accountCode: string;
    accountName: string;
    accountType: AccountBsType;
  }[];
  cashableAssets: {
    label: string;
    standardDate: string;
  }[];
  loansPayableStatus: {
    label: string;
    fromDate: string;
    toDate: string;
  }[];
  businessStatus: {
    label: string;
  }[];
}
