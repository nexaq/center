import React, {memo} from 'react';
import {type AutoCompleteProps, Flex} from 'antd';
import { AutoComplete } from 'antd';
import {suggestBank, type SuggestBankItem} from "~/api/dadata/suggestBank";

const renderItem = (item: SuggestBankItem) => ({
  value: item.bic,
  extra: item,
  label: (
    <Flex align="start"  vertical>
      {item.name}
      <span>
        {item.bic}
      </span>
    </Flex>
  ),
});

const BicInput = memo(({ onSelect, setValue, value }: { onSelect?: (data: SuggestBankItem) => void, setValue: (v: string) => void, value?: string }) => {
  const [options, setOptions] = React.useState<AutoCompleteProps['options']>(
    [],
  );

  const handleSearch = (value: string) => {
    suggestBank(value).then((i) => {
      setOptions(i.map(i => renderItem(i)))
    }).catch(() => setOptions([]))

  };
  return (
    <AutoComplete
      value={value}
      style={{
        width: "100%"
      }}
      onChange={(e) => {
        setValue(e);
      }}
      maxLength={9}
      onSearch={handleSearch}
      onSelect={(_, option) => {
        onSelect?.(option.extra)
      }}
      options={options}
    />
  );
});

export default BicInput;
