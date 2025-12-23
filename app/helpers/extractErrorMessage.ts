import {AxiosError} from "axios";

export const extractErrorMessage = (err: AxiosError<any, any>) => {
  if (err.response?.data?.message) {
    return err.response?.data?.message;
  }
  return null;
}