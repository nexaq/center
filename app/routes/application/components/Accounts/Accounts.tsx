import {Card, Descriptions, Flex, Typography} from 'antd';
import React from 'react';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import formatNumber from '~/helpers/formatNumber';
import DepositStatusAlert from "~/routes/application/components/DepositStatusAlert/DepositStatusAlert";

export const CopyableValue = ({
  value,
  copyable,
}: {
  value: string;
  copyable?: string;
}) => {
  return (
    <Typography.Text copyable={{ text: copyable ?? value }}>
      {value}
    </Typography.Text>
  );
};

const Accounts = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {
  return (
    <Flex vertical gap={16}>
      <DepositStatusAlert application={application} />
      {application.depositDetails && (
        <Card>
          <Descriptions title="Счет для внесения задатка" column={2}>
            <Descriptions.Item label="Имя">
              <CopyableValue value={application.depositDetails.name} />
            </Descriptions.Item>
            <DepositStatusAlert application={application} />
            <Descriptions.Item label="Р/С">
              <CopyableValue value={application.depositDetails.account} />
            </Descriptions.Item>
            <Descriptions.Item label="Банк">
              <CopyableValue value={application.depositDetails.bankName} />
            </Descriptions.Item>
            <Descriptions.Item label="Бик">
              <CopyableValue value={application.depositDetails.bic} />
            </Descriptions.Item>
            <Descriptions.Item label="Корр Счет">
              <CopyableValue value={application.depositDetails.corrAccount} />
            </Descriptions.Item>
            <Descriptions.Item label="Сумма">
              <CopyableValue
                value={formatNumber(application.depositDetails.sum)}
                copyable={String(application.depositDetails.sum)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Назначение платежа" span={2}>
              <CopyableValue value={application.depositDetails.purpose} />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
      {application.returnDepositDetails && (
        <Card>
          <Descriptions title="Счет для возврата задатка" column={2}>
            <Descriptions.Item label="Имя">
              <CopyableValue value={application.returnDepositDetails.name} />
            </Descriptions.Item>
            <Descriptions.Item label="Р/С">
              <CopyableValue
                value={String(application.returnDepositDetails.accountNumber)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Бик">
              <CopyableValue
                value={String(application.returnDepositDetails.bic)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Банк">
              <CopyableValue
                value={application.returnDepositDetails.bankName}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Корр Счет">
              <CopyableValue
                value={String(
                  application.returnDepositDetails.correspondentAccount,
                )}
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </Flex>
  );
};

export default Accounts;
