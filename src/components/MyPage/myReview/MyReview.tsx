import { db } from '../../../common/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Item } from '../../../types/MapInterface';
import { useAppSelector } from '../../../hooks/useRedux';
import {
  StyledView,
  StyledNullDiv,
  StyledNullText,
  StyledNullTextH2,
  StyledNullImg,
  StyledReview,
  StyledReviewBox,
  StyledReviewBoxH3,
} from './style';

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
  }, [user]);

  return (
    <StyledView>
      {myReview.length === 0 ? (
        <StyledNullDiv>
          <StyledNullText>
            <StyledNullTextH2>작성한 댓글이 없습니다.</StyledNullTextH2>
          </StyledNullText>
          <StyledNullImg
            src={require('../../../assets/MyPage/comment.png')}
            alt=""
          />
        </StyledNullDiv>
      ) : (
        myReview.map((x) => {
          return (
            <StyledReview>
              <StyledReviewBox key={x.reviewId}>
                <StyledReviewBoxH3>{x.statNm}</StyledReviewBoxH3>
                <div>
                  {'⭐'.repeat(Number(x.reviewRating))} | {x.createdTime}
                </div>
                <h4>{x.review}</h4>
              </StyledReviewBox>
            </StyledReview>
          );
        })
      )}
    </StyledView>
  );
};

export default MyReview;
