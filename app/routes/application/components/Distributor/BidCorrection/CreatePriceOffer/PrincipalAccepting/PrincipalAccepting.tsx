import { Card, DatePicker, Form, Input } from 'antd';
import { unformat } from '@react-input/number-format';
import CurrencyInput from '~/components/CurrencyInput/CurrencyInput';
import React, { useContext } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { PURPOSE_RULES } from '~/routes/application/components/Distributor/BidCorrection/CreatePriceOffer/purpose.rules';

const PrincipalAccepting = () => {
  const form = Form.useFormInstance();

  return (
    <Card title={'Принципал принимает'} style={{ flex: 1 }}>
      <Form.Item
        name={'priceAccepted'}
        label="Новая цена"
        rules={[
          {
            required: true,
            min: 1,
            transform: (v) => Number(unformat(v)),
          },
          {
            validator: (_, value) => {
              const priceRejected = form.getFieldValue(
                'priceRejected',
              ) as number;
              const current = Number(unformat(value));

              if (current <= priceRejected) {
                return Promise.reject(
                  'Должно быть больше чем "цена принципала"',
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        {/*@ts-ignore*/}
        <CurrencyInput />
      </Form.Item>
      <Form.Item
        name={'depositAccepted'}
        label="Задаток (проверить условия и размер на периоде):"
        rules={[
          {
            required: true,
            min: 1,
            transform: (v) => Number(unformat(v)),
          },
          {
            validator: (_, value) => {
              const priceAccepted = Number(
                unformat(form.getFieldValue('priceAccepted')),
              ) as number;
              const depositRejected = Number(
                unformat(form.getFieldValue('depositRejected')),
              ) as number;
              const current = Number(unformat(value));

              if (current < depositRejected) {
                return Promise.reject(
                  'Должно быть больше чем "задаток принципала"',
                );
              }

              if (current > priceAccepted) {
                return Promise.reject('Должно быть меньше чем цена');
              }

              return Promise.resolve();
            },
          },
        ]}
      >
        {/*@ts-ignore*/}
        <CurrencyInput />
      </Form.Item>
      <Form.Item
        name={'purposeAccepted'}
        label="Назначение платежа"
        rules={PURPOSE_RULES}
      >
        <Input.TextArea maxLength={210} showCount rows={4} />
      </Form.Item>
      <Form.Item
        name={'depositBeforeAccepted'}
        label="Внести задаток до"
        rules={[
          {
            required: true,
            message: 'Обязательное поле',
          },
          {
            validator: (_, value?: Dayjs) => {
              if (value && value.isBefore(dayjs())) {
                return Promise.reject('Не может быть в прошлом времени');
              }

              return Promise.resolve();
            },
          },
        ]}
      >
        <DatePicker format={'DD.MM.YYYY'} />
      </Form.Item>
    </Card>
  );
};

export default PrincipalAccepting;
