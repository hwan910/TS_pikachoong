import { useLocation } from 'react-router-dom';
import DetailMap from '../../components/DetailMap';

export const Detailpage = () => {
  const { state } = useLocation();

  return (
    <>
      <div>{state[0].statNm}</div>
      <DetailMap location={{lat: state[0].lat, lng: state[0].lng}} />
    </>
  );
};
