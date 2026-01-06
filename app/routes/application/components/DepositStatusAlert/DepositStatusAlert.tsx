import { Alert, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import React from 'react';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { downloadPayment } from '~/api/application/downloadPayment';
import { ApplicationStatus } from '~/api/application/getList';

const DownloadPaymentFile = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {
  return (
    <Button
      htmlType={'button'}
      variant={'solid'}
      icon={<DownloadOutlined />}
      color={'green'}
      onClick={() => {
        downloadPayment(application.id);
      }}
    >
      Скачать
    </Button>
  );
};

const DepositStatusAlert = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {
  const isDepositPaid =
    application.paymentFile &&
    application.status !== ApplicationStatus.WAITING_DEPOSIT;

  return (
    <>
      {!isDepositPaid && (
        <Alert
          showIcon
          type={'warning'}
          message={'Задаток еще не был внесен!'}
          description={'Возможно стоит выслать напоминание пользователю'}
        />
      )}
      {isDepositPaid && (
        <Alert
          showIcon
          type={'success'}
          message={'Задаток внесен!'}
          description={
            <div>
              <p>Платежное поручение полученно</p>
              <DownloadPaymentFile application={application} />
            </div>
          }
        />
      )}
    </>
  );
};

export default DepositStatusAlert;
