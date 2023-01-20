import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import MyReview from '../../components/MyReview';
import Profile from '../../components/Profile';

export const Mypage = () => {
  return (
    <StyledMyPage>
      <StyledMyProfile>
        <Profile />
        <Button>프로필 수정</Button>
        <Button>암호화 수정</Button>
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
