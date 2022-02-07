import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";

const { Header } = Layout;

function MainHeader() {
  return (
    <Header className="header">
      <div className="logo" />
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
        <Link to="about">关于我们</Link>
      </Menu.Item>
      </Menu>
    </Header>
  )
}

export default MainHeader;