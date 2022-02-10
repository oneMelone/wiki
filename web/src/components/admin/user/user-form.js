import { Form, Input, Cascader } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Tool } from '../../../util/tool';

function UserForm(props) {
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
        <Input />
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
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default UserForm;