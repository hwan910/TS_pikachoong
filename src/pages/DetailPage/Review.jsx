import React, { useState, useEffect } from 'react';
import {
  ReviewBox,
  ProfileImg,
  OptionModal,
  EditBtn,
  DeleteBtn,
} from './style';
import { SlOptions } from 'react-icons/sl';

export const Review = () => {
  // 리뷰 수정 삭제 모달
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}
    >
      <ReviewBox>
        <div style={{ display: 'flex' }}>
          <ProfileImg />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div>닉네임</div>
            <div>⭐⭐⭐⭐⭐ | {} 날짜</div>
            <div>나중에 input으로 바꾸고 리뷰내용 넣기</div>
          </div>
        </div>
        {/* 리뷰 수정삭제 모달 버튼 */}
        <SlOptions onClick={handleModalOpen} style={{ cursor: 'pointer' }} />
      </ReviewBox>
      {/* 리뷰 수정삭제 모달 */}
      {modalOpen && (
        <OptionModal setModalOpen={setModalOpen} onClick={handleModalClose}>
          <EditBtn>수정</EditBtn>
          <DeleteBtn>삭제</DeleteBtn>
        </OptionModal>
      )}
    </div>
  );
};
