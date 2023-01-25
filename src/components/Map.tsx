/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import { Data, GeoResult, Item, Location } from '../types/MapInterface';
import { useNavigate } from 'react-router-dom';

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
  const [marker, setMarker] = useState<any>("")

  console.log(marker);
  

  useEffect(() => {
    const arrUnique = data?.items.item.filter(
      (stat: Item, idx: number, arr: Item[]) => {
        return (
          arr.findIndex((item: Item) => item.statId === stat.statId) === idx
        );
      },
    );
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
    setMarker(myMarker)
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
        marker.setPosition(coords)
        setLocation({ lat: result[0].y, lng: result[0].x });
        setMyLocation({ lat: result[0].y, lng: result[0].x });
        map.setCenter(coords);
        setText("")
      }
    });
  };

  return (
    <>
      <div ref={mapRef} style={{ width: 1200, height: 800 }} />
      <form onSubmit={onSubmit}>
        <input type="text" onChange={(e) => onChange(e)} value={text} />
        <button>확인</button>
      </form>
    </>
  );
};

export default Map;
