import { api } from '~/api/config';


export interface PostDepositDetailsBody {
  inn: string;
  kpp: string;
  name: string;
  account: string;
  bic: string;
  bankName: string;
  corrAccount: string;
  comment?: string;

  createRecommendation: boolean;

  priceAccepted?: number;
  depositAccepted?: number;
  purposeAccepted?: string;
  depositBeforeAccepted?: string;

  priceRejected: number;
  depositRejected: number;
  purposeRejected: string;
  depositBeforeRejected: string;
}


export const postDepositDetails = async (
  id: number,
  body: PostDepositDetailsBody,
) => {
  const {
    priceAccepted,
    depositAccepted,
    purposeAccepted,
    depositBeforeAccepted,
    priceRejected,
    depositRejected,
    purposeRejected,
    depositBeforeRejected,
    createRecommendation,
    comment,
    ...other
  } = body;

  const priceOffer = {
    createRecommendation,
    priceAccepted,
    depositAccepted,
    purposeAccepted,
    depositBeforeAccepted,
    priceRejected,
    depositRejected,
    purposeRejected,
    depositBeforeRejected,
    comment
  }

  const { data } = await api.post(`/center/application/${id}/deposit-details`, {
    depositDetails: other,
    priceOffer
  });
  return data;
};
