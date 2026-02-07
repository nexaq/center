import { userApi } from '~/api/config';
import type {
  ApplicationItem,
  ApplicationWithAdminStatus,
} from '~/api/application/types';

export enum ApplicationStatus {
  CHOOSE_PRICE = 'CHOOSE_PRICE',
  ACCOUNT_DETAILS = 'ACCOUNT_DETAILS',
  PAY_AGENT = 'PAY_AGENT',
  MODERATION = 'MODERATION',
  WAITING_DEPOSIT = 'WAITING_DEPOSIT',
  IN_WORK = 'IN_WORK',
  WON = 'WON',
  LOST = 'LOST',
  RECOMMENDATION = 'RECOMMENDATION',
}

export enum ApplicationAdminStatus {
  CREATED = 'CREATED',
  REVIEW = 'REVIEW',
  DEPOSIT_DETAILS = 'DEPOSIT_DETAILS',
  IN_WORK = 'IN_WORK',
  RESULT = 'RESULT',
}

export enum ApplicationModerationStatus {
  REVIEW = 'REVIEW',
  DEPOSIT_DETAILS = 'DEPOSIT_DETAILS',
}

export const getAdminStatus = (
  status: ApplicationStatus,
  moderationStatus: ApplicationModerationStatus,
): ApplicationAdminStatus => {
  if (
    [
      ApplicationStatus.CHOOSE_PRICE,
      ApplicationStatus.ACCOUNT_DETAILS,
      ApplicationStatus.PAY_AGENT,
    ].includes(status)
  ) {
    return ApplicationAdminStatus.CREATED;
  }

  if (status === ApplicationStatus.MODERATION) {
    if (moderationStatus === ApplicationModerationStatus.DEPOSIT_DETAILS) {
      return ApplicationAdminStatus.DEPOSIT_DETAILS;
    }
    return ApplicationAdminStatus.REVIEW;
  }

  if (
    [ApplicationStatus.IN_WORK, ApplicationStatus.WAITING_DEPOSIT].includes(
      status,
    )
  ) {
    return ApplicationAdminStatus.IN_WORK;
  }

  if ([ApplicationStatus.WON, ApplicationStatus.LOST].includes(status)) {
    return ApplicationAdminStatus.RESULT;
  }
  throw Error('not admin status');
};

export const getList = async (paidStatus: 'paid' | 'unPaid'): Promise<ApplicationWithAdminStatus[]> => {
  const { data } = await userApi.get<ApplicationItem[]>('/center/application');
  return data.filter(i => {
    if (paidStatus === 'paid') {
      return !!i.paidAt;
    } else {
      return !i.paidAt;
    }
  }).map((i) => ({
    ...i,
    adminStatus: getAdminStatus(i.status, i.moderationStatus),
  }));
};
