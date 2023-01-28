import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import * as S from '../../pages/DetailPage/style';
import {
  addDoc,
  setDoc,
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
import { db, auth } from '../../common/firebase';
import { SlOptions } from 'react-icons/sl';
import { uuidv4 } from '@firebase/util';
import { FaStar } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { toEditorSettings } from 'typescript';
import ReviewEditModal from './ReviewEditModal';
// import EditDeleteModal from './EditDeleteModal';

export const Review = ({ state }) => {
  const currentUser = auth.currentUser;
  const [reviewRating, setReviewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [reviewList, setReviewList] = useState([]);

  const [reviewId, setReviewId] = useState('');
  const [getProfileImg, setGetProfileImg] = useState('');
  const [getReviewList, setGetReviewList] = useState('');

  const [editRating, setEditRating] = useState('');

  const { id } = useParams();

  //리뷰 날짜! 사용할때는 now()
  const now = () => {
    const now = dayjs();
    return now.format('YYYY.MM.DD HH:mm');
  };

  // 리뷰 수정삭제버튼 모달
  const [modalOpen, setModalOpen] = useState({ id: 0, isOpen: false });
  const handleModalOpen = (reviewId) => {
    if (modalOpen.id !== reviewId && !modalOpen.isOpen) {
      setModalOpen({ id: reviewId, isOpen: true });
    } else if (modalOpen.id !== reviewId && modalOpen.isOpen) {
      setModalOpen({ id: reviewId, isOpen: true });
    } else if (modalOpen.id === reviewId && modalOpen.isOpen) {
      setModalOpen({ id: 0, isOpen: false });
    }
  };

  // 리뷰 수정 모달
  const [editModal, setEditModal] = useState({ id: 0, isOpen: false }); // 수정버튼 누르면
  const handleEditModalOpen = (reviewId) => {
    if (editModal.id !== reviewId && !editModal.isOpen) {
      setEditModal({ id: reviewId, isOpen: true });
    } else if (editModal.id !== reviewId && editModal.isOpen) {
      setEditModal({ id: reviewId, isOpen: true });
    } else if (editModal.id === reviewId && editModal.isOpen) {
      setEditModal({ id: 0, isOpen: false });
    }
  };

  // const handleEditModalClose = () => {
  //   setEditModal(false);
  // };

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

  // 리뷰추가
  const addReview = async () => {
    const uuid = uuidv4();

    // addDoc을 쓰면 문서id가 랜덤으로 추가
    // reviewId:uuid와 문서 id를 일치시키기 위해 setDoc(doc(db, 'reviews', uuid) 으로 교체
    // onsnapshot을 쓰면 addDoc도 사용 가능! (onsnapshot 안쓰면 밑에 getDoc 써줘야함)

    if (!reviewRating && !newReview) {
      alert('댓글 또는 별점을 입력해 주세요');
    } else if (!reviewRating && newReview) {
      alert('별점을 입력해 주세요');
    } else if (reviewRating && !newReview) {
      alert('댓글을 입력해 주세요');
    } else {
      await setDoc(doc(db, 'reviews', uuid), {
        statNm: state.statNm,
        uid: currentUser.uid,
        statId: id,
        review: newReview,
        profileImg: currentUser.photoURL,
        nickName: currentUser.displayName,
        reviewId: uuid,
        createdTime: now(),
        reviewRating: reviewRating,
        isEdit: false,
      });
      setReviewRating('');
      setNewReview('');
      reviewHandler();
      setClicked([false, false, false, false, false]);
      // setreviewRating(0);}
    }
  };

  //리뷰수정
  const setEdit = async (reviewId) => {
    const newReviewList = [...reviewList];
    const idx = newReviewList.findIndex(
      (review) => review.reviewId === reviewId,
    );
    newReviewList[idx].isEdit = !newReviewList[idx].isEdit;
    setReviewList(newReviewList);
    // const idx = reviewList.findIndex((review) => review.reviewId === reviewId);
    await updateDoc(doc(db, 'reviews', reviewId), {
      isEdit: !reviewList[idx].isEdit,
    });
    reviewHandler();
  };

  const handleNewReview = (e) => {
    setNewReview(e.target.value);
  };

  const deleteReview = async (reviewId) => {
    setReviewList((prev) => prev.filter((t) => t.reviewId !== reviewId));
    await deleteDoc(doc(db, 'reviews', reviewId));
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
    setReviewRating(clickStates.filter((x) => x === true).length);
    setClicked(clickStates);
  };

  // console.log(reviewRating);
  // useEffect(() => {
  //   sendReview();
  // }, [clicked]);
  // const sendReview = () => {
  //   let score = clicked.filter(Boolean).length;
  // };

  return (
    <S.ReviewContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <S.ReviewHeadTitle>이용 후기</S.ReviewHeadTitle>
        <S.ScoreAvg>⭐️ {}4.0</S.ScoreAvg>
      </div>
      <S.ReviewInput>
        <S.Rating>
          {/* map함수로 배열을 받아 별5개를 리턴하기 위해 위에 ratingArr=[0,1,2,3,4] 를 선언 */}
          {/* 클릭한 별의 index값이 el에 찍힘(별점 3점 -> el = 3) */}
          {/* handleStarClick 함수로 클릭한 el값을 index로 받음 + i <= 3이 될때까지는 true값을 반환 */}
          {/* filter(Boolean)을 통해 true값만 반환 + length로 true=별 갯수 구현 */}
          {ratingArr.map((el, idx) => {
            // setReviewRating(clicked.filter((x) => x === true).length);
            // console.log(reviewRating);
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
          <S.ReviewBtn onClick={addReview}>등록</S.ReviewBtn>
        </div>
      </S.ReviewInput>

      {/* 리뷰리스트 */}

      <S.ReviewList>
        {reviewList.map((i) => {
          return (
            <S.ReviewBox key={i.reviewId}>
              <S.ReviewDetail
                style={{
                  display:
                    editModal.id === i.reviewId && editModal.isOpen
                      ? 'none'
                      : 'flex',
                }}
              >
                <div style={{ display: 'flex', width: 410 }}>
                  <S.ProfileImg src={i.profileImg} />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div>{i.nickName}</div>
                    <div>
                      {'⭐'.repeat(i.reviewRating)}&nbsp;&nbsp;|&nbsp;&nbsp;
                      {i.createdTime}
                    </div>
                    <div>{i.review}</div>
                  </div>
                </div>

                {/* 평점구하기 */}
                {/* {const avrScoreRating = reviewList.filter(())} */}

                {/* 리뷰 수정삭제 모달 여닫 버튼 */}
                {/* 본인 리뷰만 수정삭제 가능하게 */}
                {i.uid === currentUser.uid ? (
                  <SlOptions
                    onClick={() => handleModalOpen(i.reviewId)}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <></>
                )}
              </S.ReviewDetail>
              {/* 리뷰 수정삭제 모달 */}
              {modalOpen.id === i.reviewId && modalOpen.isOpen && (
                <S.OptionModal>
                  <S.EditBtn
                    onClick={() => {
                      handleEditModalOpen(i.reviewId);
                      setEdit(i.reviewId);
                      handleModalOpen(false);
                    }}
                  >
                    수정
                  </S.EditBtn>
                  <S.DeleteBtn onClick={() => deleteReview(i.reviewId)}>
                    삭제
                  </S.DeleteBtn>
                </S.OptionModal>
              )}

              {/* 수정모달 여기 */}

              {editModal.id === i.reviewId && editModal.isOpen && (
                <ReviewEditModal
                  reviewHandler={reviewHandler}
                  ratingArr={ratingArr}
                  handleStarClick={handleStarClick}
                  handleEditModalOpen={handleEditModalOpen}
                  clicked={clicked}
                  i={i}
                />
              )}
            </S.ReviewBox>
          );
        })}
      </S.ReviewList>
    </S.ReviewContainer>
  );
};

// http://localhost:3000/KE000642
// 서울강남역두산위브센티움
