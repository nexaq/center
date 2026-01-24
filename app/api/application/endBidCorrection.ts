import {userApi} from "~/api/config";

export const endBidCorrection = async (id: number) => {
  await userApi.post(`/center/application/${id}/end-bid-correction`);
}