import type { LotModel } from '~/api/lot/types';
import { lotApi } from '~/api/config';

export const getLot = async (urlCode: string) => {
  const { data } = await lotApi.post<LotModel>(`lot/${urlCode}/no-cache`, {
    key: `MlLdr%PN(>=Ev2\'.9+3in^X=[])~l67"]<MM.Am[\'&{}e@*R\`><hKtYZ[rwIw0$`,
  });

  return data;
};