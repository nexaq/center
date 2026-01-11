import {Alert, Button, Card, Descriptions, Flex} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import React from 'react';
import {type ApplicationWithAdminStatus, RecommendationAcceptanceOfferStatus} from '~/api/application/types';
import {downloadPayment} from '~/api/application/downloadPayment';
import {ApplicationStatus} from '~/api/application/getList';

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

const getStatus = (status: RecommendationAcceptanceOfferStatus) => {
    if (status === RecommendationAcceptanceOfferStatus.ACCEPTED) {
        return 'Принял предложение';
    }

    if (status === RecommendationAcceptanceOfferStatus.REJECTED) {
        return 'Отказался от предложения';
    }

    if (status === RecommendationAcceptanceOfferStatus.NOT_EXISTS) {
        return 'Не существует';
    }

    if (status === RecommendationAcceptanceOfferStatus.EXPIRED) {
        return 'Срок действия предложения истек';
    }

    if (status === RecommendationAcceptanceOfferStatus.IS_CONSIDERING) {
        return 'На рассмотрении';
    }

    return 'Неизвестно';
}

const DepositStatusAlert = ({
  application,
}: {
  application: ApplicationWithAdminStatus;
}) => {

  const isDepositPaid =
    application.paymentFile &&
    application.status !== ApplicationStatus.WAITING_DEPOSIT;

  return (
    <Flex gap={16} vertical>
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
      <Card>
        <Descriptions title="Новое ценовое предложении" column={2}>
            <Descriptions.Item label="Статус">
                {getStatus(application.recommendationAcceptanceInfo)}
            </Descriptions.Item>
        </Descriptions>
      </Card>
    </Flex>
  );
};

export default DepositStatusAlert;
