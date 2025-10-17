import st from './AccountInfo.module.scss';
import {Card, Descriptions, Flex} from 'antd';
import React from 'react';
import type { ApplicationWithAdminStatus } from '~/api/application/types';

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
            {application.user.email}
          </Descriptions.Item>
          <Descriptions.Item label="Создан">
            {application.user.createdAt}
          </Descriptions.Item>
        </Descriptions>
      </Card>
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
    </Flex>
  );
};

export default AccountInfo;
