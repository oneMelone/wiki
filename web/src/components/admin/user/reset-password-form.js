import { Form, Input } from 'antd';

function ResetPasswordForm(props) {
  const [form] = Form.useForm();
  
  props.setForm(form);
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="user-form"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      
      <Form.Item
        label="密码"
        name="password"
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;