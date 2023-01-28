import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DetailMap from '../../components/Detail/DetailMap';
import {
  InfoArea,
  ChargingStationInfo,
  ChargingStationName,
  DetailMapWrap,
  DetailPageMain,
} from './style';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import { RiParkingFill } from 'react-icons/ri';
import { FaBolt } from 'react-icons/fa';
import { Review } from '../../components/Detail/Review';

export const Detailpage = () => {
  // const [rating, setRating] = useState(null);
  // const [hover, setHover] = useState(null);

  const [text, setText] = useState('');
  const { state } = useLocation();
  console.log(state);
  // const newReview = {
  //   comment: newComment,
  //   rating:ratings,
  //   commentId: uuidv4(),
  // }

  // const addReview = async() => {
  //   setReview

  // }

  return (
    <DetailPageMain>
      <InfoArea style={{ marginLeft: '40px' }}>
        <ChargingStationInfo>
          <ChargingStationName>{state[0].statNm}</ChargingStationName>
          <div style={{ marginBottom: '41px' }}>
            <FiMapPin style={{ marginRight: '10px' }} />
            {state[0].addr}
          </div>
          <div style={{ marginBottom: '41px' }}>
            <FiPhone style={{ marginRight: '10px' }} />
            {state[0].busiCall}
          </div>
          <div style={{ marginBottom: '41px' }}>
            <FiClock style={{ marginRight: '10px' }} />
            {state[0].useTime}
          </div>
          <div style={{ marginBottom: '41px' }}>
            <RiParkingFill style={{ marginRight: '10px' }} />
            무료
          </div>
          <div>
            <FaBolt style={{ marginRight: '10px' }} />
            충전가능
          </div>
        </ChargingStationInfo>

        <Review state={state[0]} />
      </InfoArea>

      <DetailMapWrap>
        <DetailMap location={{ lat: state[0].lat, lng: state[0].lng }} />
      </DetailMapWrap>
    </DetailPageMain>
  );
};
