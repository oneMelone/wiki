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

function App() {
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
