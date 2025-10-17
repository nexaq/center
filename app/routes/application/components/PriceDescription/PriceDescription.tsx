import { Descriptions } from 'antd';
import formatNumber from '~/helpers/formatNumber';
import React from 'react';
import { displayDeposit } from '~/routes/application/components/LotInfo/LotInfo';
import type { LotModel } from '~/api/lot/types';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import {
  EditStepPrice,
  WantPrice,
} from '~/routes/application/components/Distributor/BidCorrection/BidCorrection';

const PriceDescription = ({
  lot,
  title,
  application,
}: {
  lot: LotModel;
  title?: string;
  application: ApplicationWithAdminStatus;
}) => {
  return (
    <Descriptions title={title ?? 'Стоимость'} column={2}>
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
          <EditStepPrice
            withPercentage={true}
            editable={false}
            defaultValue={lot.stepPrice}
            application={application}
            startPrice={lot.startPrice}
          />
        </Descriptions.Item>
      )}
      {application.userPrice && (
        <Descriptions.Item label={'Желаемая стоимость'}>
          <WantPrice lot={lot} application={application} />
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default PriceDescription;
