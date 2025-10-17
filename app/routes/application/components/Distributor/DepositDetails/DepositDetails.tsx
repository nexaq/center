import st from './DepositDetails.module.scss';
import { Alert, Button, Card, Flex, Form, Input, Modal, Radio } from 'antd';
import BicInput from '~/components/BicInput/BicInput';
import React, { type ReactNode, useEffect, useState } from 'react';
import { useDepositDetails } from '~/routes/application/components/Distributor/DepositDetails/useDepositDetails';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import OrganizationInput from '~/components/OrganizationInput/OrganizationInput';
import CurrencyInput from '~/components/CurrencyInput/CurrencyInput';
import { unformat } from '@react-input/number-format';

export const ConfirmModal = ({
  open,
  setOpen,
  onOk,
  loading,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onOk: () => void;
  loading: boolean;
}) => {
  return (
    <Modal
      destroyOnHidden={true}
      title="Подтверждение"
      open={open}
      onOk={onOk}
      onCancel={() => setOpen(false)}
      okText="Подтвердить"
      okButtonProps={{
        loading,
      }}
      cancelText="Отмена"
    >
      Вы уверены что все поля корректны? Дейстие нельзя отменить.
    </Modal>
  );
};

const DepositDetails = ({}: { application: ApplicationWithAdminStatus }) => {
  const [form] = Form.useForm();
  const [isOrganization, setIsOrganization] = useState(1);

  const [open, setOpen] = useState(false);
  const { isPending, mutate } = useDepositDetails(() => setOpen(false));

  useEffect(() => {
    form.setFields([
      {
        name: 'name',
        value: '',
      },
      {
        name: 'inn',
        value: '',
      },
      {
        name: 'kpp',
        value: '',
      },
    ]);
  }, [isOrganization]);

  return (
    <Card className={st.main} title={'Реквизиты для задатка'}>
      <Flex vertical gap={'large'}>
        <Alert
          description={'Требуется предоставить реквизиты для внесения задатка:'}
        />
        <Form
          layout={'vertical'}
          form={form}
          onFinish={() => {
            setOpen(true);
          }}
        >
          <Form.Item>
            <Radio.Group
              onChange={(e) => {
                setIsOrganization(e.target.value);
              }}
              value={isOrganization}
              options={[
                { value: 1, label: 'Юр. лицо' },
                { value: 0, label: 'Физ. лицо' },
              ]}
            />
          </Form.Item>
          {!!isOrganization && (
            <>
              <Form.Item
                name={'inn'}
                label={'ИНН'}
                rules={[
                  {
                    required: true,
                    message: 'Обязательное поле',
                  },
                  {
                    pattern: /[0-9]{10}/,
                    message: 'Должно быть 10 цифр',
                  },
                ]}
              >
                <OrganizationInput
                  setValue={(e) =>
                    form.setFields([
                      {
                        name: 'inn',
                        value: e,
                      },
                    ])
                  }
                  onSelect={(e) => {
                    form.setFields([
                      {
                        name: 'kpp',
                        value: e.kpp,
                      },
                      {
                        name: 'inn',
                        value: e.inn,
                      },
                      {
                        name: 'name',
                        value: e.name,
                      },
                    ]);
                    form.validateFields({
                      dirty: true,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                name={'kpp'}
                label={'КПП'}
                rules={[
                  {
                    pattern: /[0-9]{9}/,
                    message: 'Должно быть 9 цифр',
                  },
                ]}
              >
                <Input maxLength={12} />
              </Form.Item>
            </>
          )}
          <Form.Item
            name={'name'}
            label={'Получатель'}
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'account'}
            label="Номер счета"
            rules={[
              {
                required: true,
                min: 20,
                max: 20,
                pattern: /[0-9]{20}/,
                message: 'Должно быть 20 цифр',
              },
            ]}
          >
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item
            name={'bic'}
            label={'БИК'}
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              {
                pattern: /[0-9]{9}/,
                message: 'Должно быть 9 цифр',
              },
            ]}
          >
            <BicInput
              setValue={(bic) => {
                form.setFields([
                  {
                    name: 'bic',
                    value: bic,
                  },
                ]);
              }}
              onSelect={(item) => {
                form.setFields([
                  {
                    name: 'bic',
                    value: item.bic,
                  },
                  {
                    name: 'bankName',
                    value: item.name,
                  },
                  {
                    name: 'corrAccount',
                    value: item.correspondentAccount,
                  },
                ]);
                form.validateFields({
                  dirty: true,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name={'bankName'}
            label="Название банка"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              {
                min: 3,
                message: 'Минимум 2 символа',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'corrAccount'}
            label="Корр. счет"
            rules={[
              {
                required: true,
                min: 20,
                max: 20,
                pattern: /[0-9]{20}/,
                message: 'Должно быть 20 цифр',
              },
            ]}
          >
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item
            name={'sum'}
            label="Сумма"
            rules={[
              {
                required: true,
              },
            ]}
          >
            {/*@ts-ignore*/}
            <CurrencyInput />
          </Form.Item>
          <Form.Item
            name={'purpose'}
            label="Назначение платежа"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              {
                min: 10,
                message: 'Минимум 10 символов',
              },
            ]}
          >
            <Input.TextArea maxLength={210} showCount />
          </Form.Item>
          <Form.Item>
            <ConfirmModal
              setOpen={setOpen}
              open={open}
              onOk={() => {
                const values = form.getFieldsValue();
                mutate({
                  ...values,
                  sum: Number(unformat(values.sum)),
                });
              }}
              loading={isPending}
            />
            <Button type="primary" htmlType="submit" loading={isPending}>
              Продолжить
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Card>
  );
};

export default DepositDetails;
