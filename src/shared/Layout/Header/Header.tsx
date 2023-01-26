import { useNavigate } from 'react-router-dom';
import {
  StyledHeader,
  HeaderContainer,
  Logo,
  HeaderBtnBox,
  HeaderBtn,
} from './style';
import { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';

const Header = () => {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const showLoginModal = () => {
    setLoginModalOpen(true);
  };

  return (
    <StyledHeader>
      <HeaderContainer>
        <Logo
          onClick={() => navigate('/')}
          src={require('../../../assets/Logo.png')}
        />
        <HeaderBtnBox>
          <HeaderBtn onClick={() => navigate('/my')}>마이페이지</HeaderBtn>
          <HeaderBtn onClick={showLoginModal}>LOGIN</HeaderBtn>
          {loginModalOpen && (
            <LoginModal setLoginModalOpen={setLoginModalOpen} />
          )}
        </HeaderBtnBox>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
