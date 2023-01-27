import React from 'react';
import styled from 'styled-components';
import { ProfileImg } from '../pages/DetailPage/style';
import Profile from './Profile';

const ProfileTap = () => {
  return (
    <div>
      <Profile />
      <StyledTextH4>최원장</StyledTextH4>
      <StyledTextP>sparta@gmail.com</StyledTextP>
    </div>
  );
};

export default ProfileTap;

const StyledTextH4 = styled.h4`
  color: #6a6969;
  font-size: larger;
  margin-bottom: 1rem;
  text-align: center;
`;

const StyledTextP = styled.p`
  color: #a7a7a7;
  text-align: center;
`;
