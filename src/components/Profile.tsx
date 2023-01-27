import React from 'react';
import styled from 'styled-components';

const Profile = () => {
  return (
    <StyledProfileDiv>
      <StyledImg src={require('../assets/girl.png')} alt="프로필 사진" />
      <StyledTextDiv></StyledTextDiv>
    </StyledProfileDiv>
  );
};

export default Profile;

const StyledProfileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 3rem;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  width: 13rem;
  /* margin-top: 3rem; */
`;

const StyledTextDiv = styled.div`
  text-align: center;
`;
