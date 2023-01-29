import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import * as S from '../../pages/DetailPage/style';
import * as F from 'firebase/firestore';
import { db, auth } from '../../common/firebase';
import { SlOptions } from 'react-icons/sl';
import { uuidv4 } from '@firebase/util';
import { FaStar } from 'react-icons/fa';
import ReviewEditModal from './ReviewEditModal';
import { Item } from '../../types/MapInterface';

interface Props {
  state: Item;
}

export interface ReviewType {
  [key: string]: string | number | boolean;
}

export const Review = ({ state }: Props) => {
  const currentUser = auth?.currentUser;

  const [reviewRating, setReviewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [reviewList, setReviewList] = useState<ReviewType[]>([]);

  const [editClicked, setEditClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const { id } = useParams();

  //리뷰 날짜! 사용할때는 now()
  const now = () => {
    const now = dayjs();
    return now.format('YYYY.MM.DD HH:mm');
  };

  type ModalInfo = { id: number | string; isOpen: boolean };
  // 리뷰 수정삭제버튼 모달
  const [modalOpen, setModalOpen] = useState<ModalInfo>({
    id: 0,
    isOpen: false,
  });
  const handleModalOpen = (reviewId: string) => {
    if (modalOpen.id !== reviewId && !modalOpen.isOpen) {
      setModalOpen({ id: reviewId, isOpen: true });
    } else if (modalOpen.id !== reviewId && modalOpen.isOpen) {
      setModalOpen({ id: reviewId, isOpen: true });
    } else if (modalOpen.id === reviewId && modalOpen.isOpen) {
      setModalOpen({ id: 0, isOpen: false });
    }
  };

  // 리뷰 수정 모달
  const [editModal, setEditModal] = useState<ModalInfo>({
    id: 0,
    isOpen: false,
  }); // 수정버튼 누르면
  const handleEditModalOpen = (reviewId?: string, reviewRating?: number) => {
    // reviewRating을 내려줘야 리뷰 수정 시 직전 별점 수정모달에 띄울 수 있음!
    if (reviewId) {
      if (editModal.id !== reviewId && !editModal.isOpen) {
        setEditModal({ id: reviewId, isOpen: true });
      } else if (editModal.id !== reviewId && editModal.isOpen) {
        setEditModal({ id: reviewId, isOpen: true });
      } else if (editModal.id === reviewId && editModal.isOpen) {
        setEditModal({ id: 0, isOpen: false });
      }
    } else {
      setEditModal({ id: 0, isOpen: false });
    }

    // 리뷰 수정 시 직전 별점 수정모달에 띄움
    if (reviewRating) {
      let clickStates = [...editClicked];
      for (let i = 0; i < 5; i++) {
        clickStates[i] = i < reviewRating ? true : false;
      }
      setEditClicked(clickStates);
    }
  };

  //삭제 확인 모달
  const [deleteModal, setDeleteModal] = useState<ModalInfo>({
    id: 0,
    isOpen: false,
  });
  const handleDeleteModalOpen = (reviewId?: string) => {
    if (reviewId) {
      if (deleteModal.id !== reviewId && !deleteModal.isOpen) {
        setDeleteModal({ id: reviewId, isOpen: true });
      } else if (deleteModal.id !== reviewId && deleteModal.isOpen) {
        setDeleteModal({ id: reviewId, isOpen: true });
      } else if (deleteModal.id === reviewId && deleteModal.isOpen) {
        setDeleteModal({ id: 0, isOpen: false });
      }
    } else {
      setDeleteModal({ id: 0, isOpen: false });
    }
  };

  // 파이어베이스

  useEffect(() => {
    reviewHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 리뷰리스트의 값이 변할때마다 핸들러 함수 실행
  // 리뷰핸들러 -> 리뷰리스트 -> 유즈이펙트 -> 리뷰핸들러 무한반복이라 [setReviewList] -> [] 로 수정

  const reviewHandler = async () => {
    const q = F.query(
      F.collection(db, 'reviews'),
      F.where('statId', '==', id),
      F.orderBy('createdTime', 'desc'),
    );
    const reviews: ReviewType[] = [];
    const querySnapshot = await F.getDocs(q);
    querySnapshot.forEach((doc) => reviews.push({ ...doc.data() }));
    return setReviewList(reviews);
  };

  // 리뷰추가
  const addReview = async () => {
    const uuid = uuidv4();
    if (currentUser === null) {
      alert('로그인이 필요한 서비스 입니다.');
      return;
    }

    // addDoc을 쓰면 문서id가 랜덤으로 추가
    // reviewId:uuid와 문서 id를 일치시키기 위해 setDoc(doc(db, 'reviews', uuid) 으로 교체
    // onsnapshot을 쓰면 addDoc도 사용 가능! (onsnapshot 안쓰면 밑에 getDoc 써줘야함)

    interface FireStoreData {
      statNm: string;
      uid: string;
      statId?: string;
      review: string;
      profileImg: string | null;
      nickName: string | null;
      reviewId: string;
      createdTime: string;
      reviewRating: number;
      isEdit: boolean;
    }

    const newReviewData: FireStoreData = {
      statNm: `${state.statNm}`,
      uid: currentUser.uid,
      statId: id,
      review: newReview,
      profileImg: currentUser.photoURL,
      nickName: currentUser.displayName,
      reviewId: uuid,
      createdTime: now(),
      reviewRating: reviewRating,
      isEdit: false,
    };

    if (!reviewRating && !newReview) {
      alert('댓글 또는 별점을 입력해 주세요');
    } else if (!reviewRating && newReview) {
      alert('별점을 입력해 주세요');
    } else if (reviewRating && !newReview) {
      alert('댓글을 입력해 주세요');
    } else {
      await F.setDoc(F.doc(db, 'reviews', uuid), newReviewData);
      setReviewRating(0);
      setNewReview('');
      reviewHandler();
      setClicked([false, false, false, false, false]);
    }
  };

  //리뷰수정
  const setEdit = async (reviewId: string) => {
    const newReviewList = [...reviewList];
    const idx = newReviewList.findIndex(
      (review) => review.reviewId === reviewId,
    );
    newReviewList[idx].isEdit = !newReviewList[idx].isEdit;
    setReviewList(newReviewList);
    await F.updateDoc(F.doc(db, 'reviews', reviewId), {
      isEdit: !reviewList[idx].isEdit,
    });
    reviewHandler();
  };

  const handleNewReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  const deleteReview = async (reviewId: string) => {
    setReviewList((prev: ReviewType[]) =>
      prev.filter((t: ReviewType) => t.reviewId !== reviewId),
    );
    await F.deleteDoc(F.doc(db, 'reviews', reviewId));
  };

  // 별점핸들링

  // 별점 rating
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const ratingArr = [0, 1, 2, 3, 4];
  const handleStarClick = (index: number) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setReviewRating(clickStates.filter((x) => x === true).length);
    setClicked(clickStates);
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
        <S.ScoreAvg>⭐️ {}4.0</S.ScoreAvg>
      </div>
      <S.ReviewInput>
        <S.Rating>
          {/* map함수로 배열을 받아 별5개를 리턴하기 위해 위에 ratingArr=[0,1,2,3,4] 를 선언 */}
          {/* 클릭한 별의 index값이 el에 찍힘(별점 3점 -> el = 3) */}
          {/* handleStarClick 함수로 클릭한 el값을 index로 받음 + i <= 3이 될때까지는 true값을 반환 */}
          {/* filter(Boolean)을 통해 true값만 반환 + length로 true=별 갯수 구현 */}
          {ratingArr.map((el: number, idx: number) => {
            return (
              <FaStar
                key={idx}
                size="25"
                onClick={() => handleStarClick(el)}
                className={clicked[el] ? 'yellowStar' : ''}
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
            value={newReview}
            onChange={(e) => handleNewReview(e)}
          />
          <S.ReviewBtn onClick={addReview}>등록</S.ReviewBtn>
        </div>
      </S.ReviewInput>

      {/* 리뷰리스트 */}

      <S.ReviewList>
        {reviewList.map((i: ReviewType) => {
          return (
            <S.ReviewBox key={`${i.reviewId}`}>
              <S.ReviewDetail
                style={{
                  display:
                    editModal.id === i.reviewId && editModal.isOpen
                      ? // || (deleteModal.id === i.reviewId && deleteModal.isOpen) // 삭제확인모달
                        'none'
                      : 'flex',
                }}
                onClick={() => {
                  handleDeleteModalOpen();
                }}
              >
                <div style={{ display: 'flex', width: 410 }}>
                  <S.ProfileImg src={`${i.profileImg}`} />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div>{i.nickName}</div>
                    <div>
                      <div>{'⭐'.repeat(Number(i.reviewRating))}</div>
                      <div style={{ marginTop: '5px' }}>
                        |&nbsp; {i.createdTime}
                      </div>
                    </div>
                    <div>{i.review}</div>
                  </div>
                </div>

                {/* 평점구하기 */}
                {/*  */}

                {/* 리뷰 수정삭제 모달 여닫 버튼 */}
                {/* 본인 리뷰만 수정삭제 가능하게 */}
                {i.uid === currentUser?.uid ? (
                  <SlOptions
                    onClick={
                      deleteModal.id === i.reviewId && deleteModal.isOpen
                        ? () => {}
                        : () => handleModalOpen(`${i.reviewId}`)
                    }
                    style={{
                      cursor:
                        deleteModal.id === i.reviewId && deleteModal.isOpen
                          ? ' '
                          : 'pointer',
                    }}
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
                      handleEditModalOpen(
                        `${i.reviewId}`,
                        Number(i.reviewRating),
                      );
                      setEdit(`${i.reviewId}`);
                      handleModalOpen(`${i.reviewId}`);
                    }}
                  >
                    수정
                  </S.EditBtn>
                  <S.DeleteBtn
                    onClick={() => {
                      handleDeleteModalOpen(`${i.reviewId}`);
                      handleModalOpen(`${i.reviewId}`);
                    }}
                  >
                    삭제
                  </S.DeleteBtn>
                </S.OptionModal>
              )}

              {/* 삭제하시겠습니까? 유효성 모달 */}
              {deleteModal.id === i.reviewId && deleteModal.isOpen && (
                <S.DeleteCheckModal>
                  <div>삭제하시겠습니까?</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <S.DeleteCancelBtn
                      onClick={() => {
                        handleDeleteModalOpen(`${i.reviewId}`);
                      }}
                    >
                      취소
                    </S.DeleteCancelBtn>
                    <S.DeleteCancelBtn
                      onClick={() => deleteReview(`${i.reviewId}`)}
                    >
                      삭제
                    </S.DeleteCancelBtn>
                  </div>
                </S.DeleteCheckModal>
              )}

              {/* 리뷰수정모달 여기 */}

              {editModal.id === i.reviewId && editModal.isOpen && (
                <ReviewEditModal
                  reviewHandler={reviewHandler}
                  ratingArr={ratingArr}
                  handleEditModalOpen={handleEditModalOpen}
                  i={i}
                  editClicked={editClicked}
                  setEditClicked={setEditClicked}
                />
              )}
            </S.ReviewBox>
          );
        })}
      </S.ReviewList>
    </S.ReviewContainer>
  );
};
