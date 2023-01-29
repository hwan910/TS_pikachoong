// import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, providerGithub } from '../../../common/firebase';
import { provider } from '../../../common/firebase';
import { COLOR } from '../../../common/color';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  setLoginModalOpen: any;
}

const LoginModal = ({ setLoginModalOpen }: Props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const closeModal = () => {
    setLoginModalOpen(false);
    setPageNumber(0);
  };
  const userProfile: any = auth.currentUser;

  const onClickGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setPageNumber(2);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert('로그인이 실패 하였습니다.');
        // ...
      });
  };

  const onClickGithubLogin = () => {
    signInWithPopup(auth, providerGithub)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential: any = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setPageNumber(2);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log(error.message);
      });
  };

  // 사용자 프로필 업데이트
  const nicknameHandler = () => {
    updateProfile(userProfile, {
      displayName: nickname,
    })
      .then(() => {
        alert('변경완료');
        setPageNumber(2);
      })
      .catch((e) => console.log('e:', e));
  };

  return (
    <div>
      <StyledLoginModalBackground>
        {pageNumber === 0 && (
          <StyledLoginModalDiv>
            <h2>
              기존에 사용하시는 계정으로 <br />
              간단하게 회원가입 하세요.
            </h2>
            <StyledX
              onClick={closeModal}
              src={require('../../../assets/x.png')}
              alt="X"
            />
            <StyledLoginDiv>
              <StyledLoginGoogleButton onClick={onClickGoogleLogin}>
                <StyledLoginGoogle>
                  <StyledLoginGoogleImg
                    src={require('../../../assets/google.png')}
                    alt=""
                  />
                  <StyledLoginTextDiv>
                    <StyledLoginText>Google 로그인</StyledLoginText>
                  </StyledLoginTextDiv>
                </StyledLoginGoogle>
              </StyledLoginGoogleButton>
              <StyledLoginGithubButton onClick={onClickGithubLogin}>
                <StyledLoginGithub>
                  <StyledLoginGithubImg
                    src={require('../../../assets/github.png')}
                    alt=""
                  />
                  <StyledLoginGithubTextDiv>
                    <StyledLoginGithubText>Github 로그인</StyledLoginGithubText>
                  </StyledLoginGithubTextDiv>
                </StyledLoginGithub>
              </StyledLoginGithubButton>
            </StyledLoginDiv>
          </StyledLoginModalDiv>
        )}
        {pageNumber === 1 && (
          <StyledLoginModalDiv>
            <h1>닉네임을 입력해주세요.</h1>
            <StyledX
              onClick={closeModal}
              src={require('../../../assets/x.png')}
              alt="X"
            />
            <StyledNicknameInput
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
                console.log(nickname);
              }}
              type="text"
            />
            <StyledButton onClick={nicknameHandler}>확인</StyledButton>
          </StyledLoginModalDiv>
        )}
        {pageNumber === 2 && (
          <StyledLoginModalDiv>
            <h1>로그인이 완료되었습니다.</h1>
            <StyledX
              onClick={closeModal}
              src={require('../../../assets/x.png')}
              alt="X"
            />
            <StyledButton
              onClick={() => {
                setPageNumber(0);
                setLoginModalOpen(false);
                navigate('/');
              }}
            >
              확인
            </StyledButton>
          </StyledLoginModalDiv>
        )}
      </StyledLoginModalBackground>
    </div>
  );
};

export default LoginModal;

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
  /* border: 1px solid ${COLOR.RED}; */
  background-color: white;
  width: 14rem;
  /* height: 70px; */
  height: auto;
  padding: 1rem 2rem;
  border-radius: 45px;
  padding-left: 18px;
`;

const StyledLoginGoogleImg = styled.img`
  /* background-color: white; */
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
  /* border: 1px solid ${COLOR.RED}; */
  background-color: white;
  width: 14rem;
  height: 3.9rem;
  padding: 1rem 2rem;
  border-radius: 45px;
  padding-left: 18px;
`;

const StyledLoginGithubImg = styled.img`
  /* background-color: white; */
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
