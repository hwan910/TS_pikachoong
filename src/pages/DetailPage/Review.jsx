import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import * as S from './style';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../common/firebase';
import { SlOptions } from 'react-icons/sl';
import { uuidv4 } from '@firebase/util';
import { FaStar } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { toEditorSettings } from 'typescript';

export const Review = () => {
  const currentUser = getAuth().currentUser;
  const [reviewRating, setReviewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [nickName, setNickName] = useState('');

  const [reviewList, setReviewList] = useState([]);

  // const [isValid, setIsValid] = useState('');
  const [reviewId, setReviewId] = useState('');
  const [getProfileImg, setGetProfileImg] = useState('');

  const [getReviewList, setGetReviewList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();

  //리뷰 날짜! 사용할때는 now()
  const now = () => {
    const now = dayjs();
    return now.format('YYYY.MM.DD HH:mm');
  };

  // 리뷰 수정 삭제 모달
  const [modalOpen, setModalOpen] = useState({ id: 0, isOpen: false });
  const handleModalOpen = (reviewId) => {
    if (modalOpen.id !== reviewId && !modalOpen.isOpen) {
      setModalOpen({ id: reviewId, isOpen: true });
    } else if (modalOpen.id !== reviewId && modalOpen.isOpen) {
      setModalOpen({ id: reviewId, isOpen: true });
    } else if (modalOpen.id === reviewId && modalOpen.isOpen) {
      setModalOpen({ id: 0, isOpen: false })
    }
  }

  // 파이어베이스

  useEffect(() => {
    reviewHandler();
  }, []); // 리뷰리스트의 값이 변할때마다 핸들러 함수 실행
  // 리뷰핸들러 -> 리뷰리스트 -> 유즈이펙트 -> 리뷰핸들러 무한반복이라 [setReviewList] -> [] 로 수정

  const reviewHandler = async () => {
    const q = query(
      collection(db, 'reviews'),
      where('statId', '==', id),
      orderBy('createdTime', 'desc'),
    );
    const reviews = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => reviews.push({ id: doc.id, ...doc.data() }));
    return setReviewList(reviews);
  };

  // console.log(state);

  // const getUserInfo = async () => {
  //   const q = await query(
  //     collection(db, 'users'),
  //     where('uid', '==', currentUser.uid),
  //   );
  //   getDocs(q).then((querySnapshot) => {
  //     const user = [];
  //     querySnapshot.forEach((doc) => {
  //       user.push({
  //         nickName: doc.data().nickName,
  //         profileImg: doc.data().profileImg,
  //       });
  //     });
  //     setNickName(user[0].nickName);
  //     setGetProfileImg(user[0].profileImg);
  //   });
  // };

  // 리뷰추가
  const addReview = async () => {
    // event.preventDefault();
    await addDoc(collection(db, 'reviews'), {
      statId: id,
      review: newReview,
      profileImg: getProfileImg,
      nickName: nickName,
      reviewId: uuidv4(),
      createdTime: now(),
      reviewRating: reviewRating,
      isEdit: false,
    });
    setNewReview('');
    // setreviewRating(0);
  };

  //리뷰삭제
  const deleteReview = async () => {
    // setReviewList((prev) => prev.filter((t) => t.reviewId !== reviewId));
    // await deleteDoc(doc(db, 'reviews', reviewId));
    // setTimeout(() => {});
  };

  //리뷰수정
  const editReview = async (reviewId) => {
    const idx = reviewList.findIndex((review) => review.reviewId === reviewId);
    await updateDoc(doc(db, 'reviews', reviewId), {
      isEdit: !reviewList[idx].isEdit,
    });
  };

  const handleNewReview = (e) => {
    setNewReview(e.target.value);
  };

  // 별점핸들링

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
    <S.ReviewContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <S.ReviewHeadTitle>이용 후기</S.ReviewHeadTitle>
        <S.ScoreAvg>⭐️ 평균 4.0</S.ScoreAvg>
      </div>
      <S.ReviewInput>
        <S.Rating>
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
        </S.Rating>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <S.ReviewTextInput
            placeholder="의견 남기기"
            type="text"
            value={newReview}
            onChange={(e) => handleNewReview(e)}
            setReviewList={setReviewList}
          />
          <S.ReviewBtn onClick={addReview}>
            {/* type="submit" */}
            등록
          </S.ReviewBtn>
        </div>
      </S.ReviewInput>

      {/* 리뷰리스트 */}

      <S.ReviewList>
        {reviewList.map((i) => (
          <S.ReviewBox key={i.reviewId}>
            <S.ReviewDetail>
              <div style={{ display: 'flex' }}>
                <S.ProfileImg
                  source={{
                    uri: `${i.profileImg}`,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div>{i.nickName}</div>
                  <div>⭐⭐⭐⭐⭐ | {i.createdTime}</div>
                  <div>{i.review}</div>
                </div>
              </div>
              {/* 리뷰 수정삭제 모달 버튼 */}

              <SlOptions
                onClick={() => handleModalOpen(i.reviewId)}
                // i.reviewId
                style={{ cursor: 'pointer' }}
              />
            </S.ReviewDetail>
            {/* 리뷰 수정삭제 모달 */}
            {modalOpen.id === i.reviewId && modalOpen.isOpen && (
              <S.OptionModal>
                <S.EditBtn onClick={editReview}>수정</S.EditBtn>
                <S.DeleteBtn onClick={() => deleteReview(i.reviewId)}>
                  삭제
                </S.DeleteBtn>
              </S.OptionModal>
            )}
          </S.ReviewBox>
        ))}
      </S.ReviewList>
      {/* <button onClick={reviewHandler}>리뷰 불러오는 버튼</button> */}
    </S.ReviewContainer>
  );
};
