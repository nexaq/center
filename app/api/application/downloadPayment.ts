import {downloadFile} from "~/helpers/download";
import {USER_HOST} from "~/api/config";

export const downloadPayment = (id: number) => {
  downloadFile(`${USER_HOST}/center/application/${id}/payment-file`, `payment-${id}.pdf`);
}