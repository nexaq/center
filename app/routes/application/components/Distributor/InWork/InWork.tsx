import st from './InWork.module.scss';
import { App, Button, Card, Flex, Form, Select } from 'antd';
import React, { useState } from 'react';
import FileUpload from '~/components/FileUpload/FileUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api/config';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { ConfirmModal } from '~/routes/application/components/Distributor/DepositDetails/DepositDetails';
import DepositStatusAlert from "~/routes/application/components/DepositStatusAlert/DepositStatusAlert";

const InWork = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id, result }: { id: number; result: string }) => {
      await api.post(`center/application/${id}/finish`, {
        result,
      });
    },
    onSuccess: async () => {
      message.success('Успешно!');
      await queryClient.invalidateQueries({
        queryKey: ['application', application.id],
        exact: true,
      });
    },
  });

  if (!application) {
    return null;
  }

  return (
    <Flex gap={16} className={st.main}>
      <Card title={'Завершить'} className={st.form}>
        <Form
          form={form}
          layout={'vertical'}
          autoComplete="off"
          onFinish={() => {
            setOpen(true);
          }}
        >
          <Form.Item
            label="Результат"
            name="result"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Select
              disabled={isPending}
              style={{ width: '100%' }}
              options={[
                { value: 'won', label: 'Победил' },
                { value: 'lost', label: 'Проиграл' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Протокол торгов"
            name="file"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <FileUpload
              disabled={isPending}
              id={application.id}
              onChange={(value) => {
                form.setFields([
                  {
                    name: 'file',
                    errors: value ? [] : ['Обязательное поле'],
                    value: value,
                  },
                ]);
              }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Flex justify={'end'} gap={12}>
              <ConfirmModal
                loading={isPending}
                open={open}
                setOpen={setOpen}
                onOk={() => {
                  const { result } = form.getFieldsValue();
                  mutate({ id: application.id, result });
                }}
              />
              <Button type="primary" htmlType="submit" loading={isPending}>
                Продолжить
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
      <div className={st.alert}>
        <DepositStatusAlert application={application} />
      </div>
    </Flex>

  );
};

export default InWork;
