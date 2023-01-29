/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import { Item, MapProps, MarkerLocation } from '../../types/MapInterface';
import { useNavigate } from 'react-router-dom';
import Main from './Main';
import { Container } from '../../pages/MainPage/style';
import useSearchMap from '../../hooks/useSearchMap';
import styled from 'styled-components';
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

  const uniqueStats = data?.items.item.filter(
    (stat: Item, idx: number, allStats: Item[]) => {
      return allStats.findIndex((item) => item.statId === stat.statId) === idx;
    },
  );

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
      {/* <button>주소로 검색하기^_^</button>
      <form onSubmit={onSubmit}>
        <button>확인</button>
      </form> */}
      <Main filterData={arrFilter} />
    </Container>
  );
};

export default Map;

const MapWrap = styled.div`
  width: 1300px;
  height: 500px;
  @media screen and (max-width: 1200px) {
    width: 1000px;
    height: 300px;
  }
  @media screen and (max-width: 1000px) {
    width: 800px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 400px) {
    width: 380px;
  }
`;

const HeaderWrap = styled.div`
  width: 1300px;
  height: 50px;
  border-bottom: 1px solid #fad61d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  @media screen and (max-width: 1200px) {
    width: 1000px;
  }
  @media screen and (max-width: 1000px) {
    width: 800px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 400px) {
    width: 360px;
  }
`;

const HeaderTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
  @media screen and (max-width: 1200px) {
    font-size: 25px;
  }
  @media screen and (max-width: 1000px) {
    font-size: 22px;
  }
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
  @media screen and (max-width: 400px) {
    font-size: 18px;
  }
`;

const HeaderForm = styled.form`
  display: flex;
`;

const HeaderInput = styled.input`
  padding: 15px;
  width: 300px;
  height: 1px;
  background: rgba(250, 214, 29, 0.2);
  border-radius: 24px;
  border: none;
  ::placeholder {
    opacity: 0.5;
  }
  @media screen and (max-width: 1200px) {
    width: 200px;
  }
  @media screen and (max-width: 1000px) {
    width: 150px;
  }
  @media screen and (max-width: 600px) {
    width: 100px;
  }
`;
