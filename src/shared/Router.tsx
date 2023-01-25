/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Detailpage } from '../pages/DetailPage/DetailPage';
import { MainPage } from '../pages/MainPage/MainPage';
import { Mypage } from '../pages/MyPage/Mypage';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import Layout from './Layout/Layout';
import { useEffect, useState } from 'react';
import useMyLocation from '../hooks/useMyLocation';
import { useAppDispatch } from '../hooks/useRedux';
import { addMyLocation } from '../redux/modules/locationSlice';
import { Location } from '../types/MapInterface';

const Router = () => {
  const dispatch = useAppDispatch();
  const [myLocation, setMyLocation] = useState<Location>({
    lat: 37.49810223154336,
    lng: 127.0327612337389,
  });

  const [zcode, zscode, setLocation] = useMyLocation();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMyLocation({ lat, lng });
      });
    } else {
      window.alert('위치정보를 불러올 수 없습니다.');
    }
  }, []);

  useEffect(() => {
    setLocation(myLocation);
  }, [myLocation]);

  useEffect(() => {
    dispatch(addMyLocation({ zcode, zscode }));
  }, [setLocation]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                myLocation={myLocation}
                setMyLocation={setMyLocation}
                setLocation={setLocation}
              />
            }
          />
          <Route path="/:id" element={<Detailpage />} />
          <Route path="/my" element={<Mypage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
