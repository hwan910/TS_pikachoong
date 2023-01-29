import { useLocation } from 'react-router-dom';
import DetailMap from '../../components/Detail/DetailMap';
import * as S from './style';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import { RiParkingFill } from 'react-icons/ri';
import { FaBolt } from 'react-icons/fa';
import { Review } from '../../components/Detail/Review';

export const Detailpage = () => {
  const { state } = useLocation();

  return (
    <S.DetailPageMain>
      <S.InfoArea style={{}}>
        <S.ChargingStationInfo>
          <S.ChargingStationName>{state[0].statNm}</S.ChargingStationName>
          <div style={{ marginBottom: '33px' }}>
            <FiMapPin style={{ marginRight: '10px' }} />
            {state[0].addr}
          </div>
          <div style={{ marginBottom: '33px' }}>
            <FiPhone style={{ marginRight: '10px' }} />
            {state[0].busiCall}
          </div>
          <div style={{ marginBottom: '33px' }}>
            <FiClock style={{ marginRight: '10px' }} />
            {state[0].useTime}
          </div>
          <div style={{ marginBottom: '33px' }}>
            <RiParkingFill style={{ marginRight: '10px' }} />
            무료
          </div>
          <div>
            <FaBolt style={{ marginRight: '10px' }} />
            충전가능
          </div>
        </S.ChargingStationInfo>

        <Review state={state[0]} />
      </S.InfoArea>

      <S.DetailMapWrap>
        <DetailMap location={{ lat: state[0].lat, lng: state[0].lng }} />
      </S.DetailMapWrap>
    </S.DetailPageMain>
  );
};
