import { Button, Col, Layout, Menu, Row, Modal, Form, Input, message } from 'antd';
import { Link } from "react-router-dom";
import React, { useEffect } from 'react';
import axios from 'axios';
import { hexMd5, KEY } from '../util/md5';

const { Header } = Layout;

function MainHeader() {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [user, setUser] = React.useState(undefined);

  useEffect(() => {
    console.log("user = ", user);
  }, [user]);

  let form;
  const setForm = (data) => {
    form = data;
  }
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    let md5Password = hexMd5(form.getFieldsValue().password + KEY);
    axios.post("/user/login", {
      ...form.getFieldsValue(),
      password: md5Password,
    }).then(
      (response) => {
        const data = response.data;
        if (data.success) {
          setVisible(false);
          setConfirmLoading(false);
          setUser(data.content);
          console.log("user Setted");
        } else {
          message.error(data.message);
          setConfirmLoading(false);
        }
      }
    )
  }

  return (
    <Header className="header">
      <Row>
      <Col span={3}>
      <div className="logo" />
      </Col>
      <Col span={17}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/admin/ebook">电子书管理</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/admin/category">分类管理</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/admin/user">用户管理</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="about">关于我们</Link>
      </Menu.Item>
      </Menu>
      </Col>
      <Col span={4}>
      <LoginButtonOrWelcomInfo />
      </Col>
      </Row>
      <Modal
        title="登陆"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <LoginForm setForm={setForm} />
      </Modal>
    </Header>
  )
  
  function LoginButtonOrWelcomInfo() {
    if (user === undefined) {
      return <Button onClick={showModal}>登陆</Button>
    } else {
      return <div className="welcome-info">您好，{user.name}</div>
    }
  }
}
function LoginForm(props) {
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
      name="login-form"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="登录名"
        name="loginName"
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
}
export default MainHeader;