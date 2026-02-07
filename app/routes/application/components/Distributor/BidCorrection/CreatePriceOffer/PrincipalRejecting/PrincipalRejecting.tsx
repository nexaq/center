import {Card, DatePicker, Form, Input} from 'antd';
import { unformat } from '@react-input/number-format';
import CurrencyInput from '~/components/CurrencyInput/CurrencyInput';
import React from 'react';
import dayjs, {type Dayjs} from "dayjs";
import {PURPOSE_RULES} from "~/routes/application/components/Distributor/BidCorrection/CreatePriceOffer/purpose.rules";

const PrincipalRejecting = () => {
  const form = Form.useFormInstance()

  return (
    <Card title={'Принципал отказывается'} style={{ flex: 1 }}>
      <Form.Item
        name={'priceRejected'}
        label="Старая цена принципала"
        rules={[
          {
            required: true,
            min: 1,
            transform: (v) => Number(unformat(v)),
          },
        ]}
      >
        {/*@ts-ignore*/}
        <CurrencyInput disabled={true} />
      </Form.Item>
      <Form.Item
        name={'depositRejected'}
        label="Задаток (проверить условия и размер на периоде):"
        rules={[
          {
            required: true,
            min: 1,
            transform: (v) => Number(unformat(v)),
          },
          {
            validator: (_, value) => {
              const priceRejected = Number(unformat(form.getFieldValue('priceRejected'))) as number;
              const current = Number(unformat(value));

              if (current > priceRejected) {
                return Promise.reject('Должно быть меньше чем цена');
              }

              return Promise.resolve();
            }
          }
        ]}
      >
        {/*@ts-ignore*/}
        <CurrencyInput />
      </Form.Item>
      <Form.Item
        name={'purposeRejected'}
        label="Назначение платежа"
        rules={PURPOSE_RULES}
      >
        <Input.TextArea maxLength={210} showCount rows={4} />
      </Form.Item>
      <Form.Item
        name={'depositBeforeRejected'}
        label="Внести задаток до"
        rules={[
          {
            required: true,
            message: 'Обязательное поле',
          },
          {
            validator: (_, value?: Dayjs) => {
              if (value && value.isBefore(dayjs())) {
                return Promise.reject('Не может быть в прошлом времени')
              }

              return Promise.resolve();
            }
          }
        ]}
      >
        <DatePicker format={'DD.MM.YYYY'} />
      </Form.Item>
    </Card>
  );
};

export default PrincipalRejecting;
