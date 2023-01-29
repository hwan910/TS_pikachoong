import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Button from '../../components/MyPage/Button';
import MyReview from '../../components/MyPage/MyReview';
import Profile from '../../components/MyPage/Profile';
import ProfileModal from '../../components/MyPage/ProfileModal';
import ProfileTap from '../../components/MyPage/ProfileTap';

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
        <ProfileTap />
        <Button onClick={showProfileModal}>프로필 수정</Button>
        {profileModalOpen && (
          <ProfileModal setProfileModalOpen={setProfileModalOpen} />
        )}
      </StyledMyProfile>
      <StyledMyreviewCon>
        <StyledH1>My Review</StyledH1>
        <StyledMyReviewContainer>
          <MyReview />
        </StyledMyReviewContainer>
      </StyledMyreviewCon>
    </StyledMyPage>
  );
};

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
