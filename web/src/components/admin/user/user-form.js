import { Form, Input } from 'antd';

function UserForm(props) {
  const [form] = Form.useForm();
  
  props.setForm(form);
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  let editLoginNameDisabled = true;
  if (props.loginName == undefined) {
    editLoginNameDisabled = false;
  }

  return (
    <Form
      name="user-form"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        loginName: props.loginName,
        name: props.name,
        password: props.password,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="登陆名称"
        name="loginName"
      >
        <Input disabled={editLoginNameDisabled}/>
      </Form.Item>

      <Form.Item
        label="昵称"
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        hidden={editLoginNameDisabled}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default UserForm;