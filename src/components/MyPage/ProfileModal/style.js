import styled from 'styled-components';
import { COLOR } from '../../../common/color';

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

const StyledProfileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledImg = styled.img`
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

export {
  StyledProfileModalBackground,
  StyledProfileModalDiv,
  StyledH2,
  StyledProfileDiv,
  StyledImg,
  StyledImageLabel,
  CameraDiv,
  Camera,
  StyledImageUploader,
  StyledX,
  StyledInput,
  StyledButtonChange,
};
