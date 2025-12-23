import { Card, Descriptions, Space, Typography } from 'antd';
import React from 'react';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import type { LotModel } from '~/api/lot/types';
import formatNumber from '~/helpers/formatNumber';
import PriceDescription from '~/routes/application/components/PriceDescription/PriceDescription';

const { Link, Text } = Typography;

const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

export const displayDeposit = (
  deposit: number | undefined,
  startPrice: number,
) => {
  if (!deposit) {
    return (
      <Text type={'danger'} strong>
        Нет задатка!
      </Text>
    );
  }

  const percentage = deposit / startPrice;

  return (
    <>
      {formatNumber(deposit)} ({round(percentage * 100)}%)
    </>
  );
};

export const auctionStepPrice = (stepPrice?: number) => {
  if (!stepPrice) {
    return (
      <Text type={'danger'} strong>
        Нет шага аукциона!
      </Text>
    );
  }

  return formatNumber(stepPrice);
};

const LotInfo = ({
  application,
  lot,
}: {
  application: ApplicationWithAdminStatus;
  lot: LotModel;
}) => {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card>
        <Space direction={'vertical'} size={30}>
          <Descriptions
            title={
              lot.sale.type === 'AUCTION' ? 'Аукцион' : 'Публичное предложение'
            }
            column={2}
          >
            <Descriptions.Item label="Номер">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    lot.platformLotLink,
                    '_blank',
                  );
                }}
                style={{ fontWeight: 500 }}
              >
                {application.saleNumber}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="Номер торгов">
              {lot.number}
            </Descriptions.Item>
            <Descriptions.Item label="Площадка">
              {lot.sale.platform}
            </Descriptions.Item>
            <Descriptions.Item label="Дата размещения">
              {lot.sale.EFRSBPublishedAt_formatted}
            </Descriptions.Item>
            <Descriptions.Item label="Регион">
              {lot.trueRegion}
            </Descriptions.Item>
            <Descriptions.Item label="Начало приёма заявок">
              {lot.sale.acceptingApplicationsStartAt_formatted}
            </Descriptions.Item>
            <Descriptions.Item label="Суд">
              {lot.sale.arbitrationCourt}
            </Descriptions.Item>
            <Descriptions.Item label="Конец приёма заявок">
              {lot.sale.acceptingApplicationsEndAt_formatted}
            </Descriptions.Item>
            <Descriptions.Item label="Дело">
              {lot.sale.caseNumber}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
      <Card>
        <PriceDescription lot={lot} application={application} />
      </Card>
      <Card>
        <Space direction={'vertical'} size={30}>
          <Descriptions title="Описание" column={1}>
            <Descriptions.Item>
              {lot.subject}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
    </Space>
  );
};

export default LotInfo;
