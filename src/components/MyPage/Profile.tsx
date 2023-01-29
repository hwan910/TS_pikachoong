import { useAppSelector } from '../../hooks/useRedux';
import * as S from '../../pages/MyPage/style';

const Profile = () => {
  const user = useAppSelector((state) => state.login.user);

  return (
    <S.StyledProfileDiv>
      <S.StyledImg
        src={
          !!user.photoURL ? user.photoURL : require('../../assets/MyPage/x.png')
        }
        alt="프로필 사진"
      />
    </S.StyledProfileDiv>
  );
};

export default Profile;
