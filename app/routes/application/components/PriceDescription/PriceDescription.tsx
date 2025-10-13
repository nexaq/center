import { Descriptions, Space } from 'antd';
import formatNumber from '~/helpers/formatNumber';
import React from 'react';
import {
  auctionStepPrice,
  displayDeposit,
} from '~/routes/application/components/LotInfo/LotInfo';
import type { LotModel } from '~/api/lot/types';

const PriceDescription = ({
  lot,
  title,
}: {
  lot: LotModel;
  title?: string;
}) => {
  return (
    <Descriptions title={title ?? 'Стоимость'}  column={2}>
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
  );
};

export default PriceDescription;
