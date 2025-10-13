import React from 'react';
import {Alert, Space, Table, Tag} from 'antd';
import type { TableProps } from 'antd';
import type { PriceTableItem } from '~/api/lot/types';
import formatNumber from "~/helpers/formatNumber";
import dayjs from "dayjs";


const columns: TableProps<PriceTableItem>['columns'] = [
  {
    title: 'С',
    dataIndex: 'begin',
    key: 'begin',
    render: (value) => {
      return <>{dayjs(value).format('DD.MM.YYYY HH:mm')}</>
    }
  },
  {
    title: 'По',
    dataIndex: 'end',
    key: 'end',
    render: (value) => {
      return <>{dayjs(value).format('DD.MM.YYYY HH:mm')}</>
    }
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    align: 'right',
    render: (value) => {
      return <>{formatNumber(value)}</>
    }
  },
  {
    title: 'Задаток',
    dataIndex: 'deposit',
    key: 'deposit',
    align: 'right',
    render: (value) => {
      return <>{formatNumber(value)}</>
    }
  },
];



const PublicOfferTable = ({ table }: {
  table?: PriceTableItem[];
}) => {
  if (!table) {
    return <Alert message={'Нет талицы с периодами'} description={'Сообщите администратору'} type={'error'} />
  }

  if (!table.length) {
    return <Alert message={'Талица с периодами пуста'} description={'Сообщите администратору'} type={'error'} />
  }


  return (
    <Table<PriceTableItem> pagination={false} columns={columns} dataSource={table} />
  );
};

export default PublicOfferTable;
