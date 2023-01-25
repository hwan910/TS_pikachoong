import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import MyReview from '../../components/MyReview';
import PasswordModal from '../../components/PasswordModal';
import Profile from '../../components/Profile';
import ProfileModal from '../../components/ProfileModal';

export const Mypage = () => {
  // 모달창 노출 여부 state
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  // 모달창 노출
  const showProfileModal = () => {
    setProfileModalOpen(true);
  };
  const showPasswordModal = () => {
    setPasswordModalOpen(true);
  };
  return (
    <StyledMyPage>
      <StyledMyProfile>
        <Profile />
        <Button onClick={showProfileModal}>프로필 수정</Button>
        {profileModalOpen && (
          <ProfileModal setProfileModalOpen={setProfileModalOpen} />
        )}
        <Button onClick={showPasswordModal}>암호화 수정</Button>
        {passwordModalOpen && (
          <PasswordModal setPasswordModalOpen={setPasswordModalOpen} />
        )}
      </StyledMyProfile>
      <MyReview />
    </StyledMyPage>
  );
};

const StyledMyProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const StyledMyPage = styled.div`
  display: flex;
  margin-top: 5rem;
`;
