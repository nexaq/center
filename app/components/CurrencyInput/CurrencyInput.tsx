import React from 'react';
import { InputNumberFormat } from '@react-input/number-format';

const CurrencyInput = ({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean,
}) => {
  return (
    <InputNumberFormat
      disabled={disabled}
      value={value}
      onChange={onChange}
      locales="ru"
      maximumFractionDigits={2}
      className={
        'ant-input css-dev-only-do-not-override-1odpy5d css-1odpy5d ant-input-outlined'
      }
    />
  );
};

export default CurrencyInput;