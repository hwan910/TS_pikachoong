import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DetailMap from '../../components/DetailMap';
import {
  InfoArea,
  ChargingStationInfo,
  ChargingStationName,
  ReviewContainer,
  ReviewHeadTitle,
  ScoreAvg,
  ReviewInput,
  ReviewStarRating,
  ReviewTextInput,
  ReviewBtn,
  ReviewList,
} from './style';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import { RiParkingFill } from 'react-icons/ri';
import { FaBolt, FaStar } from 'react-icons/fa';
import { Review } from './Review';

export const Detailpage = () => {
  // const [rating, setRating] = useState(null);
  // const [hover, setHover] = useState(null);

  // const [review, setReview]
  const { state } = useLocation();
  // const newReview = {
  //   comment: newComment,
  //   rating:ratings,
  //   commentId: uuidv4(),
  // }

  // const addReview = async() => {
  //   setReview

  // }

  return (
    <div style={{ display: 'flex' }}>
      <InfoArea style={{ marginLeft: '40px' }}>
        <ChargingStationInfo>
          <ChargingStationName>등촌동효성인텔리안오피스텔</ChargingStationName>
          <div style={{ marginBottom: '41px' }}>
            <FiMapPin style={{ marginRight: '10px' }} />
            서울특별시 강서구 강서로 426
          </div>
          <div style={{ marginBottom: '41px' }}>
            <FiPhone style={{ marginRight: '10px' }} />
            1833-8017
          </div>
          <div style={{ marginBottom: '41px' }}>
            <FiClock style={{ marginRight: '10px' }} />
            24시간 이용 가능
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

        <ReviewContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <ReviewHeadTitle>이용 후기</ReviewHeadTitle>
            <ScoreAvg>평균 4.0 ⭐️⭐️⭐️⭐️⭐️</ScoreAvg>
          </div>
          <ReviewInput>
            <ReviewStarRating>⭐⭐⭐⭐⭐</ReviewStarRating>
            {/* <FaStar className="filledStar" style={{ color: '#fad61d' }} />
            <FaStar className="emptyStar" style={{ color: 'grey' }} /> */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ReviewTextInput placeholder="의견 남기기" />
              <ReviewBtn type="submit">등록</ReviewBtn>
            </div>
          </ReviewInput>
          <ReviewList>
            <Review />
            <Review />
          </ReviewList>
        </ReviewContainer>
      </InfoArea>
      <DetailMap location={{ lat: state[0].lat, lng: state[0].lng }} />
    </div>
  );
};
