import React from 'react';
import styled from 'styled-components';

const Profile = () => {
  return (
    <StyledProfileDiv>
      <StyledImg src="img/girl.png" alt="" />
      <StyledTextDiv>
        <StyledTextH4>최원장</StyledTextH4>
        <StyledTextP>sparta@gmail.com</StyledTextP>
      </StyledTextDiv>
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
`;

const StyledTextDiv = styled.div`
  text-align: center;
`;

const StyledTextH4 = styled.h4`
  color: #6a6969;
  font-size: larger;
  margin-bottom: 10px;
`;

const StyledTextP = styled.p`
  color: #a7a7a7;
`;
