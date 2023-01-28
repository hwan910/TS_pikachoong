import styled from 'styled-components';
import Profile from './Profile';
import { useAppSelector } from '../../hooks/useRedux';
import Button from './Button';

const ProfileTap = () => {
  const user = useAppSelector((state) => state.login.user);

  return (
    <StyledProfileDiv>
      <Profile />
      <StyledTextH4>{user.displayName}</StyledTextH4>
      <StyledTextP>{user.email}</StyledTextP>
    </StyledProfileDiv>
  );
};

export default ProfileTap;

const StyledProfileDiv = styled.div`
  @media screen and (max-width: 768px) {
  }
`;

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
