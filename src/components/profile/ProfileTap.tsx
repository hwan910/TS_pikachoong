import React from 'react';
import styled from 'styled-components';
import { ProfileImg } from '../../pages/DetailPage/style';
import Profile from './Profile';
import { auth } from '../../common/firebase';

const ProfileTap = () => {
  const user = auth?.currentUser;
  console.log(user);
  return (
    <div>
      <Profile url={user?.photoURL} />
      <StyledTextH4>{user?.displayName}</StyledTextH4>
      <StyledTextP>{user?.email}</StyledTextP>
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
