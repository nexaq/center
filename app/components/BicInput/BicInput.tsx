import React from 'react';
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

const BicInput = ({ onSelect }: { onSelect?: (data: SuggestBankItem) => void }) => {
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
      onSearch={handleSearch}
      onSelect={(_, option) => {
        onSelect?.(option.extra)
      }}
      options={options}
    />
  );
};

export default BicInput;
