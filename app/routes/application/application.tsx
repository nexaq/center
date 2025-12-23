import type { Route } from '../+types/home';
import Stepper from '~/routes/application/components/Stepper/Stepper';
import {
  Alert,
  Flex,
  Space,
  Spin,
  Tabs,
  type TabsProps,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import Navigation from '~/routes/application/components/Navigation/Navigation';
import { Link, useNavigate } from 'react-router';
import { isAxiosError } from 'axios';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { getLot } from '~/api/lot/getLot';
import type { LotModel } from '~/api/lot/types';
import LotInfo from '~/routes/application/components/LotInfo/LotInfo';
import AccountInfo from '~/routes/application/components/AccountInfo/AccountInfo';
import distributor from '~/routes/application/components/Distributor/Distributor';
import { useApplication } from '~/hooks/useApplication/useApplication';
import Accounts from '~/routes/application/components/Accounts/Accounts';
import Actions from '~/routes/application/components/Actions/Actions';

const { Title } = Typography;

export function meta({}: Route.MetaArgs) {
  return [{ title: 'CENTER' }];
}

const TabDivider = ({
  application,
  lot,
}: {
  application: ApplicationWithAdminStatus;
  lot: LotModel;
}) => {
  const action = distributor({
    application,
    lot,
  });

  const items: TabsProps['items'] = [
    ...(action
      ? [
          {
            key: '1',
            label: 'Главная',
            children: action,
          },
        ]
      : []),
    {
      key: '2',
      label: 'Лот',
      children: <LotInfo application={application} lot={lot} />,
    },
    {
      key: '3',
      label: 'Аккаунт',
      children: <AccountInfo application={application} />,
    },
    {
      key: '5',
      label: 'Задаток',
      children: <Accounts application={application} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default function Application() {
  const navigate = useNavigate();
  const [lot, setLot] = useState<LotModel>();
  const [error, setError] = useState(false);
  const [lotLoading, setLotLoading] = useState(true);

  const {
    data: application,
    isError,
    isLoading,
    isFetching,
  } = useApplication();

  useEffect(() => {
    if (!application) return;

    getLot(application?.lotCode)
      .then(setLot)
      .catch((e) => {
        if (isAxiosError(e) && e.status === 404) {
          alert('Лот не найден! Сообщите администратору!');
          navigate('/');
          return;
        }
        setError(true);
      })
      .finally(() => setLotLoading(false));
  }, [application]);

  if (isError) {
    return (
      <Alert
        message="Произошла ошибка!"
        description="Свяжитесь с администратором!"
        type="error"
      />
    );
  }

  if (isLoading || lotLoading) {
    return (
      <Flex justify={'center'}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert
        message="Произошла ошибка!"
        description="Свяжитесь с администратором!"
        type="error"
      />
    );
  }

  if (!application || !lot) {
    return null;
  }

  return (
    <div>
      <Space direction="vertical" size={15} style={{ width: '100%' }}>
        <Navigation />
        <Space direction="vertical" size={14} style={{ width: '100%' }}>
          <Stepper application={application} />
          <Space direction={'vertical'} size={2}>
            <div>
              <b>
                <Link to={lot.platformLotLink} target={'_blank'}>
                  {application.saleNumber}
                </Link>
              </b>
            </div>
            <Title level={4} style={{ margin: 0 }}>
              {lot?.title}
            </Title>
          </Space>
          <Actions lot={lot} application={application} />
        </Space>
        <TabDivider application={application} lot={lot} />
      </Space>
    </div>
  );
}
