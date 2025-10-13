import type { Route } from '../+types/home';
import Stepper from '~/routes/application/components/Stepper/Stepper';
import {
  Alert,
  Card,
  Descriptions,
  Flex,
  Space,
  Spin,
  Tabs,
  type TabsProps,
  Typography,
} from 'antd';
import React, { type ReactNode, useEffect, useState } from 'react';
import Navigation from '~/routes/application/components/Navigation/Navigation';
import { useNavigate, useParams } from 'react-router';
import { getApplication } from '~/api/application/getApplication';
import { isAxiosError } from 'axios';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { getLot } from '~/api/lot/getLot';
import type { LotModel } from '~/api/lot/types';
import LotInfo from '~/routes/application/components/LotInfo/LotInfo';
import AccountInfo from '~/routes/application/components/AccountInfo/AccountInfo';
import distributor from '~/routes/application/components/Distributor/Distributor';
import { useQuery } from '@tanstack/react-query';
import {useApplication} from "~/hooks/useApplication/useApplication";

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
      key: '4',
      label: 'Паспорт',
      children: (
        <Card>
          <Descriptions title="Паспорт" column={2}>
            <Descriptions.Item label="Имя">
              МАРИЯ ИВАНОВА АНТОНОВНА
            </Descriptions.Item>
            <Descriptions.Item label="Адрес">
              123456, Россия, г. Москва, ул. Тверская, д. 1, корп. 2, кв. 5.
            </Descriptions.Item>
            <Descriptions.Item label="Серия и номер">
              77 88 157444
            </Descriptions.Item>
            <Descriptions.Item label="Дата рождения">
              01.06.1995
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ),
    },
    {
      key: '5',
      label: 'Счета',
      children: (
        <Card>
          <Descriptions title="Счет для возрата задатка" column={2}>
            <Descriptions.Item label="Имя">
              МАРИЯ ИВАНОВА АНТОНОВНА
            </Descriptions.Item>
            <Descriptions.Item label="Р/С">
              87775984989884741859
            </Descriptions.Item>
            <Descriptions.Item label="Бик">788157444</Descriptions.Item>
            <Descriptions.Item label="Банк">Лох Банк АО</Descriptions.Item>
            <Descriptions.Item label="Корр Счет">
              98787788484117449555
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default function Application() {
  const navigate = useNavigate();
  const [lot, setLot] = useState<LotModel>();
  const [error, setError] = useState(false);
  const [lotLoading, setLotLoading] = useState(true);

  const { data: application, isError, isLoading } = useApplication();

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
    return <Alert
      message="Произошла ошибка!"
      description="Свяжитесь с администратором!"
      type="error"
    />;
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
        <Space direction="vertical" size={0} style={{ width: '100%' }}>
          <Stepper application={application} />
          <Title level={3}>{lot?.title}</Title>
        </Space>
        <TabDivider application={application} lot={lot} />
        {/*<Form name="trigger" style={{maxWidth: 600}} layout="vertical" autoComplete="off">*/}
        {/*    <Form.Item*/}
        {/*        hasFeedback*/}
        {/*        label="Р/С"*/}
        {/*        name="field_a"*/}
        {/*        validateTrigger="onBlur"*/}
        {/*        rules={[{max: 20}]}*/}
        {/*    >*/}
        {/*        <Input />*/}
        {/*    </Form.Item>*/}

        {/*    <Form.Item*/}
        {/*        hasFeedback*/}
        {/*        label="БИК"*/}
        {/*        name="field_b"*/}
        {/*        validateDebounce={1000}*/}
        {/*        rules={[{max: 9}]}*/}
        {/*    >*/}
        {/*        <Input />*/}
        {/*    </Form.Item>*/}

        {/*    <Form.Item*/}
        {/*        hasFeedback*/}
        {/*        label="Банк"*/}
        {/*        name="field_c"*/}
        {/*        validateFirst*/}
        {/*        rules={[{max: 6}, {max: 3, message: 'Continue input to exceed 6 chars'}]}*/}
        {/*    >*/}
        {/*        <Input />*/}
        {/*    </Form.Item>*/}

        {/*    <Form.Item*/}
        {/*        hasFeedback*/}
        {/*        label="Корр Счет"*/}
        {/*        name="corr_account"*/}
        {/*        validateFirst*/}
        {/*        rules={[{max: 20}, { required: true }]}*/}
        {/*    >*/}
        {/*        <Input />*/}
        {/*    </Form.Item>*/}

        {/*    <Form.Item*/}
        {/*        hasFeedback*/}
        {/*        label="Назначение платежа"*/}
        {/*        name="description"*/}
        {/*        validateFirst*/}
        {/*        rules={[{max: 20}, { required: true }]}*/}
        {/*    >*/}
        {/*        <Input.TextArea showCount maxLength={1000} />*/}
        {/*    </Form.Item>*/}

        {/*    <Button type="primary">Отправить</Button>*/}
        {/*</Form>*/}
      </Space>
    </div>
  );
}
