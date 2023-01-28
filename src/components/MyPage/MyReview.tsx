import styled from 'styled-components';
import { db } from '../../common/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Item } from '../../types/MapInterface';
import { useAppSelector } from '../../hooks/useRedux';

const MyReview = () => {
  const user = useAppSelector((state) => state.login.user);
  const [myReview, setMyReview] = useState<Item[]>([]);
  console.log(myReview.length);

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
      {myReview.length === 0 ? (
        <StyledReviewDiv>
          <StyledReviewText>
            <h2>어디로 가야할지 모르겠어요...</h2>
            <h3>나 진짜 길 찾는데...</h3>
            <h4>정말인데...</h4>
            <h5>데...</h5>
            <h6>..</h6>
            <p>.</p>
          </StyledReviewText>
          <StyledReviewImg src={require('../../assets/pointer.png')} alt="" />
        </StyledReviewDiv>
      ) : (
        myReview.map((x) => {
          return (
            <StyledScroll>
              <StyledReviewBox key={x.reviewId}>
                <StyledReviewBoxH2>{x.statNm}</StyledReviewBoxH2>
                <div>
                  {'⭐'.repeat(Number(x.reviewRating))} | {x.createdTime}
                </div>
                <h3>{x.review}</h3>
              </StyledReviewBox>
            </StyledScroll>
          );
        })
      )}
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
  @media screen and (max-width: 768px) {
    position: relative;
    bottom: 3rem;
    z-index: -1;
  }
`;

const StyledH1 = styled.h1`
  padding-right: 20rem;
  @media screen and (max-width: 768px) {
    position: relative;
    right: 3rem;
    font-size: large;
  }
`;

const StyledScroll = styled.div`
  /* overflow-y: scroll; */
  height: 21rem;
  @media screen and (max-width: 768px) {
    height: 3rem;
    position: relative;
    right: 5.4rem;
  }
`;

const StyledReviewBox = styled.div`
  background-color: rgb(217, 217, 217, 0.2);
  padding: 0.1rem 0.3rem;
  margin: 1rem;
  width: 30rem;
`;

const StyledReviewBoxH2 = styled.h2`
  @media screen and (max-width: 768px) {
    font-size: larger;
  }
`;

const StyledReviewDiv = styled.div`
  background-color: rgb(217, 217, 217, 0.2);
  padding: 0.1rem 1.5rem;
  margin: 1rem;
  width: 30rem;
  @media screen and (max-width: 768px) {
    width: 20rem;
    position: relative;
    right: 6rem;
  }
`;

const StyledReviewText = styled.div`
  text-align: center;
`;

const StyledReviewImg = styled.img`
  width: 10rem;
  object-fit: cover;
  justify-content: center;
  position: relative;
  left: 10rem;
  bottom: 1rem;
  z-index: -10;
  @media screen and (max-width: 768px) {
    position: relative;
    left: 5rem;
  }
`;
