import React from 'react';
import styled from 'styled-components';

const MyReview = () => {
  return (
    <StyledReview>
      <StyledH1>My Review</StyledH1>
      <StyledScroll>
        <StyledReviewBox>리뷰1</StyledReviewBox>
        <StyledReviewBox>리뷰2</StyledReviewBox>
        <StyledReviewBox>리뷰3</StyledReviewBox>
        <StyledReviewBox>리뷰4</StyledReviewBox>
        <StyledReviewBox>리뷰5</StyledReviewBox>
        <StyledReviewBox>리뷰6</StyledReviewBox>
        <StyledReviewBox>리뷰7</StyledReviewBox>
        <StyledReviewBox>리뷰8</StyledReviewBox>
        <StyledReviewBox>리뷰9</StyledReviewBox>
        <StyledReviewBox>리뷰10</StyledReviewBox>
        <StyledReviewBox>리뷰11</StyledReviewBox>
        <StyledReviewBox>리뷰12</StyledReviewBox>
        <StyledReviewBox>리뷰13</StyledReviewBox>
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
  /* margin-bottom: 2rem; */
`;

const StyledH1 = styled.h1`
  padding-right: 22rem;
`;

const StyledScroll = styled.div`
  overflow-y: scroll;
  height: 22rem;
`;

const StyledReviewBox = styled.div`
  background-color: pink;
  padding: 20px;
  margin: 10px;
  width: 30rem;
`;
