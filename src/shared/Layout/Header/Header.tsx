import { useNavigate } from 'react-router-dom';
import {
  StyledHeader,
  HeaderContainer,
  Logo,
  HeaderBtnBox,
  HeaderBtn,
  SearchBox,
  SearchBtn,
  LogoText,
  LogoBox,
  SearchSelect,
} from './style';
import { useEffect, useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import { IoSearchCircle } from 'react-icons/io5';
import { szcode, szscode } from '../../../common/zcode';
import { signOut } from 'firebase/auth';
import { auth } from '../../../common/firebase';
import { useAppSelector } from '../../../hooks/useRedux';

const Header = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.login.user)
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [z1List, setZ1List] = useState<string[]>([]);
  const [z1, setZ1] = useState('');
  const [z2List, setZ2List] = useState<string[]>([]);
  const [z2, setZ2] = useState('');

  const searchResultHandler = () => {
    navigate(`/search/${z2}`);
  };

  useEffect(() => {
    const arr = [];
    for (const [key, value] of Object.entries(szcode)) {
      arr.push(`${key}:${value}`);
    }
    setZ1List(arr);
  }, []);

  const z2ListHandler = (e: any) => {
    setZ1(e.target.value);
    const arr = [];
    for (const [key, value] of Object.entries(szscode)) {
      if (key.slice(0, 2) === e.target.value) {
        arr.push(`${key}:${value}`);
      }
    }
    setZ2List(arr);
  };

  //모달 끄기
  const showLoginModal = () => {
    setLoginModalOpen(true);
  };

  //로그아웃
  const onClickLogout = (): void => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('로그아웃 되었습니다.');
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
        console.log('error:', error);
      });
  };

  return (
    <StyledHeader>
      <HeaderContainer>
        <LogoBox onClick={() => navigate('/')}>
          <LogoText>피카츙</LogoText>
          <Logo src={require('../../../assets/Logo.png')} />
        </LogoBox>

        <SearchBox>
          <SearchSelect>
            <select
              style={{
                border: 'none',
                borderRadius: 5,
              }}
              onChange={z2ListHandler}
            >
              <option value="none">=1차분류=</option>
              {z1List.map((item, i) => (
                <option value={item.split(':')[0]} key={i}>
                  {item.split(':')[1]}
                </option>
              ))}
            </select>
            <select
              style={{ border: 'none', borderRadius: 5 }}
              onChange={(e: any) => setZ2(e.target.value)}
            >
              <option value="none">=2차분류=</option>
              {z2List.map((item, i) => (
                <option value={item.split(':')[0]} key={i}>
                  {item.split(':')[1]}
                </option>
              ))}
            </select>
          </SearchSelect>
          <SearchBtn>
            <IoSearchCircle
              color="red"
              size={'2.6em'}
              onClick={searchResultHandler}
            />
          </SearchBtn>
        </SearchBox>
        <HeaderBtnBox>
          {user === null ? (
            <HeaderBtn onClick={showLoginModal}>LOGIN</HeaderBtn>
          ) : (
            <>
              <HeaderBtn onClick={() => navigate('/my')}>마이페이지</HeaderBtn>
              <HeaderBtn onClick={onClickLogout}>LOGOUT</HeaderBtn>
            </>
          )}
          {loginModalOpen && (
            <LoginModal setLoginModalOpen={setLoginModalOpen} />
          )}
        </HeaderBtnBox>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
