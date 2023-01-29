import styled from 'styled-components';

const StyledView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: -1;
    position: relative;
  }
`;

const StyledNullDiv = styled.div`
  background-color: rgb(217, 217, 217, 0.2);
  padding: 0.1rem 1.5rem;
  margin: 1rem;
  width: 30rem;
  @media screen and (max-width: 768px) {
    width: 20rem;
    height: 22.5rem;
    overflow: hidden;
  }
`;

const StyledNullText = styled.div`
  text-align: center;
  @media screnn and (max-width: 768px) {
    height: 30rem;
  }
`;

const StyledNullTextH2 = styled.h2`
  margin-top: 3rem;
`;

const StyledNullImg = styled.img`
  width: 10rem;
  object-fit: cover;
  justify-content: center;
  position: relative;
  left: 9.5rem;
  bottom: 1rem;
  z-index: -10;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    position: relative;
    left: 5rem;
  }
`;

const StyledReview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 23rem;
    height: 12rem;
    overflow: hidden;
  }
`;

const StyledReviewBox = styled.div`
  background-color: rgb(217, 217, 217, 0.2);
  padding: 0.1rem 1.5rem;
  margin: 1rem;
  width: 30rem;
  height: 12rem;
  position: relative;
  @media screen and (max-width: 768px) {
    position: relative;
    left: 5rem;
  }
`;

const StyledReviewBoxH3 = styled.h3`
  @media screen and (max-width: 768px) {
    font-size: medium;
  }
`;

export {
  StyledView,
  StyledNullDiv,
  StyledNullText,
  StyledNullTextH2,
  StyledNullImg,
  StyledReview,
  StyledReviewBox,
  StyledReviewBoxH3,
};
