import { useNavigate } from 'react-router-dom';
import * as S from './style';
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
  const select1InputRef = useRef<HTMLSelectElement>(null);
  const select2InputRef = useRef<HTMLSelectElement>(null);

  const searchResultHandler = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    z2 === '' ? alert('2차분류를 선택해주세요') : navigate(`/search/${z2}`);
  };

  useEffect(() => {
    const arr = [];
    // object 를 array 로 변경함
    for (const [key, value] of Object.entries(szcode)) {
      arr.push(`${key}:${value}`);
    }
    setZ1List(arr);
  }, []);

  //z1 state 에 따라 z2 리스트 가 결정되는 함수
  const z2ListHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //z1 값 이 바뀌면 z2 값 초기화
    if (select2InputRef.current) {
      select2InputRef.current.value = 'none';
    }
    // object 를 array 로 변경함
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
    if (select1InputRef.current && select2InputRef.current) {
      select1InputRef.current.value = 'none';
      select2InputRef.current.value = 'none';
    }
    navigate('/');
  };

  return (
    <S.StyledHeader>
      <S.HeaderContainer>
        <S.LogoBox onClick={backtoMainPage}>
          <S.LogoText>피카츙</S.LogoText>
          <S.Logo src={require('../../../assets/Logo.png')} />
        </S.LogoBox>
        <S.HeaderDiv>
          <S.SearchBox>
            <S.SearchSelect>
              <select
                style={{
                  border: 'none',
                  borderRadius: 15,
                  width: 130,
                  textAlign: 'center',
                  marginRight: 10,
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
                style={{
                  border: 'none',
                  borderRadius: 15,
                  width: 130,
                  textAlign: 'center',
                }}
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
              <S.SearchBtn>
                <IoSearchCircle
                  color="red"
                  size={'2.6em'}
                  onClick={(e) => searchResultHandler(e)}
                />
              </S.SearchBtn>
            </S.SearchSelect>
          </S.SearchBox>
          <S.HeaderBtnBox>
            {!user.uid ? (
              <S.HeaderBtn onClick={showLoginModal}>LOGIN</S.HeaderBtn>
            ) : (
              <>
                <S.HeaderBtn onClick={() => navigate('/my')}>
                  마이페이지
                </S.HeaderBtn>
                <S.HeaderBtn onClick={onClickLogout}>LOGOUT</S.HeaderBtn>
              </>
            )}
            {loginModalOpen && (
              <LoginModal setLoginModalOpen={setLoginModalOpen} />
            )}
          </S.HeaderBtnBox>
        </S.HeaderDiv>
      </S.HeaderContainer>
    </S.StyledHeader>
  );
};

export default Header;
