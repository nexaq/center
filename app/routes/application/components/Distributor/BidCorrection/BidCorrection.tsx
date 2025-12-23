import type { LotModel } from '~/api/lot/types';
import React from 'react';
import formatNumber from '~/helpers/formatNumber';
import Editable from '~/routes/application/components/Review/Editable/Editable';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bidCorrections } from '~/api/application/bidCorrection';
import { unformat } from '@react-input/number-format';

export function EditStepPrice({
  application,
  defaultValue,
  startPrice,
  percentage = false,
  editable = true,
  withPercentage = false,
}: {
  defaultValue: number;
  application: ApplicationWithAdminStatus;
  startPrice: number;
  percentage?: boolean;
  editable?: boolean;
  withPercentage?: boolean;
}) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation<void, Error, { stepPrice: number }>(
    {
      mutationFn: ({ stepPrice }) => {
        return bidCorrections(application.id, stepPrice);
      },
      onError: () => {
        alert('Произошла ошибка');
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['application', application.id],
          exact: true,
        });
      },
    },
  );

  const correctionValue = percentage
    ? application.stepPriceCorrection !== null
      ? (application.stepPriceCorrection / startPrice) * 100
      : null
    : application.stepPriceCorrection;

  return (
    <Editable
      editable={editable}
      extra={
        withPercentage && !percentage
          ? `(${((correctionValue ?? defaultValue) / startPrice) * 100}%)`
          : undefined
      }
      onSubmit={async (value) => {
        return mutate({
          stepPrice: percentage ? (value / 100) * startPrice : value,
        });
      }}
      rules={[
        {
          required: true,
          message: 'Обязательное поле',
        },
        {
          message: 'Должно быть больше чем 0.5% от начальной цены',
          validator: (_, value) => {
            if (value === '') {
              return Promise.resolve();
            }
            const moreThan = (percentage ? 100 : startPrice) * 0.005;

            return Number(unformat(value)) >= moreThan
              ? Promise.resolve()
              : Promise.reject();
          },
        },
        {
          message: 'Максимум 5% от начальной цены',
          validator: (_: any, value: any) => {
            if (value === '') {
              return Promise.resolve();
            }
            const moreThan = (percentage ? 100 : startPrice) * 0.05;

            return Number(unformat(value)) <= moreThan
              ? Promise.resolve()
              : Promise.reject();
          },
        },
      ]}
      label={`Шаг аукиона ${percentage ? '(в %)' : ''}`}
      loading={isPending}
      title={'Редактировать шаг аукциона'}
      defaultValue={
        percentage ? (defaultValue / startPrice) * 100 : defaultValue
      }
      correctionValue={correctionValue}
    />
  );
}

export const WantPrice = ({
  application,
  lot,
}: {
  application: ApplicationWithAdminStatus;
  lot: LotModel;
}) => {
  if (lot.sale.type === 'PUBLIC_OFFER') {
    return formatNumber(application.userPrice as number);
  }

  const stepPrice = application.stepPriceCorrection ?? lot.stepPrice;
  const userPrice = application.userPrice as number;

  const remainder = userPrice % stepPrice;
  const stepPriceHalf = stepPrice / 2;
  const addAtEnd = remainder >= stepPriceHalf ? stepPrice : 0;
  const base = Math.floor(userPrice / stepPrice) * stepPrice;
  const result = base + addAtEnd;
  const endResult = result === 0 ? stepPrice : result;

  if (endResult === application.userPrice) {
    return formatNumber(application.userPrice);
  } else {
    return (
      <>
        <del>{formatNumber(application.userPrice as number)}</del>{' '}
        <strong style={{ marginLeft: 6 }}>{formatNumber(endResult)}</strong>
      </>
    );
  }
};
