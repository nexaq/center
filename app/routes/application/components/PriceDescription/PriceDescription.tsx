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
import {LabelWithCheckbox} from "~/components/AllCheckboxCheck/AllCheckboxCheckWrapper";

const PriceDescription = ({
  lot,
  title,
  application,
  showPrincipalPrice = true
}: {
  lot: LotModel;
  title?: string;
  application: ApplicationWithAdminStatus;
  showPrincipalPrice?: boolean
}) => {
  return (
    <Descriptions title={title ?? 'Стоимость'} column={2}>
      <Descriptions.Item label={<LabelWithCheckbox label={'Текущая цена'} />}>
        {formatNumber(lot.currentPrice)}
      </Descriptions.Item>
      <Descriptions.Item label={<LabelWithCheckbox label={"Задаток"} />}>
        {displayDeposit(lot.deposit, lot.startPrice)}
      </Descriptions.Item>
      <Descriptions.Item label={<LabelWithCheckbox label={"Начальная цена"} />}>
        {formatNumber(lot.startPrice)}
      </Descriptions.Item>
      {lot.sale.type === 'AUCTION' && (
        <Descriptions.Item label={<LabelWithCheckbox label={"Шаг аукциона"} />}>
          <EditStepPrice
            withPercentage={true}
            editable={false}
            defaultValue={lot.stepPrice}
            application={application}
            startPrice={lot.startPrice}
          />
        </Descriptions.Item>
      )}
      {application.userPrice && showPrincipalPrice && (
        <Descriptions.Item label={<LabelWithCheckbox label={"Цена принципала"} />}>
          <WantPrice application={application} />
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default PriceDescription;
