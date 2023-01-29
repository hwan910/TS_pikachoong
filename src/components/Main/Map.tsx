/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import { Item, MapProps, MarkerLocation } from '../../types/MapInterface';
import { useNavigate } from 'react-router-dom';
import Main from './Main';
import {
  Container,
  HeaderForm,
  HeaderInput,
  HeaderTitle,
  HeaderWrap,
  MapWrap,
} from '../../pages/MainPage/style';
import useSearchMap from '../../hooks/useSearchMap';
import { IoSearchCircle } from 'react-icons/io5';
import { SearchBtn } from '../../shared/Layout/Header/style';

const { kakao } = window;

const Map = ({
  data,
  level,
  myLocation,
  setLevel,
  setLocation,
  setMyLocation,
}: MapProps) => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState<any>('');
  const [marker, setMarker] = useState<any>('');

  let markers: any[] = [];
  let arrFilter: Item[] = [];
  let markerLocation: MarkerLocation[] = [];

  useEffect(() => {
    const uniqueStats = data?.items.item.filter(
      (stat: Item, idx: number, allStats: Item[]) => {
        return (
          allStats.findIndex((item) => item.statId === stat.statId) === idx
        );
      },
    );

    const location = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);

    const options = {
      center: location,
      level: level,
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    map.setMaxLevel(8);
    setMap(map);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    const thunderimageSrc = require('../../assets/map/thunder.png');
    const thunderoffimageSrc = require('../../assets/map/thunderoff.png');
    const imageSize = new kakao.maps.Size(48, 48);
    const myMarker = new kakao.maps.Marker({
      map: map,
      position: location,
      clickable: true,
    });

    setMarker(myMarker);
    kakao.maps.event.addListener(map, 'dragend', () => {
      const level = map.getLevel();
      const latlng = map.getCenter();
      setLevel(level);
      map.setCenter(latlng);
      myMarker.setPosition(latlng);
      setLocation({ lat: latlng.Ma, lng: latlng.La });
      setMyLocation({ lat: latlng.Ma, lng: latlng.La });
    });

    const thunderImage = new kakao.maps.MarkerImage(thunderimageSrc, imageSize);
    const thunderoffImage = new kakao.maps.MarkerImage(
      thunderoffimageSrc,
      imageSize,
    );
    if (typeof uniqueStats === 'object') {
      for (const stat of uniqueStats) {
        const checkStatus = !!data?.items.item.filter(
          (item) => item.statId === stat.statId && item.stat === '2',
        ).length;
        const content = `<div style="background: white; border: 1px solid black;"><span>${stat.statNm}</span></div>`;
        const position = new kakao.maps.LatLng(stat.lat, stat.lng);
        const overlay = new kakao.maps.CustomOverlay({
          position,
          content,
          yAnchor: 3.5,
        });
        const marker = new kakao.maps.Marker({
          map: map,
          position,
          image: checkStatus ? thunderImage : thunderoffImage,
        });

        markers.push(marker);

        kakao.maps.event.addListener(marker, 'mouseover', () => {
          overlay.setMap(map);
        });
        kakao.maps.event.addListener(marker, 'mouseout', () => {
          overlay.setMap(null);
        });
        kakao.maps.event.addListener(marker, 'click', () =>
          navigate(`${stat.statId}`, {
            state: data?.items.item.filter(
              (item) => item.statId === stat.statId,
            ),
          }),
        );
      }
    }

    let circle = new kakao.maps.Circle({
      map: map,
      center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
      radius: 1000,
      strokeWeight: 2,
      strokeOpacity: 0,
      strokeStyle: 'dashed',
      fillOpacity: 0,
    });

    let center = circle.getPosition();
    let radius = circle.getRadius();
    let line = new kakao.maps.Polyline();

    let distArr: number[] = [];

    markers?.forEach(function (marker) {
      // 마커의 위치와 원의 중심을 경로로 하는 폴리라인 설정

      let markerPosition = marker.getPosition();
      let path = [markerPosition, center];

      line.setPath(path);

      // 마커와 원의 중심 사이의 거리
      let dist = line.getLength();

      // 이 거리가 원의 반지름보다 작거나 같다면
      if (dist <= radius) {
        distArr.push(dist);
        markerLocation.push(markerPosition);
      }
    });
    for (const markerLocate of markerLocation) {
      let coords = new kakao.maps.Coords(markerLocate.La, markerLocate.Ma);
      let La = coords.La.toFixed(10);
      let Ma = coords.Ma.toFixed(10);

      const filters = uniqueStats?.find(
        (item: Item) =>
          Number(item.lat).toFixed(10) === Ma &&
          Number(item.lng).toFixed(10) === La,
      );
      if (filters !== undefined) {
        arrFilter.push(filters);
      }
    }
    for (let i = 0; i < arrFilter.length; i++) {
      arrFilter[i].dist = distArr[i];
    }
  }, []);

  const [searchByAddress, onChangeSearch, onSubmit] = useSearchMap({
    map,
    marker,
    setLocation,
    setMyLocation,
  });

  return (
    <Container>
      <HeaderWrap>
        <HeaderTitle>인근 충전소</HeaderTitle>
        <HeaderForm onSubmit={onSubmit}>
          <HeaderInput
            type="text"
            onChange={(e) => onChangeSearch(e)}
            value={searchByAddress}
            placeholder="지도에서 주소 검색"
          />
          <SearchBtn>
            <IoSearchCircle color="red" size={'2.6em'} />
          </SearchBtn>
        </HeaderForm>
      </HeaderWrap>
      <MapWrap ref={mapRef} />
      <Main filterData={arrFilter} />
    </Container>
  );
};

export default Map;
