import {AxiosError} from "axios";

export const extractErrorMessage = (err: AxiosError<any, any>) => {
  if (err.response?.data?.message) {
    return err.response?.data?.message;
  }
  return null;
}

export const extractErrorData = (err: AxiosError<any, any>) => {
  if (err.response?.data) {
    return err.response?.data;
  }
  return null;
}