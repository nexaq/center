import { memo } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { type LotModel, LotSaleStatus } from '~/api/lot/types';
import { Flex, Tag, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { ApplicationStatus } from '~/api/application/getList';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import st from './ApplicationLeftBefore.module.scss';

const TimeLeft = memo(
  ({ endAt, showLeftText }: { endAt: Dayjs; showLeftText: boolean }) => {
    const now = dayjs();

    const diff = endAt.diff(now);
    const diffDays = diff / 1000 / 60 / 60 / 24;
    const diffHours = diff / 1000 / 60 / 60;
    const diffMinutes = diff / 1000 / 60;

    const warm = diff < 5 * 24 * 60 * 60 * 1000;
    const hot = diff < 3 * 24 * 60 * 60 * 1000;
    const label = (text: string) => (
      <Flex gap={8}>
        <div>Осталось:</div>
        <Typography.Text
          type={hot ? 'danger' : warm ? 'warning' : undefined}
          strong
        >
          {text}
        </Typography.Text>
      </Flex>
    );

    if (diffDays < 0) {
      return (
        <Typography.Text type={'secondary'}>
          Прием заявок завершен
        </Typography.Text>
      );
    }

    if (diffDays >= 1) {
      return label(`${Math.floor(diffDays)} д`);
    }

    if (diffDays < 1 && diffHours < 1 && diffMinutes < 1) {
      return label(`< 1 мин`);
    }

    if (diffDays < 1 && diffHours < 1) {
      return label(`${Math.floor(diffMinutes)} мин`);
    }

    if (diffDays < 1) {
      return label(`${Math.floor(diff / 1000 / 60 / 60)} ч`);
    }

    return null;
  },
);

const TimeLeft2 = memo(({ endAt }: { endAt: Dayjs }) => {
  const now = dayjs();

  const diff = endAt.diff(now);
  const diffDays = diff / 1000 / 60 / 60 / 24;
  const diffHours = diff / 1000 / 60 / 60;
  const diffMinutes = diff / 1000 / 60;

  const label = (text: string) => (
    <Flex vertical={true} align={'flex-start'} gap={2}>
      <Typography.Text strong type={'danger'}>
        Успей проверить
      </Typography.Text>
      <Tag color={'red-inverse'} icon={<ClockCircleOutlined />}>
        {text}
      </Tag>
    </Flex>
  );

  if (diffDays < 0) {
    return <Tag color={'red-inverse'}>Время вышло</Tag>;
  }

  if (diffDays >= 1) {
    return label(`${Math.floor(diffDays)} д`);
  }

  if (diffDays < 1 && diffHours < 1 && diffMinutes < 1) {
    return label(`< 1 мин`);
  }

  if (diffDays < 1 && diffHours < 1) {
    return label(`${Math.floor(diffMinutes)} мин`);
  }

  if (diffDays < 1) {
    return label(`${Math.floor(diff / 1000 / 60 / 60)} ч`);
  }

  return null;
});

export const ApplicationLeftBefore = ({
  endAt,
  lotStatus,
  status,
  paidAt,
  showLeftText = false,
}: {
  endAt: string;
  lotStatus: LotSaleStatus;
  status: ApplicationStatus;
  paidAt: string | null;
  showLeftText?: boolean;
}) => {
  if (lotStatus === LotSaleStatus.SALE_CANCELED) {
    return (
      <div>
        <Tag color={'red'} icon={<ClockCircleOutlined />}>
          Торги отменены
        </Tag>
      </div>
    );
  }

  if (lotStatus === LotSaleStatus.SALE_COMPLETED) {
    return (
      <div>
        <Tag color={'volcano'} icon={<ClockCircleOutlined />}>
          Торги заверешены
        </Tag>
      </div>
    );
  }

  if (status === ApplicationStatus.MODERATION && paidAt) {
    return (
      <div>
        <TimeLeft2 endAt={dayjs(paidAt)} />
      </div>
    );
  }

  return (
    <div>
      <TimeLeft endAt={dayjs(endAt)} showLeftText={showLeftText} />
    </div>
  );
};

export const ApplicationLeftBeforeWr = ({
  application,
  lot,
}: {
  application: ApplicationWithAdminStatus;
  lot: LotModel;
}) => {
  return (
    <Flex>
      <div className={st.brwer}>
        <ApplicationLeftBefore
          endAt={lot.sale.acceptingApplicationsEndAt}
          lotStatus={lot.status}
          status={application.status}
          paidAt={application.paidAt}
        />
      </div>
    </Flex>
  );
};
