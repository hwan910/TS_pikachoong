// import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, providerGithub } from '../../../common/firebase';
import { provider } from '../../../common/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

// interface Props {
//   setLoginModalOpen: any;
// }

const LoginModal = ({ setLoginModalOpen }) => {
  const closeModal = () => {
    setLoginModalOpen(false);
  };

  const onClickGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(result);
        setLoginModalOpen(false);
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
        console.log(error);
        // ...
      });
  };

  const onClickGithubLogin = () => {
    signInWithPopup(auth, providerGithub)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(result);
        setLoginModalOpen(false);
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
        console.log(error);
        // ...
      });
  };

  return (
    <StyledLoginModalBackground>
      <StyledLoginModalDiv>
        <h1>간편 로그인</h1>
        <StyledX onClick={closeModal} src="img/x.png" alt="X" />
        <StyledLoginDiv>
          <StyledLoginButton onClick={() => onClickGoogleLogin()} name="google">
            <StyledButtonImg src="img/google.png" alt="구글" />
          </StyledLoginButton>
          <StyledLoginButton>
            <StyledButtonImg src="img/apple.png" alt="애플" />
          </StyledLoginButton>
          <StyledLoginButton onClick={() => onClickGithubLogin()} name="github">
            <StyledButtonImg src="img/github.png" alt="깃허브" />
          </StyledLoginButton>
        </StyledLoginDiv>
      </StyledLoginModalDiv>
    </StyledLoginModalBackground>
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
`;
