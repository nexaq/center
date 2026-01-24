import {userApi} from "~/api/config";

interface CreatePriceOfferProps {
  applicationId: number;
  priceRejected: number;
  depositAccepted: number;
  priceAccepted: number;
  depositRejected: number;
};


export const createPriceOffer = async ({ applicationId, ...other }: CreatePriceOfferProps) => {
  await userApi.post(`/center/application-offer/${applicationId}`, other);
}