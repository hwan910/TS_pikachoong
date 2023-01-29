import { auth, providerGithub, provider } from '../../../common/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../../pages/MyPage/style';

interface Props {
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ setLoginModalOpen }: Props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();
  const closeModal = () => {
    setLoginModalOpen(false);
    setPageNumber(0);
  };

  // 구글 로그인
  const onClickGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setPageNumber(2);
      })
      .catch(() => {
        alert('로그인이 실패 하였습니다.');
      });
  };

  // 깃허브 로그인
  const onClickGithubLogin = () => {
    signInWithPopup(auth, providerGithub)
      .then(() => {
        setPageNumber(2);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <S.StyledLoginModalBackground>
        {pageNumber === 0 && (
          <S.StyledLoginModalDiv>
            <h2>
              기존에 사용하시는 계정으로 <br />
              간단하게 회원가입 하세요.
            </h2>
            <S.StyledX
              onClick={closeModal}
              src={require('../../../assets/MyPage/x.png')}
              alt="X"
            />
            <S.StyledLoginDiv>
              <S.StyledLoginGoogleButton onClick={onClickGoogleLogin}>
                <S.StyledLoginGoogle>
                  <S.StyledLoginGoogleImg
                    src={require('../../../assets/MyPage/google.png')}
                    alt=""
                  />
                  <S.StyledLoginTextDiv>
                    <S.StyledLoginText>Google 로그인</S.StyledLoginText>
                  </S.StyledLoginTextDiv>
                </S.StyledLoginGoogle>
              </S.StyledLoginGoogleButton>
              <S.StyledLoginGithubButton onClick={onClickGithubLogin}>
                <S.StyledLoginGithub>
                  <S.StyledLoginGithubImg
                    src={require('../../../assets/MyPage/github.png')}
                    alt=""
                  />
                  <S.StyledLoginGithubTextDiv>
                    <S.StyledLoginGithubText>
                      Github 로그인
                    </S.StyledLoginGithubText>
                  </S.StyledLoginGithubTextDiv>
                </S.StyledLoginGithub>
              </S.StyledLoginGithubButton>
            </S.StyledLoginDiv>
          </S.StyledLoginModalDiv>
        )}
        {pageNumber === 2 && (
          <S.StyledLoginModalDiv>
            <h1>로그인이 완료되었습니다.</h1>
            <S.StyledX
              onClick={closeModal}
              src={require('../../../assets/MyPage/x.png')}
              alt="X"
            />
            <S.StyledButtonButton
              onClick={() => {
                setPageNumber(0);
                setLoginModalOpen(false);
                navigate('/');
              }}
            >
              확인
            </S.StyledButtonButton>
          </S.StyledLoginModalDiv>
        )}
      </S.StyledLoginModalBackground>
    </div>
  );
};

export default LoginModal;
