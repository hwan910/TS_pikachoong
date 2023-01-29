import { useAppSelector } from '../../hooks/useRedux';
import {
  StyledProfileDiv,
  StyledImg,
  StyledTextDiv,
} from '../../pages/MyPage/style';

const Profile = () => {
  const user = useAppSelector((state) => state.login.user);

  return (
    <StyledProfileDiv>
      <StyledImg
        src={
          !!user.photoURL ? user.photoURL : require('../../assets/MyPage/x.png')
        }
        alt="프로필 사진"
      />
      <StyledTextDiv></StyledTextDiv>
    </StyledProfileDiv>
  );
};

export default Profile;
