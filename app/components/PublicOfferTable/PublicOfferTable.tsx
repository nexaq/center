import React from 'react';
import type { TableProps } from 'antd';
import { Alert, Table } from 'antd';
import type { PriceTableItem } from '~/api/lot/types';
import formatNumber from '~/helpers/formatNumber';
import dayjs from 'dayjs';
import { LabelWithCheckbox } from '~/components/AllCheckboxCheck/AllCheckboxCheckWrapper';
import st from './PublicOfferTable.module.scss';

const columns: TableProps<PriceTableItem>['columns'] = [
  {
    title: 'Начало',
    dataIndex: 'begin',
    key: 'begin',
    render: (value) => {
      return <>{dayjs(value).format('DD.MM.YYYY HH:mm')}</>;
    },
  },
  {
    title: 'Конец',
    dataIndex: 'end',
    key: 'end',
    render: (value) => {
      return <>{dayjs(value).format('DD.MM.YYYY HH:mm')}</>;
    },
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    align: 'right',
    render: (value) => {
      return <>{formatNumber(value)}</>;
    },
  },
  {
    title: 'Задаток',
    dataIndex: 'deposit',
    key: 'deposit',
    align: 'right',
    render: (value) => {
      return <>{formatNumber(value)}</>;
    },
  },
];

const PublicOfferTable = ({ table }: { table?: PriceTableItem[] }) => {
  if (!table) {
    return (
      <Alert
        message={'Нет талицы с периодами'}
        description={'Сообщите администратору'}
        type={'error'}
      />
    );
  }

  if (!table.length) {
    return (
      <Alert
        message={'Талица с периодами пуста'}
        description={'Сообщите администратору'}
        type={'error'}
      />
    );
  }

  return (
    <div className={st.wrapper}>
      <LabelWithCheckbox label={'Проверь таблицу'} />
      <Table<PriceTableItem>
        pagination={false}
        columns={columns}
        dataSource={table}
      />
    </div>
  );
};

export default PublicOfferTable;
