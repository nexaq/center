import st from './Accounts.module.scss';
import { Card, Descriptions, Flex } from 'antd';
import React from 'react';
import type {ApplicationWithAdminStatus} from "~/api/application/types";




const Accounts = ({ application }: {
  application: ApplicationWithAdminStatus;
}) => {
  console.log(application)

  return (
    <Flex vertical gap={16}>
      {application.accountDetails &&
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
      }
    </Flex>
  );
};

export default Accounts;
