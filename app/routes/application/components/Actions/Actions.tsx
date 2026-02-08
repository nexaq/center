import { Dropdown, Flex } from 'antd';
import type { LotModel } from '~/api/lot/types';
import ApplicationCancel from '~/components/ApplicationCancel/ApplicationCancel';
import type { ApplicationWithAdminStatus } from '~/api/application/types';

interface ActionsProps {
  lot: LotModel;
  application: ApplicationWithAdminStatus;
}

const ViewActions = ({ lot, application }: ActionsProps) => {
  const items = [
    {
      key: '1',
      label: 'На сайте',
      onClick: () => {
        window.open(`https://mercx.ru/lot/${lot.urlCode}`, '_blank');
      },
    },
    {
      key: '2',
      label: 'На ЭТП',
      onClick: () => {
        window.open(lot.platformLotLink, '_blank');
      },
    },
    {
      key: '3',
      label: 'На ЕФРСБ',
      onClick: () => {
        window.open(
          `https://old.bankrot.fedresurs.ru/TradeCard.aspx?ID=${lot.sale.uuid}`,
          '_blank',
        );
      },
    },
  ];

  return (
    <Flex align="center" gap="small">
      <Dropdown.Button
        menu={{ items }}
        onClick={(e) => {
          window.open(lot.platformLotLink, '_blank');
        }}
      >
        Смотреть
      </Dropdown.Button>
      <ApplicationCancel application={application} />
    </Flex>
  );
};

const Actions = ({ lot, application }: ActionsProps) => {
  return (
    <Flex gap="small" wrap>
      <ViewActions lot={lot} application={application} />
    </Flex>
  );
};

export default Actions;
