import type { ApplicationWithAdminStatus } from '~/api/application/types';
import type { LotModel } from '~/api/lot/types';
import { Alert, Card, Descriptions, Flex, Space, Typography } from 'antd';
import React from 'react';
import PublicOfferTable from '~/components/PublicOfferTable/PublicOfferTable';
import ApplicationCancel from '~/components/ApplicationCancel/ApplicationCancel';
import AcceptButton from '~/routes/application/components/Review/AcceptButton/AcceptButton';
import PriceDescription from '~/routes/application/components/PriceDescription/PriceDescription';
import AllCheckboxCheckWrapper, {
  LabelWithCheckbox
} from '~/components/AllCheckboxCheck/AllCheckboxCheckWrapper';
import DebtorInfo from "~/routes/application/components/DebtorInfo/DebtorInfo";

const { Link } = Typography;


const Review = ({
  application,
  lot,
}: {
  application: ApplicationWithAdminStatus;
  lot: LotModel;
}) => {
  return (
    <AllCheckboxCheckWrapper>
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
                lot.sale.type === 'AUCTION'
                  ? 'Аукцион'
                  : 'Публичное предложение'
              }
              column={2}
            >
              <Descriptions.Item label={<LabelWithCheckbox label={'Лот'} />}>{lot.title}</Descriptions.Item>
              <Descriptions.Item label={<LabelWithCheckbox label={'Номер'} />}>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(lot.platformLotLink, '_blank');
                  }}
                  style={{ fontWeight: 500 }}
                >
                  {application.saleNumber}
                </Link>
              </Descriptions.Item>
              <Descriptions.Item label={<LabelWithCheckbox label={'Площадка'} />}>
                {lot.sale.platform}
              </Descriptions.Item>
              <Descriptions.Item label={<LabelWithCheckbox label={'Дата размещения'} />}>
                {lot.sale.EFRSBPublishedAt_formatted}
              </Descriptions.Item>
              <Descriptions.Item label={<LabelWithCheckbox label={'Регион'} />}>
                {lot.trueRegion}
              </Descriptions.Item>
              <Descriptions.Item label={<LabelWithCheckbox label={'Начало приёма заявок'} />}>
                {lot.sale.acceptingApplicationsStartAt_formatted}
              </Descriptions.Item>
              <Descriptions.Item label={<LabelWithCheckbox label={'Суд'} />}>
                {lot.sale.arbitrationCourt}
              </Descriptions.Item>
              <Descriptions.Item label={<LabelWithCheckbox label={'Конец приёма заявок'} />}>
                {lot.sale.acceptingApplicationsEndAt_formatted}
              </Descriptions.Item>
              <Descriptions.Item label={<LabelWithCheckbox label={'Дело'} />}>
                {lot.sale.caseNumber}
              </Descriptions.Item>
              <Descriptions.Item label={<LabelWithCheckbox label={'Номер лота'} />}>
                {lot.number}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </Card>
        <Card>
          <Space direction={'vertical'} size={30}>
            <PriceDescription lot={lot} application={application} />
          </Space>
        </Card>
        {lot.sale.type === 'PUBLIC_OFFER' && (
          <Card>
            <PublicOfferTable table={lot.priceTable} />
          </Card>
        )}
        <DebtorInfo lot={lot} />
        <Card>
          <Space direction={'vertical'} size={30}>
            <Descriptions title="Описание" column={1}>
              <Descriptions.Item>
                <LabelWithCheckbox label={lot.subject} />
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </Card>
        <Card>
          <Flex gap="small" justify={'right'} wrap>
            <ApplicationCancel application={application} />
            <AcceptButton application={application} />
          </Flex>
        </Card>
      </Space>
    </AllCheckboxCheckWrapper>
  );
};

export default Review;
