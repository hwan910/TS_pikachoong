/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import {
  Data,
  GeoResult,
  Item,
  Location,
  MarkerLocation,
} from '../types/MapInterface';
import { useNavigate } from 'react-router-dom';
import { COLOR } from '../common/color';
import Main from './Main';
import styled from 'styled-components';

const { kakao } = window;

interface Props {
  data: Data | undefined;
  myLocation: Location;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  setLocation: (location: Location) => void;
  setMyLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number | string;
      lng: number | string;
    }>
  >;
  refetch: any;
}

interface Markers {
  u: {
    $a: number;
    Ba: number;
    Gb: string;
    Ha: number;
    Hb: boolean;
    K: undefined;
    Na: boolean;
    Nh: number;
    Qi: number;
    Rc: { x: number; y: number };
    Ri: number;
    T: {
      Ij: { x: number; y: number };
      Jj: { width: number; height: number };
      Qd: { x: number; y: number };
      Yj: string;
      de: string;
      lf: { width: number; height: number };
      n: string;
      Za: boolean;
      a: any;
      ca: any;
      o: { mouseover: any[]; mouseout: any[]; click: any[] };
      vj: number;
    };
  };
}

const Map = ({
  data,
  level,
  myLocation,
  setLevel,
  setLocation,
  setMyLocation,
  refetch,
}: Props) => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState<any>('');

  const [marker, setMarker] = useState<any>('');

  let markers: any[] = [];
  let arrFilter: Item[] = [];
  let markerLocation: MarkerLocation[] = [];

  const arrUnique = data?.items.item.filter(
    (stat: Item, idx: number, arr: Item[]) => {
      return arr.findIndex((item: Item) => item.statId === stat.statId) === idx;
    },
  );

  useEffect(() => {
    // const arrUnique = data?.items.item.filter(
    //   (stat: Item, idx: number, arr: Item[]) => {
    //     return (
    //       arr.findIndex((item: Item) => item.statId === stat.statId) === idx
    //     );
    //   },
    // );
    const location = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);

    const options = {
      center: location,
      level: level,
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    setMap(map);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    const thunderimageSrc = require('../assets/thunder.png');
    const thunderoffimageSrc = require('../assets/thunderoff.png');
    const imageSize = new kakao.maps.Size(48, 48);
    const myMarker = new kakao.maps.Marker({
      map: map,
      position: location,
      clickable: true,
    });

    setMarker(myMarker);
    kakao.maps.event.addListener(map, 'dragend', function () {
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
    if (typeof arrUnique === 'object') {
      for (const x of arrUnique) {
        const checkStatus = !!data?.items.item.filter(
          (a: Item) => a.statId === x.statId && a.stat === '2',
        ).length;
        const content = `<div style="background: white; border: 1px solid black;"><span>${x.statNm}</span></div>`;
        const position = new kakao.maps.LatLng(x.lat, x.lng);
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
          navigate(`${x.statId}`, {
            state: data?.items.item.filter((y) => y.statId === x.statId),
          }),
        );
      }
    }

    // let circle = new kakao.maps.Circle({
    //   map: map,
    //   center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
    //   radius: 1000,
    //   strokeWeight: 2,
    //   strokeOpacity: 0,
    //   strokeStyle: 'dashed',
    //   fillOpacity: 0,
    // });

    // let center = circle.getPosition();
    // let radius = circle.getRadius();
    // let line = new kakao.maps.Polyline();

    // let markerLocation: any[] = [];
    // markers?.forEach(function (marker) {
    //   // 마커의 위치와 원의 중심을 경로로 하는 폴리라인 설정
    //   let markerPosition = marker.getPosition();
    //   let path = [markerPosition, center];
    //   line.setPath(path);

    //   // 마커와 원의 중심 사이의 거리
    //   let dist = line.getLength();

    //   // 이 거리가 원의 반지름보다 작거나 같다면
    //   if (dist <= radius) {
    //     markerLocation.push(markerPosition);
    //   }
    // });

    // for (const markerLocate of markerLocation) {
    //   var coords = new kakao.maps.Coords(markerLocate.La, markerLocate.Ma);
    //   let La = coords.La.toFixed(10);
    //   let Ma = coords.Ma.toFixed(10);

    //   const filters = arrUnique?.find(
    //     (item: Item) =>
    //       Number(item.lat).toFixed(10) === Ma &&
    //       Number(item.lng).toFixed(10) === La,
    //   );
    //   if (filters !== undefined) {
    //     arrFilter.push(filters);
    //   }
    // }
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

    markers?.forEach(function (marker) {
      // 마커의 위치와 원의 중심을 경로로 하는 폴리라인 설정

      let markerPosition = marker.getPosition();
      let path = [markerPosition, center];

      line.setPath(path);

      // 마커와 원의 중심 사이의 거리
      let dist = line.getLength();

      // 이 거리가 원의 반지름보다 작거나 같다면
      if (dist <= radius) {
        markerPosition.dist = dist;
        markerLocation.push(markerPosition);
      }
    });
    console.log(markerLocation);
    for (const markerLocate of markerLocation) {
      let coords = new kakao.maps.Coords(markerLocate.La, markerLocate.Ma);
      let La = coords.La.toFixed(10);
      let Ma = coords.Ma.toFixed(10);

      const filters = arrUnique?.find(
        (item: Item) =>
          Number(item.lat).toFixed(10) === Ma &&
          Number(item.lng).toFixed(10) === La,
      );
      if (filters !== undefined) {
        arrFilter.push(filters);
      }
    }
  }, []);

  const [text, setText] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(text, (result: GeoResult[], status: string) => {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        marker.setPosition(coords);
        setLocation({ lat: result[0].y, lng: result[0].x });
        setMyLocation({ lat: result[0].y, lng: result[0].x });

        map.setCenter(coords);
        setText('');
      }
    });
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={(e) => onChange(e)} value={text} />
        <button>확인</button>
      </form>
      <div
        ref={mapRef}
        style={{ width: 1000, height: 500, marginBottom: '3%' }}
      />
      <Main filterData={arrFilter} markerLocation={markerLocation} />
    </Container>
  );
};

export default Map;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
