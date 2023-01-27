import { useQuery, useQueryClient } from 'react-query';
import Map from '../../components/Main/Map';
import { getData } from '../../common/api';
import { useEffect } from 'react';
import { Data, Location } from '../../types/MapInterface';
import { useAppSelector } from '../../hooks/useRedux';

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

  const { isLoading, isError, data, error, refetch } = useQuery<
    Data,
    Error,
    Data,
    [string, string]
  >([zc, zsc], getData);

  useEffect(() => {
    queryClient.removeQueries([zc, zsc]);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zc, zsc]);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Map
      data={data}
      myLocation={myLocation}
      setLocation={setLocation}
      setMyLocation={setMyLocation}
      level={level}
      setLevel={setLevel}
      refetch={refetch}
    />
  );
};
