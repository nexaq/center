import { Flex, Modal, Radio } from 'antd';
import formatNumber from '~/helpers/formatNumber';
import { useState } from 'react';

const StepPriceErrorModal = ({
  min,
  max,
  wrongPriceOpen,
  setWrongPriceOpen,
  realMutate,
  isPending,
}: {
  min: number;
  max: number;
  wrongPriceOpen: boolean;
  setWrongPriceOpen: (v: boolean) => void;
  realMutate: ({ replacePrice }: { replacePrice?: number }) => void;
  isPending: boolean;
}) => {
  const [value, setValue] = useState<number | undefined>();

  return (
    <Modal
      width={400}
      destroyOnHidden={true}
      title="Исправьте цену"
      open={wrongPriceOpen}
      onOk={() => {
        if (!value) {
          Modal.error({
            title: 'Выберите сумму',
            content: "Сумма не вырбана"
          });
          return;
        }

        realMutate({
          replacePrice: value,
        });
      }}
      onCancel={() => setWrongPriceOpen(false)}
      loading={isPending}
    >
      <Flex vertical={true} gap={10}>
        <Flex gap={6} vertical={true}>
          <div>Ваша цена не соответствует шагу аукциона</div>
          <div>Выберите один из вариантов:</div>
        </Flex>
        <Radio.Group
          value={value}
          onChange={(e) => setValue(e.target.value)}
          options={[
            {
              value: min,
              label: formatNumber(min),
              style: { display: 'block', fontWeight: 500 },
            },
            {
              value: max,
              label: formatNumber(max),
              style: { display: 'block', fontWeight: 500 },
            },
          ]}
        />
      </Flex>
    </Modal>
  );
};

export default StepPriceErrorModal;
