import styled from 'styled-components';
import { COLOR } from '../../common/color';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(250, 214, 29, 0.3);
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  position: relative;
  bottom: 5rem;
  @media screen and (max-width: 768px) {
    position: relative;
    bottom: 0rem;
  }
`;

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

const StyledProfileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 3rem;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  width: 13rem;
  height: 13rem;
  object-fit: contain;
  @media screen and (max-width: 768px) {
    width: 8rem;
    height: 8rem;
  }
`;

const StyledTextDiv = styled.div`
  text-align: center;
`;

const StyledProfileModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

const StyledProfileModalDiv = styled.div`
  background-color: #fad61d;
  width: 30rem;
  height: 30rem;
  padding: 2rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  @media screen and (max-width: 768px) {
    width: 25rem;
    height: 28rem;
  }
`;

const StyledH2 = styled.h2`
  position: absolute;
  top: 0.7rem;
`;

const StyledProfileDivDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: white;
`;

const StyledImageLabel = styled.label`
  cursor: pointer;
  position: relative;
  width: 13rem;
  height: 13rem;
`;

const CameraDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const Camera = styled.img`
  background-color: #f1f1f1;
  border-radius: 50%;
  padding: 5px;
  margin: 10px;
`;

const StyledImageUploader = styled.input`
  display: none;
`;

const StyledX = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const StyledInput = styled.input`
  margin: 0.7rem 0;
  padding: 0.5rem 0.5rem;
  text-align: center;
  font-size: large;
  border: none;
  outline: none;
  margin-top: 2rem;
  border-radius: 3rem;
`;

const StyledButtonChange = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: black;
  :hover {
    background-color: ${COLOR.RED};
  }
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  margin-top: 1rem;
  font-size: medium;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: white;
`;

const StyledProfileDivDivDiv = styled.div`
  @media screen and (max-width: 768px) {
  }
`;

const StyledTextH4 = styled.h4`
  color: #6a6969;
  font-size: larger;
  margin-bottom: 1rem;
  text-align: center;
`;

const StyledTextP = styled.p`
  color: #a7a7a7;
  text-align: center;
`;

const StyledLoginModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

const StyledLoginModalDiv = styled.div`
  background-color: ${COLOR.YELLOW};
  width: 30rem;
  height: 30rem;
  padding: 2rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 768px) {
    width: 25rem;
    height: 25rem;
  }
`;

const StyledLoginDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`;

const StyledLoginGoogleButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const StyledLoginGoogle = styled.div`
  display: flex;
  background-color: white;
  width: 14rem;
  height: auto;
  padding: 1rem 2rem;
  border-radius: 45px;
  padding-left: 18px;
`;

const StyledLoginGoogleImg = styled.img`
  border: none;
  border-radius: 50%;
  width: 60px;
`;

const StyledLoginTextDiv = styled.div`
  margin-left: 1.2rem;
  display: flex;
  align-items: center;
`;

const StyledLoginText = styled.h3`
  color: black;
  font-weight: 700;
  margin-left: 20px;
`;

const StyledLoginGithubButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-top: 0.5rem;
`;

const StyledLoginGithub = styled.div`
  display: flex;
  background-color: white;
  width: 14rem;
  height: 3.9rem;
  padding: 1rem 2rem;
  border-radius: 45px;
  padding-left: 18px;
`;

const StyledLoginGithubImg = styled.img`
  border: none;
  border-radius: 50%;
  width: 60px;
`;

const StyledLoginGithubTextDiv = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

const StyledLoginGithubText = styled.h3`
  color: black;
  font-weight: 700;
  margin-left: 15px;
`;

const StyledNicknameInput = styled.input`
  padding: 1rem 3rem;
  border: none;
  outline: none;
  font-size: large;
  text-align: center;
`;

const StyledButtonButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fffae3;
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  margin-top: 1.5rem;
  font-size: larger;
  :hover {
    background-color: ${COLOR.RED};
    color: white;
  }
`;

// pages/mypage
const StyledMyProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    position: relative;
    bottom: 4rem;
  }
`;

const StyledMyPage = styled.div`
  display: flex;
  margin-top: 5rem;
  flex-direction: row;
  gap: 100px;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const StyledMyreviewCon = styled.div`
  @media screen and (max-width: 768px) {
    position: relative;
    bottom: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const StyledH1 = styled.h1`
  margin-left: 1rem;
  @media screen and (max-width: 768px) {
    /* position: relative; */
    /* right: -2rem; */
    font-size: large;
    z-index: -1;
    margin-top: 3rem;
    /* top: 0rem; */
  }
`;

const StyledMyReviewContainer = styled.div`
  overflow-y: scroll;
  height: 25rem;
  @media screen and (max-width: 768px) {
    /* z-index: -11; */
  }
`;

export {
  StyledButton,
  StyledView,
  StyledNullDiv,
  StyledNullText,
  StyledNullTextH2,
  StyledNullImg,
  StyledReview,
  StyledReviewBox,
  StyledReviewBoxH3,
  StyledProfileDiv,
  StyledImg,
  StyledTextDiv,
  StyledProfileModalBackground,
  StyledProfileModalDiv,
  StyledH2,
  StyledProfileDivDiv,
  StyledImage,
  StyledImageLabel,
  CameraDiv,
  Camera,
  StyledImageUploader,
  StyledX,
  StyledInput,
  StyledButtonChange,
  StyledProfileDivDivDiv,
  StyledTextH4,
  StyledTextP,
  StyledLoginModalBackground,
  StyledLoginModalDiv,
  StyledLoginDiv,
  StyledLoginGoogleButton,
  StyledLoginGoogle,
  StyledLoginGoogleImg,
  StyledLoginTextDiv,
  StyledLoginText,
  StyledLoginGithubButton,
  StyledLoginGithub,
  StyledLoginGithubImg,
  StyledLoginGithubTextDiv,
  StyledLoginGithubText,
  StyledNicknameInput,
  StyledButtonButton,
  StyledMyreviewCon,
  StyledMyProfile,
  StyledMyPage,
  StyledH1,
  StyledMyReviewContainer,
};
