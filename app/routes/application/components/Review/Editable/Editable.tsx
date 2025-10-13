import st from './Editable.module.scss';
import { EditOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import CurrencyInput from '~/components/CurrencyInput/CurrencyInput';
import _ from 'lodash';
import { format, unformat } from '@react-input/number-format';
import { useMutation } from '@tanstack/react-query';
import { bidCorrections } from '~/api/application/bidCorrection';
import type { Rule } from 'rc-field-form/lib/interface';

const { Link } = Typography;

const ModalEdit = ({
  open,
  setOpen,
  defaultValue,
  title,
  loading,
  label,
  rules,
  onSubmit,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  defaultValue?: string | number | null;
  title: string;
  loading: boolean;
  label: string;
  rules?: Rule[];
  onSubmit: (value: number) => Promise<void>;
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      width={400}
      title={title}
      open={open}
      cancelText={'Отмена'}
      okText={'Сохранить'}
      onOk={() => {
        form.submit();
        setOpen(true);
      }}
      okButtonProps={{
        loading,
      }}
      cancelButtonProps={{
        loading,
      }}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <Input style={{ display: 'none' }} />
      <Form
        initialValues={{
          value: !_.isNil(defaultValue) ? format(defaultValue) : '',
        }}
        form={form}
        layout={'vertical'}
        onFinish={(e: { value: number | string }) => {
          onSubmit(
            typeof e.value === 'string' ? Number(unformat(e.value)) : e.value,
          ).then(() => setOpen(false));
        }}
      >
        <Form.Item label={label} name="value" rules={rules}>
          {/*@ts-ignore*/}
          <CurrencyInput />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Editable = ({
  defaultValue,
  correctionValue,
  title,
  loading,
  label,
  rules,
  onSubmit,
}: {
  defaultValue: string | number | null;
  correctionValue: number | null;
  title: string;
  loading: boolean;
  label: string;
  rules?: Rule[];
  onSubmit: (value: number) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);

  const defaultValueDisplay = format(Number(defaultValue), {
    locales: 'ru',
  });

  // const x = useMutation({
  //   mutationFn: () => {
  //     return bidCorrections();
  //   }
  // });

  return (
    <div className={st.main}>
      {correctionValue ? <del>{defaultValueDisplay}</del> : defaultValueDisplay}{' '}
      {correctionValue && <strong>{correctionValue}</strong>}{' '}
      <Link
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <EditOutlined />
      </Link>
      {open && (
        <ModalEdit
          onSubmit={onSubmit}
          rules={rules}
          label={label}
          loading={loading}
          title={title}
          open={open}
          setOpen={setOpen}
          defaultValue={correctionValue ?? defaultValue}
        />
      )}
    </div>
  );
};

export default Editable;
