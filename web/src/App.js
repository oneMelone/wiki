import './App.css';
import "antd/dist/antd.css";
import { Layout, Menu } from 'antd';
import MainPage from './screens/main-page'

const { Header, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <MainPage />
        <Footer style={{ textAlign: 'center' }}>Wiki by OneMelon</Footer>
      </Layout> 
    </div>
  );
}

export default App;
