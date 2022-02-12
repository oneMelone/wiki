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
