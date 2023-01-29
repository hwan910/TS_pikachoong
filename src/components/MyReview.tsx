import styled from 'styled-components';
import { db } from '../common/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Item } from '../types/MapInterface';
import { useAppSelector } from '../hooks/useRedux';

const MyReview = () => {
  const user = useAppSelector(state => state.login.user)
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
    <StyledReview>
      <StyledH1>My Review</StyledH1>
      <StyledScroll>
        {myReview.map((x) => {
          return (
            <StyledReviewBox
              key={x.reviewId}
            >
              <h2>{x.statNm}</h2>
              <div>
                {'⭐'.repeat(Number(x.reviewRating))} | {x.createdTime}
              </div>
              <h3>{x.review}</h3>
            </StyledReviewBox>
          );
        })}
      </StyledScroll>
    </StyledReview>
  );
};

export default MyReview;

const StyledReview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 10rem;
  margin-bottom: 3rem;
`;

const StyledH1 = styled.h1`
  padding-right: 22rem;
`;

const StyledScroll = styled.div`
  overflow-y: scroll;
  height: 17rem;
`;

const StyledReviewBox = styled.div`
  background-color: pink;
  padding: 20px;
  margin: 10px;
  width: 30rem;
`;
