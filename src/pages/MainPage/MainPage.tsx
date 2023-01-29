import { useQuery, useQueryClient } from 'react-query';
import Map from '../../components/Main/Map';
import { getData } from '../../common/api';
import { useEffect } from 'react';
import { Data, Location } from '../../types/MapInterface';
import { useAppSelector } from '../../hooks/useRedux';
import { Loading } from './style';

interface Props {
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
}

export const MainPage = ({
  level,
  myLocation,
  setLevel,
  setLocation,
  setMyLocation,
}: Props) => {
  const queryClient = useQueryClient();
  const zc = useAppSelector((state) => state.location.zcode);
  const zsc = useAppSelector((state) => state.location.zscode);

  // GET DATA
  const { isLoading, isError, data, error, refetch } = useQuery<
    Data,
    Error,
    Data,
    [string, string]
  >([zc, zsc], getData);

  // 지역코드나 지역코드가 바뀌면 refetch
  useEffect(() => {
    queryClient.removeQueries([zc, zsc]);
    refetch();
  }, [zc, zsc]);

  if (isLoading) return <Loading>☠️로딩중이다☠️</Loading>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Map
      data={data}
      myLocation={myLocation}
      setLocation={setLocation}
      setMyLocation={setMyLocation}
      level={level}
      setLevel={setLevel}
    />
  );
};
