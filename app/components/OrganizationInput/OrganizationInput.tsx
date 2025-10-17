import React from 'react';
import { AutoComplete, type AutoCompleteProps, Flex } from 'antd';
import {
  suggestOrganization,
  type SuggestOrganizationItem,
} from '~/api/dadata/suggestOrganization';

const renderItem = (item: SuggestOrganizationItem) => ({
  value: item.inn,
  extra: item,
  label: (
    <Flex align="start" vertical>
      {item.name}
      <span>{item.inn}</span>
    </Flex>
  ),
});

const OrganizationInput = ({
  onSelect,
  setValue,
}: {
  onSelect?: (data: SuggestOrganizationItem) => void;
  setValue: (v: string) => void;
}) => {
  const [options, setOptions] = React.useState<AutoCompleteProps['options']>(
    [],
  );

  const handleSearch = (value: string) => {
    suggestOrganization(value)
      .then((i) => {
        setOptions(i.map((i) => renderItem(i)));
      })
      .catch(() => setOptions([]));
  };
  return (
    <AutoComplete
      style={{
        width: '100%',
      }}
      onChange={(e) => {
        setValue(e);
      }}
      maxLength={9}
      onSearch={handleSearch}
      onSelect={(_, option) => {
        onSelect?.(option.extra);
      }}
      options={options}
    />
  );
};

export default OrganizationInput;
