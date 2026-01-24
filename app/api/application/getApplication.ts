import { userApi } from '~/api/config';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { getAdminStatus } from '~/api/application/getList';

export const getApplication = async (id: number) => {
  const { data } = await userApi.get<ApplicationWithAdminStatus>(
    `/center/application/${id}`,
  );

  return {
    ...data,
    adminStatus: getAdminStatus(data.status, data.moderationStatus),
  };
};
