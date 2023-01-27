import styled from 'styled-components';
import { useAppSelector } from '../hooks/useRedux';

const Profile = () => {
  const user = useAppSelector(state => state.login.user)

  return (
    <StyledProfileDiv>
      <StyledImg
        src={!!user ? user.photoURL : require('../assets/x.png')}
        alt="프로필 사진"
      />
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

// src={`${
//   auth.currentUser?.photoURL === undefined
//     ? require('../assets/github.png')
//     : auth.currentUser?.photoURL
// }`}
