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

    //지도 중앙 위치
    const location = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);

    const options = {
      center: location,
      level: level,
    };

    // 지도 생성 + 설정
    const map = new kakao.maps.Map(mapRef.current, options);

    map.setMaxLevel(8);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    setMap(map);
    
    // 마커 관련

    // 현재위치마커
    const myMarker = new kakao.maps.Marker({
      map: map,
      position: location,
      clickable: true,
    });
    setMarker(myMarker);
    // 마커 이동시 이벤트
    kakao.maps.event.addListener(map, 'dragend', () => {
      const level = map.getLevel();
      const latlng = map.getCenter();
      setLevel(level);
      map.setCenter(latlng);
      myMarker.setPosition(latlng);
      setLocation({ lat: latlng.Ma, lng: latlng.La });
      setMyLocation({ lat: latlng.Ma, lng: latlng.La });
    });
    // 충전소 마커 생성
    const thunderimageSrc = require('../../assets/map/thunder.png');
    const thunderoffimageSrc = require('../../assets/map/thunderoff.png');
    const imageSize = new kakao.maps.Size(48, 48);
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
        const position = new kakao.maps.LatLng(stat.lat, stat.lng);
        // 오버레이
        const content = `<div style="background: white; border: 1px solid black;"><span>${stat.statNm}</span></div>`;
        const overlay = new kakao.maps.CustomOverlay({
          position,
          content,
          yAnchor: 3.5,
        });
        // 마커 생성 충전가능 체크해서 이미지 변경
        const marker = new kakao.maps.Marker({
          map: map,
          position,
          image: checkStatus ? thunderImage : thunderoffImage,
        });

        markers.push(marker);

        // 마커에 마우스 올리면 오버레이 생성 마우스벗어나면 사라짐
        kakao.maps.event.addListener(marker, 'mouseover', () => {
          overlay.setMap(map);
        });
        kakao.maps.event.addListener(marker, 'mouseout', () => {
          overlay.setMap(null);
        });
        // 클릭시 Detail페이지로 전환
        kakao.maps.event.addListener(marker, 'click', () =>
          navigate(`${stat.statId}`, {
            state: data?.items.item.filter(
              (item) => item.statId === stat.statId,
            ),
          }),
        );
      }
    }

    // 맵에 반경 1km를 지정해준다.
    let circle = new kakao.maps.Circle({
      map: map,
      center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
      radius: 1000,
    });

    // 맵의 내 위치, 반경, 선
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
        // 거리를 배열에 넣어줌, 마커의 경도/위도를 배열에 넣어줌
        distArr.push(dist);
        markerLocation.push(markerPosition);
      }
    });
    // 마커의 위치를 아이템에서 찾아줌 : 마커에는 데이터 값이 경도/위도 밖에 없기 때문에
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
    // 위의 아이템에 마커와 내 위치의 거리를 계산한 값을 넣어줌
    for (let i = 0; i < arrFilter.length; i++) {
      arrFilter[i].dist = distArr[i];
    }
  }, []);

  // 커스텀훅
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
