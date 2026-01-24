import { Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '~/api/config';
import { useApplication } from '~/hooks/useApplication/useApplication';
import { isAxiosError } from 'axios';
import type { ApplicationWithAdminStatus } from '~/api/application/types';

const { TextArea } = Input;

const ApplicationCancelModal = ({
  open,
  setOpen,
  application,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  application: ApplicationWithAdminStatus;
}) => {
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Error, { id: number; reason: string }>({
    mutationFn: ({ id, reason }) => {
      return userApi.post(`/center/application/${id}/reject`, {
        reason,
      });
    },
    onError: (err) => {
      if (
        isAxiosError(err) &&
        err.status === 400 &&
        err.response?.data.message
      ) {
        alert(err.response.data.message);
        return queryClient.invalidateQueries({
          queryKey: ['application', application.id],
          exact: true,
        });
      }
      alert('Произошла ошибка!');
    },
    onSuccess: () => {
      setOpen(false);
      return queryClient.invalidateQueries({
        queryKey: ['application', application.id],
        exact: true,
      });
    },
  });

  if (!application) return null;

  return (
    <Modal
      destroyOnHidden={true}
      title="Отклонить заявку"
      open={open}
      onOk={() => {
        console.log('CUNT');
        form.submit();
      }}
      onCancel={() => setOpen(false)}
      okText="Подтвердить"
      cancelText="Отмена"
    >
      <Form
        form={form}
        layout={'vertical'}
        autoComplete="off"
        onFinish={({ reason }: { reason: string }) => {
          console.log({
            reason,
            id: application.id,
          });
          mutate({
            reason,
            id: application.id,
          });
        }}
      >
        <Form.Item label="Шаблон" name="template">
          <Select
            style={{ width: '100%' }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Причина"
          name="reason"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <TextArea maxLength={5000} showCount />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApplicationCancelModal;
