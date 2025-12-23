import type {PostDepositDetailsBody} from "~/api/application/postDepositDetails";
import type {Dayjs} from "dayjs";

export type PostDepositDetailsBodyForm = Omit<
  PostDepositDetailsBody,
  'priceAccepted' | 'depositAccepted' | 'priceRejected' | 'depositRejected'
> & {
  priceAccepted?: string;
  depositAccepted?: string;
  priceRejected: string;
  depositRejected: string;
  depositBeforeAccepted?: Dayjs;
  depositBeforeRejected: Dayjs;
};