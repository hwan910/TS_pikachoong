import { auth, storage } from '../../common/firebase';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { isLogin } from '../../redux/modules/loginSlice';
import useInput from '../../hooks/useInput';
import useImgInput from '../../hooks/useImgInput';
import { useRef } from 'react';
import * as S from '../../pages/MyPage/style';

interface Props {
  setProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModal = ({ setProfileModalOpen }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.user);
  const inputRef = useRef<HTMLInputElement>(null);
  // 커스텀 훅
  const [nickname, nicknameHandler, nicknameReset] = useInput(user.displayName);
  const [photoURL, miribogi, resetImg] = useImgInput(user.photoURL);

  // 리셋
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

  // 이미지 업로드
  const uploadImg = async () => {
    try {
      const imgRef = ref(storage, `profile/${uuidv4()}`);
      if (photoURL) {
        const response = await uploadString(imgRef, photoURL, 'data_url');
        const downloadURL = await getDownloadURL(response.ref);
        return downloadURL;
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  // 프로필 변경
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
            .catch((error) => console.log('error:', error));
        }
        dispatch(isLogin({ ...user, displayName: nickname, photoURL: x }));
      } else {
        alert('글자 수 7자를 초과하였습니다.');
      }
    }
  };

  // 프로필 변경
  const submitChange = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (photoURL === userProfile?.photoURL) {
      changeProfile();
    } else {
      uploadImg()
        .then((res) => {
          changeProfile(res);
        })
        .catch((error) => console.log('error:', error));
    }
  };

  return (
    <S.StyledProfileModalBackground>
      <S.StyledProfileModalDiv>
        <S.StyledH2>프로필 수정</S.StyledH2>
        <S.StyledImageLabel>
          <S.StyledProfileDivDiv>
            <S.StyledImage src={photoURL} alt="프로필 사진" />
            <S.StyledImageUploader
              type="file"
              accept="image/*"
              onChange={(e) => miribogi(e)}
              id="img"
            />
            <S.CameraDiv>
              <S.Camera
                src={require('../../assets/MyPage/camera.png')}
                alt="카메라"
              />
            </S.CameraDiv>
          </S.StyledProfileDivDiv>
        </S.StyledImageLabel>
        <S.StyledX
          onClick={() => closeModal()}
          src={require('../../assets/MyPage/x.png')}
          alt="X"
        />
        <S.StyledInput
          value={nickname}
          ref={inputRef}
          maxLength={8}
          autoFocus
          onChange={(e) => {
            nicknameHandler(e);
          }}
          type="text"
        />
        <S.StyledButtonChange onClick={(e) => submitChange(e)}>
          수정완료
        </S.StyledButtonChange>
      </S.StyledProfileModalDiv>
    </S.StyledProfileModalBackground>
  );
};

export default ProfileModal;
