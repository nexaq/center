import React, { type ReactNode, useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import st from './ApplicationTable.module.scss';
import { useNavigate } from 'react-router';
import cn from 'classnames';
import { getList } from '~/api/application/getList';
import ApplicationStatus from '~/components/ApplicationStatus/ApplicationStatus';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { useQuery } from '@tanstack/react-query';
import { useTableStore } from '~/components/ApplicationTable/tableStore';
import PayTabs from "~/components/ApplicationTable/Tabs/Tabs";
import {ApplicationLeftBefore} from "~/components/ApplicationLeftBefore/ApplicationLeftBefore";
import { ApplicationStatus as ApplicationStatusEnum } from '~/api/application/getList';
import type {LotSaleStatus} from "~/api/lot/types";

const { Link } = Typography;

interface DataType {
  key: number;
  id: number;
  code: string;
  name: string;
  lot: ReactNode;
  status: ReactNode;
  left: {
    endAt: string,
    status: ApplicationStatusEnum,
    lotStatus: LotSaleStatus,
    paidAt: string | null,
  };
}

const LotInfo = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {
  return (
    <div>
      <div>
        <Link
          href={'#'}
          className={st.rowLotLink}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(
              `https://mercx.ru/lot/${application.lotCode}`,
              '_blank',
            );
          }}
        >
          {application.saleNumber}
        </Link>
      </div>
      {application.title}
    </div>
  );
};

const ApplicationTable = () => {
  const navigate = useNavigate();
  const { tab } = useTableStore();

  const { data: list, isPending } = useQuery({
    queryKey: ['applicationList', tab],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      return await getList(tab);
    },
  });

  return (
    <>
      <PayTabs />
      <Table<DataType>
        loading={isPending}
        rowClassName={(k) =>
          cn(k.key % 2 === 1 && st.rowMuted, st.rowClickable)
        }
        pagination={false}
        dataSource={
          list?.map((i) => {
            return {
              key: i.id,
              id: i.id,
              code: i.code,
              name: i.user.name ?? i.user.email,
              lot: <LotInfo application={i} />,
              status: (
                <ApplicationStatus
                  adminStatus={i.adminStatus}
                  status={i.status}
                />
              ),
              left: {
                endAt: i.lot.sale.acceptingApplicationsEndAt,
                status: i.status,
                lotStatus: i.lot.status,
                paidAt: i.paidAt,
              },
            };
          }) ?? []
        }
        columns={[
          {
            title: 'Номер',
            dataIndex: 'code',
            key: 'code',
            className: st.rowCode,
          },
          {
            title: 'Участник',
            dataIndex: 'name',
            key: 'name',
            className: st.userCol
          },
          {
            title: 'Лот',
            dataIndex: 'lot',
            key: 'lot',
          },
          {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: 'Осталось',
            dataIndex: 'left',
            key: 'left',
            render: (v) => <ApplicationLeftBefore status={v.status} endAt={v.endAt} lotStatus={v.lotStatus} paidAt={v.paidAt} />
          },
        ]}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate(`/application/${record.id}`);
            },
          };
        }}
      />
    </>
  );
};

export default ApplicationTable;
