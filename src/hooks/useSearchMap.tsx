import { GeoResult, Location } from '../types/MapInterface';
import useInput from './useInput';

const { kakao } = window;

interface Element {
  map: any;
  marker: any;
  setLocation: (location: Location) => void;
  setMyLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number | string;
      lng: number | string;
    }>
  >;
}

// 지도에서 주소로 검색하는 커스텀훅
const useSearchMap = ({ map, marker, setLocation, setMyLocation }: Element) => {
  const [searchByAddress, onChangeSearch, resetSearch] = useInput('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(
      searchByAddress,
      (result: GeoResult[], status: string) => {
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          marker.setPosition(coords);
          setLocation({ lat: result[0].y, lng: result[0].x });
          setMyLocation({ lat: result[0].y, lng: result[0].x });

          map.setCenter(coords);
          resetSearch();
        }
      },
    );
  };

  return [searchByAddress, onChangeSearch, onSubmit] as const;
};

export default useSearchMap;
