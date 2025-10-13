import st from './ApplicationStatus.module.scss';
import { Flex, Tag, Typography } from 'antd';
import React from 'react';
import {
  ApplicationAdminStatus,
  ApplicationStatus as StatusType,
} from '~/api/application/getList';
import Dollar from '~/icons/dollar/Dollar';

const { Text, Link } = Typography;

const getConfig = (status: ApplicationAdminStatus) => {
  if (status === ApplicationAdminStatus.CREATED) {
    return {
      color: undefined,
      text: 'Создан',
      sub: 'Не оплачен',
    };
  } else if ([ApplicationAdminStatus.REVIEW, ApplicationAdminStatus.DEPOSIT_DETAILS, ApplicationAdminStatus.BID_CORRECTION].includes(status)) {
    return {
      color: 'orange',
      text: 'Ожидает действия',
      sub: 'Оплатил',
    };
  }
};

const ApplicationStatus = ({ status }: { status: ApplicationAdminStatus }) => {
  const config = getConfig(status);
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
