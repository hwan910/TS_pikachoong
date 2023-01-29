import { auth, providerGithub } from '../../../common/firebase';
import { provider } from '../../../common/firebase';
import { signInWithPopup, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StyledLoginModalBackground,
  StyledLoginModalDiv,
  StyledX,
  StyledLoginDiv,
  StyledLoginGoogleButton,
  StyledLoginGoogle,
  StyledLoginGoogleImg,
  StyledLoginTextDiv,
  StyledLoginText,
  StyledLoginGithubButton,
  StyledLoginGithub,
  StyledLoginGithubImg,
  StyledLoginGithubTextDiv,
  StyledLoginGithubText,
  StyledNicknameInput,
  StyledButtonButton,
} from '../../../pages/MyPage/style';

interface Props {
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ setLoginModalOpen }: Props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const closeModal = () => {
    setLoginModalOpen(false);
    setPageNumber(0);
  };
  const userProfile: any = auth.currentUser;

  // 구글 로그인
  const onClickGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setPageNumber(2);
      })
      .catch((error) => {
        alert('로그인이 실패 하였습니다.');
      });
  };

  // 깃허브 로그인
  const onClickGithubLogin = () => {
    signInWithPopup(auth, providerGithub)
      .then((result) => {
        setPageNumber(2);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // 사용자 프로필 업데이트
  const nicknameHandler = () => {
    updateProfile(userProfile, {
      displayName: nickname,
    })
      .then(() => {
        alert('변경완료');
        setPageNumber(2);
      })
      .catch((e) => console.log('e:', e));
  };

  return (
    <div>
      <StyledLoginModalBackground>
        {pageNumber === 0 && (
          <StyledLoginModalDiv>
            <h2>
              기존에 사용하시는 계정으로 <br />
              간단하게 회원가입 하세요.
            </h2>
            <StyledX
              onClick={closeModal}
              src={require('../../../assets/MyPage/x.png')}
              alt="X"
            />
            <StyledLoginDiv>
              <StyledLoginGoogleButton onClick={onClickGoogleLogin}>
                <StyledLoginGoogle>
                  <StyledLoginGoogleImg
                    src={require('../../../assets/MyPage/google.png')}
                    alt=""
                  />
                  <StyledLoginTextDiv>
                    <StyledLoginText>Google 로그인</StyledLoginText>
                  </StyledLoginTextDiv>
                </StyledLoginGoogle>
              </StyledLoginGoogleButton>
              <StyledLoginGithubButton onClick={onClickGithubLogin}>
                <StyledLoginGithub>
                  <StyledLoginGithubImg
                    src={require('../../../assets/MyPage/github.png')}
                    alt=""
                  />
                  <StyledLoginGithubTextDiv>
                    <StyledLoginGithubText>Github 로그인</StyledLoginGithubText>
                  </StyledLoginGithubTextDiv>
                </StyledLoginGithub>
              </StyledLoginGithubButton>
            </StyledLoginDiv>
          </StyledLoginModalDiv>
        )}
        {pageNumber === 1 && (
          <StyledLoginModalDiv>
            <h1>닉네임을 입력해주세요.</h1>
            <StyledX
              onClick={closeModal}
              src={require('../../../assets/MyPage/x.png')}
              alt="X"
            />
            <StyledNicknameInput
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
                console.log(nickname);
              }}
              type="text"
            />
            <StyledButtonButton onClick={nicknameHandler}>
              확인
            </StyledButtonButton>
          </StyledLoginModalDiv>
        )}
        {pageNumber === 2 && (
          <StyledLoginModalDiv>
            <h1>로그인이 완료되었습니다.</h1>
            <StyledX
              onClick={closeModal}
              src={require('../../../assets/MyPage/x.png')}
              alt="X"
            />
            <StyledButtonButton
              onClick={() => {
                setPageNumber(0);
                setLoginModalOpen(false);
                navigate('/');
              }}
            >
              확인
            </StyledButtonButton>
          </StyledLoginModalDiv>
        )}
      </StyledLoginModalBackground>
    </div>
  );
};

export default LoginModal;
