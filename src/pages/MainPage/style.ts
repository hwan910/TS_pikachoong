import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { COLOR } from '../../common/color';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NearbyChargingStationCard = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 370px;
  height: 150px;
  border: 1px solid #fad61d;
  box-shadow: 2px 2px 8px rgba(101, 101, 101, 0.25);
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 20px;
  cursor: pointer;
  margin: 0 auto;
  @media screen and (max-width: 1000px) {
    width: 300px;
  }
  @media screen and (max-width: 400px) {
    width: 250px;
  }
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
  font-size: 48px;
  width: 1300px;
  height: 170px;
  display: flex;
  margin-left: 10px;
  justify-content: center;
  background-color: white;
  align-items: center;
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

const StyledSlider = styled(Slider)`
  .slick-list {
    position: relative;
    display: block;
    overflow: hidden;
    margin: 0 auto;
    padding: 0;
    width: 1300px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    opacity: 0.5;
    color: black;
  }

  display: flex;
  align-items: center;
  width: 1350px;
  height: 200px;
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
    width: 300px;
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
  StyledSlider,
};
