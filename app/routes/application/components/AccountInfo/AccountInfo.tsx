import { Card, Descriptions, Flex } from 'antd';
import React from 'react';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import dayjs from 'dayjs';
import { CopyableValue } from '~/routes/application/components/Accounts/Accounts';

const AccountInfo = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {
  return (
    <Flex vertical gap={16}>
      <Card>
        <Descriptions title="Аккаунт" column={2}>
          <Descriptions.Item label="Имя">
            {application.user.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <CopyableValue value={application.user.email} />
          </Descriptions.Item>
          <Descriptions.Item label="Создан">
            {dayjs(application.user.createdAt).format('DD.MM.YYYY HH:mm')}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      {application.p2 && (
        <Card>
          <Descriptions title="Паспорт" column={2}>
            <Descriptions.Item label="Имя">
              {application.p2?.lastName} {application.p2?.firstName}{' '}
              {application.p2?.thirdName}
            </Descriptions.Item>
            <Descriptions.Item label="Адрес">
              {application.p2?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Серия и номер">
              {application.p2?.seriesNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Дата рождения">
              {application.p2?.birthday}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </Flex>
  );
};

export default AccountInfo;
