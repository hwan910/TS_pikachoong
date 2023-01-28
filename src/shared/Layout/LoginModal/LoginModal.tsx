// import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, providerGithub } from '../../../common/firebase';
import { provider } from '../../../common/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Props {
  setLoginModalOpen: any;
}

const LoginModal = ({ setLoginModalOpen }: Props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const closeModal = () => {
    setLoginModalOpen(false);
    setPageNumber(0);
  };

  const onClickGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setPageNumber(1);
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
        setPageNumber(1);
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
      });
  };

  const userProfile: any = auth.currentUser;

  // 닉네임 변경 함수
  const nickNameChange = () => {
    updateProfile(userProfile, {
      displayName: nickname,
    })
      .then(() => {
        alert('변경완료');
      })
      .catch((e) => console.log('e:', e));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 사용자 프로필 업데이트
  const nicknameHandler = () => {
    // 유효성 검사
    if (nickname === '') {
      alert('닉네임이 비어있습니다.');
      inputRef.current?.focus();
      return;
    }
    if (nickname.length > 7) {
      alert('글자 수 7자를 초과하였습니다.');
      setNickname('');
      inputRef.current?.focus();
      return;
    }
    updateProfile(userProfile, {
      displayName: nickname,
    })
      .then(() => {
        alert('닉네임이 설정되었습니다.');
        if (inputRef.current !== null) {
          inputRef.current.focus();
        }
        setPageNumber(2);
      })
      .catch((e) => console.log('e:', e));
  };

  const closeModalX = () => {
    setLoginModalOpen(false);
  };
  return (
    <div>
      <StyledLoginModalBackground>
        {pageNumber === 0 && (
          <StyledLoginModalDiv>
            <h1>원하시는 로그인 방식을 선택해주세요.</h1>
            <StyledX
              onClick={closeModal}
              src={require('../../../assets/x.png')}
              alt="X"
            />
            <StyledLoginDiv>
              <StyledLoginButton
                onClick={() => onClickGoogleLogin()}
                name="google"
              >
                <StyledButtonImg
                  src={require('../../../assets/google.png')}
                  alt="구글"
                />
              </StyledLoginButton>
              <StyledLoginButton
                onClick={() => onClickGithubLogin()}
                name="github"
              >
                <StyledButtonImg
                  src={require('../../../assets/github.png')}
                  alt="깃허브"
                />
              </StyledLoginButton>
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
              ref={inputRef}
              autoFocus
              maxLength={8}
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
  background-color: #fffae3;
  width: 50rem;
  height: 3 0rem;
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
`;

const StyledX = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const StyledLoginDiv = styled.div`
  display: flex;
  padding: 1rem;
`;

const StyledLoginButton = styled.button`
  padding: 0 2rem;
  border: none;
  outline: none;
  background: none;
  font-size: 200;
`;

const StyledButtonImg = styled.img`
  display: flex;
  border: none;
  cursor: pointer;
  width: 7rem;
  height: 8rem;
  padding: 1rem;
  border-radius: 50%;
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
  background-color: rgb(250, 214, 29, 0.3);
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  margin-top: 1.5rem;
  font-size: larger;
`;
