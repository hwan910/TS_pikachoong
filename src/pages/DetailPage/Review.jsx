import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  ReviewContainer,
  ReviewHeadTitle,
  ScoreAvg,
  ReviewInput,
  ReviewStarRating,
  ReviewTextInput,
  ReviewBtn,
  ReviewList,
  ReviewBox,
  ProfileImg,
  OptionModal,
  EditBtn,
  DeleteBtn,
  Rating,
} from './style';
import { SlOptions } from 'react-icons/sl';
import { uuidv4 } from '@firebase/util';
import { FaStar } from 'react-icons/fa';

export const Review = () => {
  const [ratingIndex, setRatingIndex] = useState(null);

  // 리뷰 수정 삭제 모달
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  //리뷰 날짜! 사용할때는 now()
  const now = () => {
    const now = dayjs();
    return now.format('YYYY.MM.DD HH:mm:ss');
  };

  // const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [nickName, setNickName] = useState('');
  const [reviewList, setReviewList] = useState('');
  // const [isValid, setIsValid] = useState('');
  const [reviewId, setReviewId] = useState('');
  const [getProfileImg, setGetProfileImg] = useState('');

  const addReview = (event) => {
    event.preventDefault();
    setReviewList((prev) => [
      ...prev,
      { review: newReview, reviewId: uuidv4(), createDate: now() },
    ]);
  };

  const handleNewReview = (e) => {
    setNewReview(e.target.value);
  };

  // 별점 rating
  const ratingArr = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
  };

  return (
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
        <Rating>
          {/* map함수로 배열을 받아 별5개를 리턴하기 위해 위에 ratingArr=[0,1,2,3,4] 를 선언 */}
          {/* 클릭한 별의 index값이 el에 찍힘(별점 3점 -> el = 3) */}
          {/* handleStarClick 함수로 클릭한 el값을 index로 받음 + i <= 3이 될때까지는 true값을 반환 */}
          {/* filter(Boolean)을 통해 true값만 반환 + length로 true=별 갯수 구현 */}
          {ratingArr.map((el, idx) => {
            return (
              <FaStar
                key={idx}
                size="25"
                onClick={() => handleStarClick(el)}
                className={clicked[el] && 'yellowStar'}
              />
            );
          })}
        </Rating>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ReviewTextInput
            placeholder="의견 남기기"
            type="text"
            value={newReview}
            onChange={(e) => handleNewReview(e)}
          />
          <ReviewBtn type="submit" onSubmit={addReview}>
            {/* value={newReview} */}
            등록
          </ReviewBtn>
        </div>
      </ReviewInput>

      {/* 리뷰리스트 */}

      <ReviewList>
        {/* {reviewList.map((review) => { */}
        <div
          // key={review}
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
          }}
        >
          <ReviewBox>
            <div style={{ display: 'flex' }}>
              <ProfileImg />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div>닉네임</div>
                <div>⭐⭐⭐⭐⭐ | {} 날짜</div>
                <div>나중에 input으로 바꾸고 리뷰내용 넣기</div>
              </div>
            </div>
            {/* 리뷰 수정삭제 모달 버튼 */}
            <SlOptions
              onSubmit={handleModalOpen}
              style={{ cursor: 'pointer' }}
            />
          </ReviewBox>
          {/* 리뷰 수정삭제 모달 */}
          {modalOpen && (
            <OptionModal
              setModalOpen={setModalOpen}
              onSubmit={handleModalClose}
            >
              <EditBtn>수정</EditBtn>
              <DeleteBtn>삭제</DeleteBtn>
            </OptionModal>
          )}
        </div>
        ;{/* })} */}
      </ReviewList>
    </ReviewContainer>
  );
};
