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
  stepPriceCorrection: number | null;
  accountDetails: string | null;
  depositDetails: string | null;
}

export type ApplicationWithAdminStatus = ApplicationItem & {
  adminStatus: ApplicationAdminStatus;
};