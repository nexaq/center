import { App, Modal } from 'antd';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api/config';
import { isAxiosError } from 'axios';
import type { ApplicationWithAdminStatus } from '~/api/application/types';

const AcceptModal = ({
  open,
  setOpen,
  application,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  application: ApplicationWithAdminStatus;
}) => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation<void, unknown, { id: number }>({
    mutationFn: async ({ id }) => {
      const { data } = await api.post(
        `/center/application/${id}/moderation/review`,
      );
      return data;
    },
    mutationKey: ['application'],
    onError: (err) => {
      if (isAxiosError(err) && err.status === 400) {
        alert(err.response?.data.message ?? err.status);
      } else {
        alert('Произошла ошибка');
      }
    },
    onSuccess: () => {
      setOpen(false);
      message.success('Успешно!');
      return queryClient.invalidateQueries({
        queryKey: ['application', application.id],
        exact: true,
      });
    },
  });

  return (
    <Modal
      destroyOnHidden={true}
      title="Подтверждение"
      open={open}
      onOk={() => {
        mutate({
          id: application.id,
        });
      }}
      onCancel={() => setOpen(false)}
      okText="Подтвердить"
      okButtonProps={{
        loading: isPending,
      }}
      cancelText="Отмена"
    >
      Вы уверены что все поля корректны? Дейстие нельзя отменить.
    </Modal>
  );
};

export default AcceptModal;
