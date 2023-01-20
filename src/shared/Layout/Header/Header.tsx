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
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
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
          <HeaderBtn onClick={openModal}>LOGIN</HeaderBtn>
        </HeaderBtnBox>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
