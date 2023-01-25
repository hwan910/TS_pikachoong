/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import { Data, GeoResult, Item, Location } from '../types/MapInterface';
import { useNavigate } from 'react-router-dom';

const { kakao } = window;

interface Props {
  data: Data | undefined;
  myLocation: Location;
  setLocation: (location: Location) => void;
  setMyLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number | string;
      lng: number | string;
    }>
  >;
}

const Map = ({ data, myLocation, setLocation, setMyLocation }: Props) => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState<any>("");

  useEffect(() => {
    const arrUnique = data?.items.item.filter(
      (stat: Item, idx: number, arr: Item[]) => {
        return (
          arr.findIndex((item: Item) => item.statId === stat.statId) === idx
        );
      },
    );
    const location = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);

    const nearItems = arrUnique?.filter((item: Item) => item.lat);
    console.log(myLocation);

    const options = {
      center: location,
      level: 2,
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    // setMap(map);

    const zoomControl = new kakao.maps.ZoomControl();
    map.setDraggable(false);
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    const thunderimageSrc = require('../assets/thunder.png');
    const thunderoffimageSrc = require('../assets/thunderoff.png');
    const imageSize = new kakao.maps.Size(48, 48);
    new kakao.maps.Marker({
      map: map,
      position: location,
      clickable: true,
    });
    const thunderImage = new kakao.maps.MarkerImage(thunderimageSrc, imageSize);
    const thunderoffImage = new kakao.maps.MarkerImage(
      thunderoffimageSrc,
      imageSize,
    );
    if (typeof arrUnique === 'object') {
      for (const x of arrUnique) {
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
          image: x.stat === '2' ? thunderImage : thunderoffImage,
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

    var circle = new kakao.maps.Circle({
      map: map,
      center: new kakao.maps.LatLng(myLocation.Ma, myLocation.La),
      radius: 1000,
      strokeWeight: 2,
      strokeColor: '#FF00FF',
      strokeOpacity: 0.8,
      strokeStyle: 'dashed',
      fillColor: '#00EEEE',
      fillOpacity: 0.5,
    });

    circle.setMap(map);
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
        console.log(result[0]);
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        map.setCenter(coords);
        setLocation({ lat: result[0].y, lng: result[0].x });
        setMyLocation({ lat: result[0].y, lng: result[0].x });
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
