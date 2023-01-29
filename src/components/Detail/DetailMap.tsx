/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { Location } from '../../types/MapInterface';
import * as S from '../../pages/DetailPage/style';

const { kakao } = window;

interface Props {
  location: Location;
}

const DetailMap = ({ location }: Props) => {
  const mapRef = useRef(null);
  const detailLocation = new kakao.maps.LatLng(location.lat, location.lng);

  useEffect(() => {
    const options = {
      center: detailLocation,
      level: 2,
    };

    const map = new kakao.maps.Map(mapRef.current, options);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    new kakao.maps.Marker({
      map: map,
      position: detailLocation,
    });

    // setTimeout(function () {
    // map.relayout();
    // }, 0);
    // 지도 반응형 리사이징
  }, []);

  return <S.DetailMapStyle ref={mapRef} />;
};

export default DetailMap;
