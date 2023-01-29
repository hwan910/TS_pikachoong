import styled from 'styled-components';
import { COLOR } from '../../../common/color';

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

const StyledX = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
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

const StyledButton = styled.button`
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

export {
  StyledLoginModalBackground,
  StyledLoginModalDiv,
  StyledX,
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
  StyledButton,
};
