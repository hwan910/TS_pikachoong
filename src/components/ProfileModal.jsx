import styled from 'styled-components';
import Profile from './Profile';

const ProfileModal = ({ setProfileModalOpen }) => {
  // 모달 끄기
  const closeModal = () => {
    setProfileModalOpen(false);
  };

  return (
    <StyledProfileModalBackground>
      <StyledProfileModalDiv>
        <h2>프로필 수정</h2>
        <Profile />
        <StyledBackground></StyledBackground>
        <StyledImg src="img/camera.png" alt="카메라" />
        <StyledX onClick={closeModal} src="img/x.png" alt="X" />
        <StyledButtonChange>수정완료</StyledButtonChange>
      </StyledProfileModalDiv>
    </StyledProfileModalBackground>
  );
};

export default ProfileModal;

const StyledProfileModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const StyledProfileModalDiv = styled.div`
  background-color: #fffae3;
  width: 30rem;
  height: 3 0rem;
  padding: 2rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
`;

const StyledBackground = styled.div`
  position: absolute;
  top: 15rem;
  left: 19rem;
  background-color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const StyledImageLabel = styled.label`
  cursor: pointer;
`;

const StyledImageUploader = styled.input`
  display: none;
`;

const StyledX = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 15.25rem;
  left: 19.25rem;
  z-index: 1;
  cursor: pointer;
`;

const StyledButtonChange = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(250, 214, 29);
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  margin-top: 1rem;
  font-size: medium;
`;
