import { useState } from 'react';
import * as S from '../../pages/DetailPage/style';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../common/firebase';
import { FaStar } from 'react-icons/fa';
import { ReviewType } from './Review';

interface Props {
  reviewHandler: () => Promise<void>;
  ratingArr: number[];
  handleEditModalOpen: (reviewId?: string, reviewRating?: number) => void;
  i: ReviewType;
  editClicked: boolean[];
  setEditClicked: React.Dispatch<React.SetStateAction<boolean[]>>;
}

function ReviewEditModal({
  reviewHandler,
  ratingArr,
  handleEditModalOpen,
  i,
  editClicked,
  setEditClicked,
}: Props) {
  const [editComment, setEditComment] = useState(i.review);
  const [editRating, setEditRating] = useState(i.reviewRating); // 별점수정

  const handleEditComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditComment(e.target.value);
  }; // 리뷰 수정모달 input(textarea) onChange={(e) => handleEditReview(e)

  const editReview = async (reviewId: string) => {
    await updateDoc(doc(db, 'reviews', reviewId), {
      review: editComment,
      reviewRating: editRating, // 별점수정
      isEdit: false,
    });
    setEditComment('');
    reviewHandler();
  };

  const handleEditStarClick = (index: number) => {
    let clickStates = [...editClicked];

    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setEditRating(clickStates.filter((x) => x === true).length);
    setEditClicked(clickStates);
  };

  return (
    <S.ReviewBox key={`${i.reviewId}`}>
      <S.ReviewDetail>
        <div style={{ display: 'flex', backgroundColor: 'white' }}>
          <S.ProfileImg src={`${i.profileImg}`} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div>{i.nickName}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <S.Rating>
                {ratingArr.map((el, idx) => {
                  return (
                    <FaStar
                      key={idx}
                      size="20"
                      onClick={() => {
                        handleEditStarClick(el);
                      }}
                      className={editClicked[el] ? 'yellowStar' : ''}
                    />
                  );
                })}
              </S.Rating>
              <div>&nbsp;|&nbsp;{i.createdTime}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <S.EditReviewTextInput
                onChange={(e) => handleEditComment(e)}
                defaultValue={`${i.review}`}
              />
              <S.ReviewBtn
                onClick={() => {
                  editReview(`${i.reviewId}`);
                  handleEditModalOpen();
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
