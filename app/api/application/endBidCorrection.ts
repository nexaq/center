import {api} from "~/api/config";

export const endBidCorrection = async (id: number) => {
  await api.post(`/center/application/${id}/end-bid-correction`);
}