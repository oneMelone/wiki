import './App.css';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import MainPage from './screens/main-page'
import MainHeader from './components/header';
import MainFooter from './components/footer';

function App() {
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
