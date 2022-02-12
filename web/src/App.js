import './App.css';
import "antd/dist/antd.css";
import {
  Routes,
  Route
} from "react-router-dom";
import { Layout } from 'antd';
import MainPage from './screens/main-page/main-page'
import MainHeader from './components/header';
import MainFooter from './components/footer';
import AdminEbook from './screens/admin/admin-ebook';
import AdminCategory from './screens/admin/admin-category';
import AdminDoc from './screens/admin/admin-doc';
import DocPage from './screens/doc-page/doc-page';
import AdminUser from './screens/admin/admin-user';
import { useEffect } from 'react';
import { Tool } from './util/tool';

function App() {
  let websocket;
  let token;

  const onOpen = () => {
    console.log("WebSocket连接成功，状态码：", websocket.readyState);
  };

  const onMessage = (event) => {
    console.log("WebSocket收到消息：", event.data);
  };

  const onError = () => {
    console.log("WebSocket连接错误，状态码：", websocket.readyState);
  };

  const onClose = () => {
    console.log("WebSocket连接关闭，状态码：", websocket.readyState);
  };

  const initWebSocket = () => {
    websocket.onOpen = onOpen;
    websocket.onMessage = onMessage;
    websocket.onError = onError;
    websocket.onClose = onClose;
  }

  useEffect(() => {
    if ("WebSocket" in window) {
      token = Tool.uuid(10);
      websocket = new WebSocket(process.env.REACT_APP_WS_SERVER + "/ws/" + token);
      initWebSocket();
    } else {
      alert("当前浏览器不支持websocket");
    }
  }, [])
  return (
    <div className="App">
      <Layout>
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin/ebook" element={<AdminEbook />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/doc" element={<AdminDoc />} />
          <Route path="/doc" element={<DocPage />} />
          <Route path="/admin/user" element={<AdminUser />} />
        </Routes>
        <MainFooter />
      </Layout> 
    </div>
  );
}

export default App;
