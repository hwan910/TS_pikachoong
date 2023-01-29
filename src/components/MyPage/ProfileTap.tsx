import Profile from './Profile';
import { useAppSelector } from '../../hooks/useRedux';
import * as S from '../../pages/MyPage/style';

const ProfileTap = () => {
  const user = useAppSelector((state) => state.login.user);

  return (
    <S.StyledProfileDivDivDiv>
      <Profile />
      <S.StyledTextH4>{user.displayName}</S.StyledTextH4>
      <S.StyledTextP>{user.email}</S.StyledTextP>
    </S.StyledProfileDivDivDiv>
  );
};

export default ProfileTap;
