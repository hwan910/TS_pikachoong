import { useState } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import { auth } from '../common/firebase';
import { updateProfile } from 'firebase/auth';

interface Props {
  setProfileModalOpen: any;
}

const ProfileModal = ({ setProfileModalOpen }: Props) => {
  const [nickname, setNickname] = useState('');
  const userProfile: any = auth.currentUser;

  // 모달 끄기
  const closeModal = () => {
    setProfileModalOpen(false);
    updateProfile(userProfile, {
      displayName: nickname,
    })
      .then(() => {
        alert('변경완료');
      })
      .catch((e) => console.log('e:', e));
  };

  // 사용자 프로필 업데이트
  const nicknameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  return (
    <StyledProfileModalBackground>
      <StyledProfileModalDiv>
        <StyledH2>프로필 수정</StyledH2>
        <Profile />
        <StyledX
          onClick={closeModal}
          src={require('../assets/x.png')}
          alt="X"
        />
        <StyledInput
          value={nickname}
          onChange={(e) => {
            nicknameHandler(e);
          }}
          type="text"
        />
        <StyledButtonChange onClick={closeModal}>수정완료</StyledButtonChange>
      </StyledProfileModalDiv>
    </StyledProfileModalBackground>
  );
};

export default ProfileModal;

const StyledProfileModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const StyledProfileModalDiv = styled.div`
  background-color: #fffae3;
  width: 30rem;
  height: 3 0rem;
  padding: 2rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
`;

const StyledH2 = styled.h2`
  position: absolute;
  top: 0.7rem;
`;

const StyledBackground = styled.div`
  position: absolute;
  top: 14rem;
  left: 19rem;
  background-color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const StyledImageLabel = styled.label`
  cursor: pointer;
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

const StyledImg = styled.img`
  position: absolute;
  top: 14.25rem;
  left: 19.25rem;
  z-index: 1;
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
  background-color: rgb(250, 214, 29);
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  margin-top: 1rem;
  font-size: medium;
  margin-bottom: 0.7rem;
`;
