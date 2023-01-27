import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, storage } from '../common/firebase';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { isLogin } from '../redux/modules/loginSlice';

interface Props {
  setProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModal = ({ setProfileModalOpen }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.user);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [nickname, setNickname] = useState(user.displayName);
  const userProfile: any = auth.currentUser;

  const miribogi = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotoURL(reader.result);
        }
      };
    }
  };

  const uploadImg = async () => {
    const imgRef = ref(storage, `profile/${uuidv4()}`);
    if (photoURL) {
      const response = await uploadString(imgRef, photoURL, 'data_url');
      const downloadURL = await getDownloadURL(response.ref);
      return downloadURL;
    }
  };

  const clickX = () => {
    setPhotoURL('');
    setNickname('');
    setProfileModalOpen(false);
  };

  // 모달 끄기
  const closeModal = () => {
    uploadImg()
      .then((res) => {
        dispatch(isLogin({ ...user, displayName: nickname, photoURL: res }));
        updateProfile(userProfile, {
          displayName: nickname,
          photoURL: res,
        }).then(() => {
          alert('변경완료!');
          setPhotoURL('');
          setNickname('');
          setProfileModalOpen(false);
        });
      })
      .catch((e) => console.log('e:', e));
  };

  // 사용자 프로필 업데이트
  const nicknameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  return (
    <StyledProfileModalBackground>
      <StyledProfileModalDiv>
        <StyledH2>프로필 수정</StyledH2>
        <StyledProfileDiv>
          <StyledImg src={photoURL} alt="프로필 사진" />
          <StyledTextDiv></StyledTextDiv>
        </StyledProfileDiv>
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => miribogi(e)}
            id="img"
            style={{ display: 'none' }}
          />
        </label>
        <StyledX
          onClick={() => clickX()}
          src={require('../assets/x.png')}
          alt="X"
        />
        <StyledInput
          value={nickname}
          onChange={(e) => {
            nicknameHandler(e);
          }}
          type="text"
        />
        <StyledButtonChange onClick={closeModal}>수정완료</StyledButtonChange>
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
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
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
  margin-top: 3rem;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  width: 13rem;
  /* margin-top: 3rem; */
`;

const StyledTextDiv = styled.div`
  text-align: center;
`;

const StyledBackground = styled.div`
  position: absolute;
  top: 14rem;
  left: 19rem;
  background-color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const StyledImageLabel = styled.label`
  cursor: pointer;
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
  background-color: rgb(250, 214, 29);
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  margin-top: 1rem;
  font-size: medium;
  margin-bottom: 0.7rem;
`;
