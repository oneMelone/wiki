import './App.css';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import MainPage from './screens/main-page'
import MainHeader from './components/header';
import MainFooter from './components/footer';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    console.log("setup")
    axios.get("http://127.0.0.1:8000/ebook/list?name=Spring").then(
      (response) => {
        console.log(response);
      }
    )
  }, [])
  return (
    <div className="App">
      <Layout>
        <MainHeader />
        <MainPage />
        <MainFooter />
      </Layout> 
    </div>
  );
}

export default App;
