import React, { useState, useEffect, useRef } from 'react';
import * as S from '../../pages/DetailPage/style';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../common/firebase';
import { FaStar } from 'react-icons/fa';

function ReviewEditModal({
  reviewHandler,
  ratingArr,
  handleStarClick,
  handleEditModalOpen,
  clicked,
  i,
}) {
  const [editComment, setEditComment] = useState(i.review);
  const [editRating, setEditRating] = useState(i.reviewRating); // 별점수정

  const handleEditComment = (e) => {
    setEditComment(e.target.value);
  }; // 리뷰 수정모달 input(textarea) onChange={(e) => handleEditReview(e)

  const handleEditRating = (e) => {
    setEditRating(e.target.value);
  }; // 별점수정

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
      reviewRating: editRating, // 별점수정
      isEdit: false,
    });
    setEditComment('');
    setEditRating([false, false, false, false, false]); // 별점수정
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
                    onClick={(e) => {
                      handleStarClick(el);
                    }}
                    className={clicked[el] && 'yellowStar'}
                    defaultValue={i.reviewRating} //별점수정
                    onChange={(e) => handleEditRating(e)} // 별점수정
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
