export type PriceTableItem = {
  end: string;
  begin: string;
  price: number;
  deposit: number;
};

export enum LotSaleStatus {
  SALE_ANNOUNCED = 'SALE_ANNOUNCED',
  APPLICATIONS_RECEPTION = 'APPLICATIONS_RECEPTION',
  APPLICATIONS_RECEPTION_ENDED = 'APPLICATIONS_RECEPTION_ENDED',
  AUCTION_IS_GOING = 'AUCTION_IS_GOING',
  SALE_COMPLETED = 'SALE_COMPLETED',
  SALE_CANCELED = 'SALE_CANCELED',
  SALE_FAILED = 'SALE_FAILED',
  SALE_PAUSED = 'SALE_PAUSED',
  RESULTING = 'RESULTING',
  PRICE_OFFERS_RECEPTION_DONE = 'PRICE_OFFERS_RECEPTION_DONE',
}

export type LotModel = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  number: number;
  startPrice: number;
  currentPrice: number;
  stepPrice: number;
  title: string;
  subject: string;
  classification: string;
  priceReduction: number | null;
  saleAgreement: string | null;
  HTMLInfo: string;
  region: string | null;
  // todo: TYPE IT NIGGARD
  trueRegion: any;
  saleId: number;
  deposit?: number;
  imagesScannedSmall: string | null;
  imagesScanned: string[] | null;
  daysLeft?: number;
  priceTable?: PriceTableItem[];

  status: LotSaleStatus,

  sale: SaleDTO;

  platformLotLink: string;

  urlCode: string;

  images?: string[];
  serverImages?: string[];

  categories: [
    {
      category: {
        urlCode: string;
        title: string;
        parent?: {
          title: string;
          urlCode: string;
        };
      };
    },
  ];
};

export enum PlatformEnum {
  M_ETS = 'M_ETS',
  ALFALOT = 'ALFALOT',
  CDTRF = 'CDTRF',
  RAD = 'RAD',
  NIS = 'NIS',
  SBER_AST = 'SBER_AST',
  FABRIKANT = 'FABRIKANT',
  REALISATION_CENTER = 'REALISATION_CENTER',
  URAL_ETP = 'URAL_ETP',
  V_ETP = 'V_ETP',
  UGRA = 'UGRA',
  PROFIT = 'PROFIT',
  UTENDER = 'UTENDER',
  ESP = 'ESP',
  RUSSIA_ONLINE = 'RUSSIA_ONLINE',
  TENDER_TECHNOLOGIES = 'TENDER_TECHNOLOGIES',
  ELECTRO_TORGI = 'ELECTRO_TORGI',
  SIBERIA_AUCTION = 'SIBERIA_AUCTION',
  ATC = 'ATC',
  ARBITAT = 'ARBITAT',
  OTP = 'OTP',
  BALTIC = 'BALTIC',
  REG_TORG = 'REG_TORG',
  META_INVEST = 'META_INVEST',
  PTP = 'PTP',
  ZAKAZ_RF = 'ZAKAZ_RF',
  REGION = 'REGION',
  TENDER_GARANT = 'TENDER_GARANT',
  SELTIM = 'SELTIM',
}

export type PersonDTO = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  INN: string;
  category: string;
};

export type OrganizationDTO = {
  INN: string;
  category: string;
  fullName: string;
  id: number;
  shortName: string;
};

export type SaleDTO = {
  id: number;
  number: string;
  type: SaleType;
  acceptingApplicationsStartAt: string;
  acceptingApplicationsEndAt: string;
  acceptingApplicationsStartAt_formatted: string;
  acceptingApplicationsEndAt_formatted: string;
  EFRSBPublishedAt: string;
  EFRSBPublishedAt_formatted: string;
  caseNumber: string;
  arbitrationCourt: string;
  uuid: string;
  documents: {
    url: string;
    name: string;
  }[];
  platform: PlatformEnum;
  person?: PersonDTO;
  organization?: OrganizationDTO;
};

export enum SaleType {
  AUCTION = 'AUCTION',
  PUBLIC_OFFER = 'PUBLIC_OFFER',
}
