import { useState } from 'react';
import * as S from './style';
import Button from '../../components/MyPage/Button';
import MyReview from '../../components/MyPage/MyReview';
import ProfileModal from '../../components/MyPage/ProfileModal';
import ProfileTap from '../../components/MyPage/ProfileTap';

export const Mypage = () => {
  // 모달창 노출 여부 state
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // 모달창 노출
  const showProfileModal = () => {
    setProfileModalOpen(true);
  };

  return (
    <S.StyledMyPage>
      <S.StyledMyProfile>
        <ProfileTap />
        <Button onClick={showProfileModal}>프로필 수정</Button>
        {profileModalOpen && (
          <ProfileModal setProfileModalOpen={setProfileModalOpen} />
        )}
      </S.StyledMyProfile>
      <S.StyledMyreviewCon>
        <S.StyledH1>My Review</S.StyledH1>
        <S.StyledMyReviewContainer>
          <MyReview />
        </S.StyledMyReviewContainer>
      </S.StyledMyreviewCon>
    </S.StyledMyPage>
  );
};
