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
import { useQuery } from 'react-query';
import { Data } from '../../../types/MapInterface';
import { getChargerinfo, getData } from '../../../common/api';
import { useSelector, useDispatch } from 'react-redux';
import { switchSearchResult } from '../../../redux/modules/searchSlice';

const Header = () => {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [z1List, setZ1List] = useState<string[]>([]);
  const [z1, setZ1] = useState('');
  const [z2List, setZ2List] = useState<string[]>([]);
  const [z2, setZ2] = useState('');

  const searchResult = useSelector((state: any) => state.search);

  const searchResultHandler = () => {
    dispatch(switchSearchResult([z1, z2]));
    navigate('/search');
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

  const showLoginModal = () => {
    setLoginModalOpen(true);
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
