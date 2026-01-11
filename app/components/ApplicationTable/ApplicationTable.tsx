import React, { type ReactNode, useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import st from './ApplicationTable.module.scss';
import { useNavigate } from 'react-router';
import cn from 'classnames';
import { getList } from '~/api/application/getList';
import ApplicationStatus from '~/components/ApplicationStatus/ApplicationStatus';
import type { ApplicationWithAdminStatus } from '~/api/application/types';

const { Link } = Typography;

interface DataType {
  key: number;
  id: number;
  code: string;
  name: string;
  lot: ReactNode;
  status: ReactNode;
  left: string;
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

  const [list, setList] = useState<ApplicationWithAdminStatus[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getList()
      .then((i) => setList(i))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Table<DataType>
      loading={loading}
      rowClassName={(k) => cn(k.key % 2 === 1 && st.rowMuted, st.rowClickable)}
      pagination={false}
      dataSource={list.map((i) => {
        return {
          key: i.id,
          id: i.id,
          code: i.code,
          name: i.user.name,
          lot: <LotInfo application={i} />,
          status: (
            <ApplicationStatus adminStatus={i.adminStatus} status={i.status} />
          ),
          left: '2 дня',
        };
      })}
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
  );
};

export default ApplicationTable;
