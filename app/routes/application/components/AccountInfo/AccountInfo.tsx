import st from './AccountInfo.module.scss';
import { Card, Descriptions } from 'antd';
import React from 'react';
import type { ApplicationWithAdminStatus } from '~/api/application/types';

const AccountInfo = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {

  return (
    <Card>
      <Descriptions title="Аккаунт" column={2}>
        <Descriptions.Item label="Имя">
          {application.user.name}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {application.user.email}
        </Descriptions.Item>
        <Descriptions.Item label="Создан">
          {application.user.createdAt}
        </Descriptions.Item>
        {/*<Descriptions.Item label="Последний IP">99.15.32.14</Descriptions.Item>*/}
      </Descriptions>
    </Card>
  );
};

export default AccountInfo;
