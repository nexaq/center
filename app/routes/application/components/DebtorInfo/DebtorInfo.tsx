import { Card, Descriptions, Space } from 'antd';
import { LabelWithCheckbox } from '~/components/AllCheckboxCheck/AllCheckboxCheckWrapper';
import React from 'react';
import type {LotModel, SaleDTO} from "~/api/lot/types";

const Person = ({ sale }: { sale: SaleDTO }) => {
  if (!sale.person) return null;

  return <Descriptions title={'Должник'} column={2}>
    <Descriptions.Item label={<LabelWithCheckbox label={'Имя'} />}>
      {sale.person.lastName} {sale.person.firstName} {sale.person.middleName}
    </Descriptions.Item>
    <Descriptions.Item label={<LabelWithCheckbox label={'ИНН'} />}>
      {sale.person.INN}
    </Descriptions.Item>
  </Descriptions>
}

const Organization = ({ sale }: { sale: SaleDTO }) => {
  if (!sale.organization) return null;

  return (
    <Descriptions title={'Должник'} column={2}>
      <Descriptions.Item label={<LabelWithCheckbox label={'Название'} />}>
        {sale.organization.shortName}
      </Descriptions.Item>
      <Descriptions.Item label={<LabelWithCheckbox label={'Полное название'} />}>
        {sale.organization.fullName}
      </Descriptions.Item>
      <Descriptions.Item label={<LabelWithCheckbox label={'ИНН'} />}>
        {sale.organization.INN}
      </Descriptions.Item>
    </Descriptions>
  );
}


const DebtorInfo = ({ lot }: { lot: LotModel }) => {
  return (
    <Card>
      <Space direction={'vertical'} size={30}>
        {lot.sale.person && <Person sale={lot.sale} />}
        {lot.sale.organization && <Organization sale={lot.sale} />}
      </Space>
    </Card>
  );
};

export default DebtorInfo;
