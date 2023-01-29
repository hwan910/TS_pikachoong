import Profile from '../Profile/Profile';
import { useAppSelector } from '../../../hooks/useRedux';
import { StyledProfileDiv, StyledTextH4, StyledTextP } from './style';

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
