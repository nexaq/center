import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { endBidCorrection } from '~/api/application/endBidCorrection';

const NextStepModal = ({
  open,
  setOpen,
  application,
}: {
  application: ApplicationWithAdminStatus;
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return endBidCorrection(application.id);
    },
    onError: () => alert('Произошла ошибка'),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['application', application.id],
        exact: true,
      }),
  });

  return (
    <Modal
      width={400}
      title={'Вы уверены что не хотите создавать предложение?'}
      open={open}
      cancelText={'Отмена'}
      okText={'Подтвердить'}
      onOk={() => {
        mutate();
        setOpen(true);
      }}
      okButtonProps={{
        loading: isPending,
      }}
      cancelButtonProps={{
        loading: isPending,
      }}
      onCancel={() => {
        setOpen(false);
      }}
    >
      Действие нельзя отменить.
    </Modal>
  );
};

const NextStepButton = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type={'primary'} onClick={() => setOpen(true)}>Подтвердить</Button>
      <NextStepModal application={application} open={open} setOpen={setOpen} />
    </>
  );
};

export default NextStepButton;
