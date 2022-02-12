import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import user_store from './redux-store/user-redux-store';
import { Tool } from './util/tool';


axios.defaults.baseURL = process.env.REACT_APP_SERVER;

/**
 * axios拦截器
 */
axios.interceptors.request.use(function (config) {
 console.log('请求参数：', config);
  const user = user_store.getState();
  if (Tool.isNotEmpty(user)) {
    const token = user.token;
    config.headers.token = token;
    console.log("请求headers增加token:", token);
  }
 return config;
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  console.log('返回结果：', response);
  return response;
}, error => {
  console.log('返回错误：', error);
  const response = error.response;
  const status = response.status;
  if (status === 401) {
    // 判断状态码是401 跳转到首页或登录页
    console.log("未登录，跳到首页");
    // store.commit("setUser", {});
    console.error("未登录或登录超时");
    // router.push('/');
  }
  return Promise.reject(error);
});

// websocket
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

if ("WebSocket" in window) {
  token = Tool.uuid(10);
  console.log("token-", token);
  websocket = new WebSocket(process.env.REACT_APP_WS_SERVER + "/ws/" + token);
  initWebSocket();
} else {
  alert("当前浏览器不支持websocket");
}

// render
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
