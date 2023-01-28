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
import { useEffect, useRef, useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import { IoSearchCircle } from 'react-icons/io5';
import { szcode, szscode } from '../../../common/zcode';
import { signOut } from 'firebase/auth';
import { auth } from '../../../common/firebase';
import { useAppSelector } from '../../../hooks/useRedux';

const Header = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.login.user);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [z1List, setZ1List] = useState<string[]>([]);
  const [z2List, setZ2List] = useState<string[]>([]);
  const [z2, setZ2] = useState('');
  const select1InputRef = useRef<any>(null);
  const select2InputRef = useRef<any>(null);

  const searchResultHandler = () => {
    z2 === '' ? alert('2차분류를 선택해주세요') : navigate(`/search/${z2}`);
  };

  useEffect(() => {
    const arr = [];
    for (const [key, value] of Object.entries(szcode)) {
      arr.push(`${key}:${value}`);
    }
    setZ1List(arr);
  }, []);

  const z2ListHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  const backtoMainPage = () => {
    setZ2List([]);
    setZ2('');
    if (select1InputRef.current) {
      select1InputRef.current.value = 'none';
      select2InputRef.current.value = 'none';
    }
    navigate('/');
  };

  return (
    <StyledHeader>
      <HeaderContainer>
        <LogoBox onClick={backtoMainPage}>
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
              ref={select1InputRef}
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
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setZ2(e.target.value)
              }
              ref={select2InputRef}
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
          {!user.uid ? (
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
