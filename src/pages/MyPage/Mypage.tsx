import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/profile/Button';
import MyReview from '../../components/review/MyReview';
import Profile from '../../components/profile/Profile';
import ProfileModal from '../../components/profile/ProfileModal';
import ProfileTap from '../../components/profile/ProfileTap';

export const Mypage = () => {
  // 모달창 노출 여부 state
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // 모달창 노출
  const showProfileModal = () => {
    setProfileModalOpen(true);
  };

  return (
    <StyledMyPage>
      <StyledMyProfile>
        <ProfileTap />
        <Button onClick={showProfileModal}>프로필 수정</Button>
        {profileModalOpen && (
          <ProfileModal setProfileModalOpen={setProfileModalOpen} />
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
