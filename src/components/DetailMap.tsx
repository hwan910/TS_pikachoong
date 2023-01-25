/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { Location } from '../types/MapInterface';

const { kakao } = window;

interface Props {
  location: Location
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
  }, []);
  
  return <div ref={mapRef} style={{ width: 1200, height: 800 }} />;
};

export default DetailMap;
