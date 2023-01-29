import { db } from '../../common/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Item } from '../../types/MapInterface';
import { useAppSelector } from '../../hooks/useRedux';
import * as S from '../../pages/MyPage/style';

const MyReview = () => {
  const user = useAppSelector((state) => state.login.user);
  const [myReview, setMyReview] = useState<Item[]>([]);

  const reviewHandler = async () => {
    const q = query(
      collection(db, 'reviews'),
      where('uid', '==', user?.uid),
      orderBy('createdTime', 'desc'),
    );
    const reviews: Item[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => reviews.push({ ...doc.data() }));
    setMyReview(reviews);
  };

  useEffect(() => {
    reviewHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <S.StyledView>
      {myReview.length === 0 ? (
        <S.StyledNullDiv>
          <S.StyledNullText>
            <S.StyledNullTextH2>작성한 댓글이 없습니다.</S.StyledNullTextH2>
          </S.StyledNullText>
          <S.StyledNullImg
            src={require('../../assets/MyPage/comment.png')}
            alt=""
          />
        </S.StyledNullDiv>
      ) : (
        myReview.map((x) => {
          return (
            <S.StyledReview key={x.reviewId}>
              <S.StyledReviewBox>
                <S.StyledReviewBoxH3>{x.statNm}</S.StyledReviewBoxH3>
                <div>
                  {'⭐'.repeat(Number(x.reviewRating))} | {x.createdTime}
                </div>
                <h4>{x.review}</h4>
              </S.StyledReviewBox>
            </S.StyledReview>
          );
        })
      )}
    </S.StyledView>
  );
};

export default MyReview;
