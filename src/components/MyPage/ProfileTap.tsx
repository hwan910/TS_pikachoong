import Profile from './Profile';
import { useAppSelector } from '../../hooks/useRedux';
import {
  StyledProfileDivDivDiv,
  StyledTextH4,
  StyledTextP,
} from '../../pages/MyPage/style';

const ProfileTap = () => {
  const user = useAppSelector((state) => state.login.user);

  return (
    <StyledProfileDivDivDiv>
      <Profile />
      <StyledTextH4>{user.displayName}</StyledTextH4>
      <StyledTextP>{user.email}</StyledTextP>
    </StyledProfileDivDivDiv>
  );
};

export default ProfileTap;
