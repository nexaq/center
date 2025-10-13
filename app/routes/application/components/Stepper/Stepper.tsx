import * as React from 'react';
import { Steps } from 'antd';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { ApplicationAdminStatus } from '~/api/application/getList';

interface StepperProps {
  application: ApplicationWithAdminStatus;
}

export default function Stepper({ application }: StepperProps) {
  let current = 0;
  current =
    application.adminStatus === ApplicationAdminStatus.CREATED ? 0 : current;
  current =
    application.adminStatus === ApplicationAdminStatus.REVIEW ? 1 : current;

  current =
    application.adminStatus === ApplicationAdminStatus.BID_CORRECTION
      ? 2
      : current;

  current =
    application.adminStatus === ApplicationAdminStatus.DEPOSIT_DETAILS
      ? 3
      : current;


  const getDescription = (text: string, number: number) => {
    if (application.isRejected && number === current) {
      return 'Отменен';
    }

    return text;
  };

  return (
    <Steps
      labelPlacement={'vertical'}
      status={application.isRejected ? 'error' : undefined}
      current={current}
      items={[
        {
          title: 'Создан',
          description: getDescription('Новая заявка', 0),
          // subTitle: <span className={st.timeLeft}>Осталось 5 дней</span>
        },
        {
          title: 'Оплачен',
          description: getDescription('Ждет подтверждения', 1),
          // subTitle: <span className={st.timeLeft}>Осталось 5 дней</span>
        },
        {
          title: 'Цена',
          description: getDescription('Корректировка', 2),
          // subTitle: <span className={st.timeLeft}>Осталось 5 дней</span>
        },
        {
          title: 'Задаток',
          description: getDescription('Ожидает реквизиты', 3),
        },
        {
          title: 'В работе',
        },
        {
          title: 'Готов',
        },
      ]}
    />
  );
}
