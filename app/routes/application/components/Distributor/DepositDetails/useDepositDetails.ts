import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import {
  postDepositDetails,
  type PostDepositDetailsBody,
} from '~/api/application/postDepositDetails';
import { App } from 'antd';
import { isAxiosError } from 'axios';
import { extractErrorData } from '~/helpers/extractErrorMessage';

export const useDepositDetails = (
  onSuccess: () => void,
  onWrongPrice: () => void,
  setWrongPriceProps: (v: any) => void,
  setWrongPriceOpen: (value: boolean) => void,
) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation<
    void,
    Error,
    PostDepositDetailsBody & { isOrganization: boolean }
  >({
    mutationFn: async (data) => postDepositDetails(Number(id), data),
    onError: (e) => {
      if (isAxiosError(e) && extractErrorData(e).type === 'wrong_price') {
        const data = e.response?.data as {
          stepPrice: number;
          min: number;
          max: number;
          type: 'wrong_price';
        };

        setWrongPriceOpen(true);
        setWrongPriceProps({
          min: data.min,
          max: data.max,
          stepPrice: data.stepPrice,
        });
        onWrongPrice();
        return;
      }
      return message.error('Произошла ошибка');
    },
    onSuccess: () => {
      onSuccess();
      message.success('Успешно!');
      return queryClient.invalidateQueries({
        queryKey: ['application', Number(id)],
        exact: true,
      });
    },
  });
};
