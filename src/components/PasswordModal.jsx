import styled from 'styled-components';

const PasswordModal = ({ setPasswordModalOpen }) => {
  const closeModal = () => {
    setPasswordModalOpen(false);
  };
  return (
    <StyledPasswordModalBackground>
      <StyledProfileModalDiv>
        <h2>비밀번호 수정</h2>
        <StyledX onClick={closeModal} src="img/x.png" alt="X" />
        <StyledPassWordDiv>
          <p>현재 비밀번호</p>
          <StyledPassWordInput type="text" />
        </StyledPassWordDiv>
        <StyledPassWordDiv>
          <p>신규 비밀번호</p>
          <StyledPassWordInput type="text" />
        </StyledPassWordDiv>
        <StyledPassWordDiv>
          <p>비밀번호 확인</p>
          <StyledPassWordInput type="text" />
        </StyledPassWordDiv>
        <StyledButtonChange>변경완료</StyledButtonChange>
      </StyledProfileModalDiv>
    </StyledPasswordModalBackground>
  );
};

export default PasswordModal;

const StyledPasswordModalBackground = styled.div`
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledX = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const StyledPassWordDiv = styled.div`
  display: flex;
  padding: 1rem;
`;

const StyledPassWordInput = styled.input`
  padding: 0 2rem;
  margin-left: 2rem;
  border: none;
  outline: none;
  font-size: 1.2rem;
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
