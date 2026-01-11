import st from './ApplicationStatus.module.scss';
import { Flex, Tag, Typography } from 'antd';
import React from 'react';
import {
  ApplicationAdminStatus,
  ApplicationStatus as Status,
} from '~/api/application/getList';
import Dollar from '~/icons/dollar/Dollar';

const { Text } = Typography;

const getConfig = (adminStatus: ApplicationAdminStatus, status: Status) => {
  if (adminStatus === ApplicationAdminStatus.CREATED) {
    return {
      color: undefined,
      text: 'Создан',
      sub: 'Не оплачен',
    };
  } else if (
    [
      ApplicationAdminStatus.REVIEW,
      ApplicationAdminStatus.DEPOSIT_DETAILS,
    ].includes(adminStatus)
  ) {
    return {
      color: 'orange',
      text: 'На рассмотрении',
      sub: 'Оплатил',
    };
  } else if ([ApplicationAdminStatus.IN_WORK].includes(adminStatus)) {
    return {
      color: 'blue',
      text: 'В работе',
      sub: 'Оплатил',
    };
  } else if ([ApplicationAdminStatus.RESULT].includes(adminStatus) && status === Status.WON) {
    return {
      color: 'green',
      text: 'Победил',
      sub: 'Оплатил',
    };
  } else if ([ApplicationAdminStatus.RESULT].includes(adminStatus) && status === Status.LOST) {
    return {
      color: 'red',
      text: 'Проиграл',
      sub: 'Оплатил',
    };
  }
};

const ApplicationStatus = ({ adminStatus, status }: { adminStatus: ApplicationAdminStatus, status: Status }) => {
  const config = getConfig(adminStatus, status);
  if (!config) {
    return <></>;
  }

  return (
    <Flex gap={4} align={'start'} vertical={true} justify={'center'}>
      <Tag color={config.color}>{config.text}</Tag>
      <Flex gap={4} align={'center'}>
        {config.sub === 'Оплатил' && (
          <div className={st.icon}>
            <Dollar width={16} height={16} />
          </div>
        )}
        <Text type={'secondary'}>{config.sub}</Text>
      </Flex>
    </Flex>
  );
};

export default ApplicationStatus;
