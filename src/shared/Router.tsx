import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Detailpage } from '../pages/DetailPage/DetailPage';
import { MainPage } from '../pages/MainPage/MainPage';
import { Mypage } from '../pages/MyPage/Mypage';
import Layout from './Layout/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<Detailpage />} />
          <Route path="/my" element={<Mypage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
