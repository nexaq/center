import st from './DepositDetails.module.scss';
import {Button, Card, Form, Input} from "antd";
import BicInput from "~/components/BicInput/BicInput";

const DepositDetails = ({}: {}) => {
  const [form] = Form.useForm();

  return <Card className={st.main}>
    <Form
      layout={'vertical'}
      form={form}
    >
      <Form.Item name={'account'} label="Номер счета" rules={[{ required: true, min: 20, max: 20, pattern: /[0-9]{20}/, message: 'Должно быть 20 цифр' }]}>
        <Input maxLength={20} />
      </Form.Item>
      <Form.Item name={'bic'} label="БИК банка">
        <BicInput onSelect={(item) => {
          form.setFieldValue('bankName', item.name);
          form.setFieldValue('corrAccount', item.correspondentAccount);
        }} />
      </Form.Item>
      <Form.Item name={'bankName'} label="Название банка">
        <Input  />
      </Form.Item>
      <Form.Item name={'corrAccount'} label="Корр. счет">
        <Input  />
      </Form.Item>
      <Form.Item name={'description'} label="Назначение платежа">
        <Input.TextArea maxLength={210} showCount />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Продолжить</Button>
      </Form.Item>
    </Form>
  </Card>
}

export default DepositDetails;