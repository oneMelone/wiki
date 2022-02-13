import { Button, Col, Layout, Menu, Row, Modal, Form, Input, message } from 'antd';
import { Link } from "react-router-dom";
import React, { useEffect } from 'react';
import axios from 'axios';
import { hexMd5, KEY } from '../util/md5';
import user_store from '../redux-store/user-redux-store';

const { Header } = Layout;

function MainHeader() {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [user, setUser] = React.useState(user_store.getState());

  user_store.subscribe(() => {
    setUser(user_store.getState());
  })

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
          user_store.dispatch({
            type: "USER_LOGIN",
            user: data.content,
          })
          window.location.reload();
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
      <div className="logo">
        Wiki
      </div>
      </Col>
      <Col span={16}>
      <TopBar />
      </Col>
      <Col span={5}>
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

  function TopBar() {
    if (user_store.getState() === undefined) {
    return (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="about">关于我们</Link>
        </Menu.Item>
      </Menu>
    )
    } else {
      return (
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
      )
    }
  }

  // LoginButtonOrWelcomeInfo
  
  function LoginButtonOrWelcomInfo() {
    if (user === undefined) {
      return <Button className='login-button' shape="round" onClick={showModal}>登陆</Button>
    } else {
      return (
        <div className="login-info-and-logout-button">
        <div className="welcome-info">您好，{user.name}</div>
        <LogOutButton />
        </div>
      )
    }
  }
}

function LogOutButton() {
  let logout = () => {
    axios.get("/user/logout/" + user_store.getState().token).then(
      response => {
        if (response.data.success) {
          message.success("登出成功");
        } else {
          message.error(response.data.message);
        }
      }
    )
    user_store.dispatch({
      type: "USER_LOGOUT"
    })
  }

  return (
    <Button shape="round" onClick={logout}>登出</Button>
  )
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