import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import {postDepositDetails, type PostDepositDetailsBody} from '~/api/application/postDepositDetails';
import {App} from "antd";

export const useDepositDetails = (onSuccess: () => void) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation<void, Error, PostDepositDetailsBody & { isOrganization: boolean }>({
    mutationFn: async (data) => postDepositDetails(Number(id), data),
    onError: () => message.error('Произошла ошибка'),
    onSuccess: () => {
      onSuccess();
      message.success('Успешно!')
      return queryClient.invalidateQueries({
        queryKey: ['application', Number(id)],
        exact: true,
      });
    },
  });
};
