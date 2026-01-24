import {userApi} from "~/api/config";

export const bidCorrections = async (id: number, stepPrice: number) => {
  await userApi.post(`/center/application/${id}/bid-correction`, {
    stepPrice
  });
};