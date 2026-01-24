import {userApi} from "~/api/config";

export type SuggestOrganizationItem = {name: string, inn: string, kpp: string | null};
export type SuggestOrganizationList = SuggestOrganizationItem[];

export const suggestOrganization = async (query: string) => {
  const { data } = await userApi.post<SuggestOrganizationList>('dadata/suggest-organization', {
    query
  });

  return data;
}