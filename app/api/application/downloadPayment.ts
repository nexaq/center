import {downloadFile} from "~/helpers/download";
import {CENTER_API_HOST} from "~/api/config";

export const downloadPayment = (id: number) => {
  downloadFile(`${CENTER_API_HOST}/center/application/${id}/payment-file`, `payment-${id}.pdf`);
}