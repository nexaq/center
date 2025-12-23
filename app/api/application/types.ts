import {
  ApplicationAdminStatus,
  ApplicationModerationStatus,
  ApplicationStatus,
} from '~/api/application/getList';

interface User {
  name: string;
  email: string;
  createdAt: string;
}

export interface ReturnDepositDetails {
  bic: number;
  name: string;
  bankName: string;
  accountNumber: number;
  correspondentAccount: number;
}

export interface DepositDetails {
  bic: string;
  inn?: string | null;
  kpp?: string | null;
  sum: number;
  name: string;
  account: string;
  purpose: string;
  bankName: string;
  corrAccount: string;
  isOrganization: boolean;
}

export interface ApplicationItem {
  id: number;
  userId: number;
  name: string;
  createdAt: string;
  title: string;
  status: ApplicationStatus;
  user: User;
  code: string;
  saleNumber: string;
  moderationStatus: ApplicationModerationStatus;
  lotCode: string;
  isRejected: boolean;
  userPrice: number | null;
  paymentFile: string | null;
  stepPriceCorrection: number | null;
  returnDepositDetails: ReturnDepositDetails | null;
  depositDetails: DepositDetails | null;
}

export type ApplicationWithAdminStatus = ApplicationItem & {
  adminStatus: ApplicationAdminStatus;
};
