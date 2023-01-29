import styled from 'styled-components';
import { auth, storage } from '../../common/firebase';
import { updateProfile, User } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { isLogin } from '../../redux/modules/loginSlice';
import useInput from '../../hooks/useInput';
import useImgInput from '../../hooks/useImgInput';
import { COLOR } from '../../common/color';
import { useRef, useState } from 'react';

interface Props {
  setProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModal = ({ setProfileModalOpen }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.user);
  const [nickname, nicknameHandler, nicknameReset] = useInput(user.displayName);
  const [photoURL, miribogi, resetImg] = useImgInput(user.photoURL);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    resetImg();
    nicknameReset();
  };

  // 모달창 종료
  const closeModal = () => {
    reset();
    setProfileModalOpen(false);
  };

  // 프로필 변경
  const userProfile = auth.currentUser;

  const uploadImg = async () => {
    const imgRef = ref(storage, `profile/${uuidv4()}`);
    if (photoURL) {
      const response = await uploadString(imgRef, photoURL, 'data_url');
      const downloadURL = await getDownloadURL(response.ref);
      return downloadURL;
    }
  };

  const changeProfile = (x: string = photoURL) => {
    if (inputRef.current !== null) {
      inputRef.current?.focus();
    }
    // 유효성 검사
    if (nickname === '') {
      alert('닉네임이 비어있습니다.');
    } else {
      if (nickname.length < 8) {
        setProfileModalOpen(false);
        if (userProfile) {
          updateProfile(userProfile, {
            displayName: nickname,
            photoURL: x,
          })
            .then(() => {
              alert('변경완료!');
              closeModal();
            })
            .catch((e) => console.log('e:', e));
        }
        dispatch(isLogin({ ...user, displayName: nickname, photoURL: x }));
      } else {
        alert('글자 수 7자를 초과하였습니다.');
        // nicknameReset();
      }
    }
  };

  const submitChange = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (photoURL === userProfile?.photoURL) {
      changeProfile();
    } else {
      uploadImg()
        .then((res) => {
          changeProfile(res);
        })
        .catch((e) => console.log('e:', e));
    }
  };

  return (
    <StyledProfileModalBackground>
      <StyledProfileModalDiv>
        <StyledH2>프로필 수정</StyledH2>
        <StyledImageLabel>
          <StyledProfileDiv>
            <StyledImg src={photoURL} alt="프로필 사진" />
            <StyledImageUploader
              type="file"
              accept="image/*"
              onChange={(e) => miribogi(e)}
              id="img"
            />
            <CameraDiv>
              <Camera
                src={require('../../assets/MyPage/camera.png')}
                alt="카메라"
              />
            </CameraDiv>
          </StyledProfileDiv>
        </StyledImageLabel>
        <StyledX
          onClick={() => closeModal()}
          src={require('../../assets/x.png')}
          alt="X"
        />
        <StyledInput
          value={nickname}
          ref={inputRef}
          maxLength={8}
          autoFocus
          onChange={(e) => {
            nicknameHandler(e);
          }}
          type="text"
        />
        <StyledButtonChange onClick={(e) => submitChange(e)}>
          수정완료
        </StyledButtonChange>
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
  z-index: 999;
`;

const StyledProfileModalDiv = styled.div`
  background-color: #fad61d;
  width: 30rem;
  height: 30rem;
  padding: 2rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  @media screen and (max-width: 768px) {
    width: 25rem;
    height: 28rem;
  }
`;

const StyledH2 = styled.h2`
  position: absolute;
  top: 0.7rem;
`;

const StyledProfileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledImg = styled.img`
  /* border: 1px solid black; */
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* border: 1px solid lightgray; */
  background-color: white;

  /* margin-top: 3rem; */
`;

const StyledImageLabel = styled.label`
  cursor: pointer;
  position: relative;
  width: 13rem;
  height: 13rem;
`;

const CameraDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const Camera = styled.img`
  /* border: 1px solid black; */
  background-color: #f1f1f1;
  border-radius: 50%;
  padding: 5px;
  margin: 10px;
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

const StyledInput = styled.input`
  margin: 0.7rem 0;
  padding: 0.5rem 0.5rem;
  text-align: center;
  font-size: large;
  border: none;
  outline: none;
  margin-top: 2rem;
  border-radius: 3rem;
`;

const StyledButtonChange = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: black;
  :hover {
    background-color: ${COLOR.RED};
  }
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  margin-top: 1rem;
  font-size: medium;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: white;
`;
