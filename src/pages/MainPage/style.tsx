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
  @media screen and (max-width: 500px) {
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
  font-size: 1.5rem;
  width: 70%;
  height: 170px;
  display: flex;
  justify-content: center;
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
    width: 420px;
  }
  @media screen and (max-width: 500px) {
    width: 320px;
  }
`;

const MapWrap = styled.div`
  width: 1300px;
  height: 500px;
  @media screen and (max-width: 1200px) {
    width: 1000px;
    height: 300px;
  }
  @media screen and (max-width: 1000px) {
    width: 800px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

const HeaderWrap = styled.div`
  width: 1300px;
  height: 50px;
  border-bottom: 1px solid #fad61d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  @media screen and (max-width: 1200px) {
    width: 1000px;
  }
  @media screen and (max-width: 1000px) {
    width: 800px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

const HeaderTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
  @media screen and (max-width: 1200px) {
    font-size: 25px;
  }
  @media screen and (max-width: 1000px) {
    font-size: 22px;
  }
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

const HeaderForm = styled.form`
  display: flex;
`;

const HeaderInput = styled.input`
  padding: 15px;
  width: 300px;
  height: 1px;
  background: rgba(250, 214, 29, 0.2);
  border-radius: 24px;
  border: none;
  ::placeholder {
    opacity: 0.5;
  }
  @media screen and (max-width: 1200px) {
    width: 200px;
  }
  @media screen and (max-width: 1000px) {
    width: 150px;
  }
  @media screen and (max-width: 600px) {
    width: 100px;
  }
`;

const Loading = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
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
  MapWrap,
  HeaderInput,
  HeaderForm,
  HeaderTitle,
  HeaderWrap,
  Loading,
};
