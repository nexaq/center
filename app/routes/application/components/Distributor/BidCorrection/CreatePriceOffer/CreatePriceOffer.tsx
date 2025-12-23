import st from './CreatePriceOffer.module.scss';
import { Card, Flex, Form, type FormInstance, Input, Radio } from 'antd';
import React from 'react';
import type { ApplicationWithAdminStatus } from '~/api/application/types';
import PrincipalAccepting from '~/routes/application/components/Distributor/BidCorrection/CreatePriceOffer/PrincipalAccepting/PrincipalAccepting';
import PrincipalRejecting from '~/routes/application/components/Distributor/BidCorrection/CreatePriceOffer/PrincipalRejecting/PrincipalRejecting';
import type { LotModel } from '~/api/lot/types';
import { canCreateRecommendation } from '~/routes/application/helpers/canCreateRecommendation';
import type { PostDepositDetailsBodyForm } from '~/routes/application/components/Distributor/DepositDetails/types';

const CreatePriceOfferForm = () => {
  return (
    <Flex gap={8} justify={'stretch'} vertical={true}>
      <Flex gap={8}>
        <PrincipalAccepting />
        <PrincipalRejecting />
      </Flex>
      <Card title={'Комментарий'} style={{ width: '100%' }}>
        <Form.Item
          name={'comment'}
          rules={[
            {
              min: 5,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Card>
    </Flex>
  );
};

const CreatePriceOffer = ({
  application,
  lot,
  form,
}: {
  application: ApplicationWithAdminStatus;
  lot: LotModel;
  form: FormInstance<PostDepositDetailsBodyForm>;
}) => {
  const shouldCreate = Form.useWatch('createRecommendation', form);

  return (
    <div className={st.main}>
      <Flex vertical={true}>
        <div>
          <Form.Item
            name={'createRecommendation'}
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
            ]}
          >
            <Radio.Group
              disabled={!canCreateRecommendation(lot)}
              options={[
                {
                  label: 'Создать',
                  value: true,
                },
                {
                  label: 'Не создавать',
                  value: false,
                },
              ]}
            />
          </Form.Item>
        </div>
        {shouldCreate === false && (
          <Flex justify={'start'}>
            <PrincipalRejecting />
          </Flex>
        )}
        {shouldCreate && <CreatePriceOfferForm />}
      </Flex>
    </div>
  );
};

export default CreatePriceOffer;
