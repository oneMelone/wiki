import './App.css';
import "antd/dist/antd.css";
import {
  Routes,
  Route
} from "react-router-dom";
import { Layout } from 'antd';
import MainPage from './screens/main-page'
import MainHeader from './components/header';
import MainFooter from './components/footer';
import AdminEbook from './screens/admin/admin-ebook';

function App() {
  return (
    <div className="App">
      <Layout>
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin/ebook" element={<AdminEbook />} />
        </Routes>
        <MainFooter />
      </Layout> 
    </div>
  );
}

export default App;
