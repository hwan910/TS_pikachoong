import styled from 'styled-components';
import { COLOR } from '../../common/color';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NearbyChargingStationCard = styled.div`
  min-width: 400px;
  border-radius: 10px;
  background-color: white;
  width: 35%;
  height: 50%;
  box-shadow: 2px 2px 8px rgba(101, 101, 101, 0.25);
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 20px;
  cursor: pointer;
  margin: 0 auto 0 0;
`;

const NearbyChargingStationCardTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const NearbyChargingStationCardTitle = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`;

const NearbyChargingStationCardContent = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 10px;
`;

const NearbyChargingStationWrap = styled.div`
  width: 85%;
  height: 45vh;
  margin-bottom: 15%;
`;

const NearbyChargingStationTitleWrap = styled.div`
  width: auto;
  height: 60px;
  border-radius: 15px;
  background-color: ${COLOR.YELLOW};
  display: flex;
  align-items: center;
`;

const NearbyChargingStationTitle = styled.span`
  margin-left: 30px;
  font-size: 30px;
  font-weight: bold;
`;

const NearbyChargingStationCardWrap = styled.div`
  overflow-x: auto;
  padding: 50px 0 20px 0;
  width: 80%;
  height: 100%;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: center;
  margin: 0 auto;
  gap: 50px 50px;
  &::-webkit-scrollbar {
    /* display: none; */
  }
`;

export {
  Container,
  NearbyChargingStationCard,
  NearbyChargingStationCardTextWrap,
  NearbyChargingStationCardTitle,
  NearbyChargingStationCardContent,
  NearbyChargingStationWrap,
  NearbyChargingStationTitleWrap,
  NearbyChargingStationTitle,
  NearbyChargingStationCardWrap,
};
