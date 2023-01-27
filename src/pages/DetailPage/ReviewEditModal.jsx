import React, { useState, useEffect, useRef } from 'react';
import * as S from './style';
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
import { uuidv4 } from '@firebase/util';
import { FaStar } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { toEditorSettings } from 'typescript';
import { Review } from './Review';

function ReviewEditModal({
  reviewHandler,
  ratingArr,
  handleStarClick,
  handleEditModalOpen,
  clicked,
  i,
}) {
  const [editComment, setEditComment] = useState(i.review);

  const handleEditComment = (e) => {
    setEditComment(e.target.value);
  }; // 리뷰 수정모달 input(textarea) onChange={(e) => handleEditReview(e)

  const editReview = async (reviewId) => {
    // const newReviewList = [...reviewList];
    // const idx = newReviewList.findIndex(
    //   (review) => review.reviewId === reviewId,
    // );
    // newReviewList[idx].newReview = editComment;
    // newReviewList[idx].isEdit = false;
    // setReviewList(newReviewList);
    await updateDoc(doc(db, 'reviews', reviewId), {
      review: editComment,
      isEdit: false,
    });
    setEditComment('');
    reviewHandler();
  };

  return (
    <S.ReviewBox key={i.reviewId}>
      <S.ReviewDetail>
        <div style={{ display: 'flex', backgroundColor: 'white' }}>
          <S.ProfileImg src={i.profileImg} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div>{i.nickName}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {ratingArr.map((el, idx) => {
                return (
                  <FaStar
                    key={idx}
                    size="20"
                    onClick={() => handleStarClick(el)}
                    className={clicked[el] && 'yellowStar'}
                  />
                );
              })}
              <div>&nbsp;|&nbsp;{i.createdTime}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <S.EditReviewTextInput
                onChange={(e) => handleEditComment(e)}
                defaultValue={i.review}
              />
              <S.ReviewBtn
                onClick={() => {
                  editReview(i.reviewId);
                  handleEditModalOpen(false);
                  // console.log('ㅑ');
                }}
              >
                {/* type="submit" */}
                수정
              </S.ReviewBtn>
            </div>
          </div>
        </div>
      </S.ReviewDetail>
    </S.ReviewBox>
  );
}

export default ReviewEditModal;
