import {userApi} from "~/api/config";

export type SuggestBankItem = {name: string, address: string, bic: string, correspondentAccount: string};
export type SuggestBankList = SuggestBankItem[];

export const suggestBank = async (query: string) => {
  const { data } = await userApi.post<SuggestBankList>('dadata/suggest-bank', {
    query
  });

  return data;
}