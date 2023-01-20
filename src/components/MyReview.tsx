import React from 'react';
import styled from 'styled-components';

const MyReview = () => {
  return (
    <StyledReview>
      <StyledH1>My Review</StyledH1>
      <StyledReviewBox>리뷰1</StyledReviewBox>
      <StyledReviewBox>리뷰2</StyledReviewBox>
      <StyledReviewBox>리뷰3</StyledReviewBox>
      <StyledReviewBox>리뷰4</StyledReviewBox>
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
`;

const StyledH1 = styled.h1`
  padding-right: 22rem;
`;

const StyledReviewBox = styled.div`
  background-color: pink;
  padding: 20px;
  margin: 10px;
  width: 30rem;
`;
