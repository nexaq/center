import type { ApplicationWithAdminStatus } from '~/api/application/types';
import type { LotModel } from '~/api/lot/types';
import {
  auctionStepPrice,
  displayDeposit,
} from '~/routes/application/components/LotInfo/LotInfo';
import { Alert, Card, Descriptions, Flex, Space, Typography } from 'antd';
import formatNumber from '~/helpers/formatNumber';
import React from 'react';
import PublicOfferTable from '~/components/PublicOfferTable/PublicOfferTable';
import ApplicationCancel from '~/components/ApplicationCancel/ApplicationCancel';
import AcceptButton from '~/routes/application/components/Review/AcceptButton/AcceptButton';

const { Link } = Typography;

const Review = ({
  application,
  lot,
}: {
  application: ApplicationWithAdminStatus;
  lot: LotModel;
}) => {
  // const mutation = useMutation({
  //   mutationFn: (newTodo) => {
  //     // return axios.post('/todos', newTodo);
  //   },
  // });

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Alert
        showIcon
        message="Внимательно все проверь!"
        description={
          'Если слишком много ошибок ты можешь отменить заявку и вернуть деньги.'
        }
        type="warning"
      />
      <Card>
        <Space direction={'vertical'} size={30}>
          <Descriptions
            title={
              lot.sale.type === 'AUCTION' ? 'Аукцион' : 'Публичное предложение'
            }
            column={2}
          >
            <Descriptions.Item label={'Лот'}>{lot.title}</Descriptions.Item>
            <Descriptions.Item label="Номер">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    `https://mercx.ru/lot/${application.lotCode}`,
                    '_blank',
                  );
                }}
                style={{ fontWeight: 500 }}
              >
                {application.saleNumber}
              </Link>
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
        <Space direction={'vertical'} size={30}>
          <Descriptions title="Стоимость" column={2}>
            <Descriptions.Item label="Стоимость">
              {formatNumber(lot.currentPrice)}
            </Descriptions.Item>
            <Descriptions.Item label="Задаток">
              {displayDeposit(lot.deposit, lot.startPrice)}
            </Descriptions.Item>
            <Descriptions.Item label="Начальная цена">
              {formatNumber(lot.startPrice)}
            </Descriptions.Item>
            {lot.sale.type === 'AUCTION' && (
              <Descriptions.Item label="Шаг аукциона">
                {auctionStepPrice(lot.stepPrice)}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Space>
      </Card>
      {lot.sale.type === 'PUBLIC_OFFER' && (
        <Card>
          <PublicOfferTable table={lot.priceTable} />
        </Card>
      )}
      <Card>
        <Space direction={'vertical'} size={30}>
          <Descriptions title="Описание" column={1}>
            <Descriptions.Item label="Стоимость">
              {lot.subject}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
      <Card>
        <Flex gap="small" justify={'right'} wrap>
          <ApplicationCancel />
          <AcceptButton application={application} />
        </Flex>
      </Card>
    </Space>
  );
};

export default Review;
