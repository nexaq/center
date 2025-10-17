import { api } from '~/api/config';

export interface PostDepositDetailsBody {
  bic: string;
  account: string;
  purpose: string;
  bankName: string;
  corrAccount: string;
}

export const postDepositDetails = async (
  id: number,
  body: PostDepositDetailsBody,
) => {
  const { data } = await api.post(`/center/application/${id}/deposit-details`, body);

  return data;
};
