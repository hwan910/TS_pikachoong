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
import { auth } from '../common/firebase';
import { isLogin, notLogin } from '../redux/modules/loginSlice';

const Router = () => {
  const dispatch = useAppDispatch();
  // 지도 현재 위치, 지도 확대 축소 범위
  const [myLocation, setMyLocation] = useState<Location>({
    lat: 37.49810223154336,
    lng: 127.0327612337389,
  });
  const [level, setLevel] = useState(2);
  // 커스텀훅
  const [zcode, zscode, setLocation] = useMyLocation();

  // 내 위치 정보 불러오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMyLocation({ lat, lng });
      });
    } else {
      window.alert('현재 위치정보를 불러올 수 없습니다.');
    }
  }, []);

  // 파이어베이스 로그인 확인 후 필요한 데이터 리덕스로 옮김
  const [checkLogin, setCheckLogin] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCheckLogin(true)
        dispatch(
          isLogin({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          }),
        );
      } else {
        setCheckLogin(false)
        dispatch(notLogin());
      }
    });
  }, [auth]);

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
                level={level}
                setLevel={setLevel}
              />
            }
          />
          <Route path="/:id" element={<Detailpage />} />
          <Route path="/my" element={<Mypage checkLogin={checkLogin} />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:z2" element={<SearchPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
