import type {LotModel} from "~/api/lot/types";
import dayjs from "dayjs";
import {DAYS_BEFORE_APPLICATION_RECEPTION_END, DAYS_FOR_ACCEPTING_RECOMMENDATION} from "~/helpers/config";

export const canCreateRecommendation = (lot: LotModel) => {
  const applicationEnd = dayjs(lot.sale.acceptingApplicationsEndAt).subtract(DAYS_FOR_ACCEPTING_RECOMMENDATION, 'days').subtract(DAYS_BEFORE_APPLICATION_RECEPTION_END, 'days');
  return dayjs().isBefore(applicationEnd);
}