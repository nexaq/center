import {api} from "~/api/config";

export const bidCorrections = async (id: number, stepPrice: number) => {
  await api.post(`/center/application/${id}/bid-correction`, {
    stepPrice
  });
};