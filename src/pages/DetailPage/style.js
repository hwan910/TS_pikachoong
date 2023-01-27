import styled from 'styled-components';
// import { COLOR } from '../../common/color';

// DetailPage.jsx

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 520px;
  height: 770px;
  margin-top: 40px;
  padding: 10px;

  overflow-y: auto;
  // -ms-overflow-style: none; /* 인터넷 익스플로러 */
  // scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    // 스크롤바 영역 설정
    /* 크롬, 사파리, 오페라, 엣지 */
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    // 스크롤바 막대 설정
    background-color: #fad61d;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    // 스크롤바 트랙 설정
  }
`;

export const DetailMapWrap = styled.div`
  margin: 40px;
`;

//좌측상단 info박스
export const ChargingStationInfo = styled.div`
  width: 430px;
  height: 405px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 8px lightgrey;
  padding: 30px;
  margin-bottom: 50px;
`;

export const ChargingStationName = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 64px;
`;

// 리뷰입력+리뷰리스트 전체
export const ReviewContainer = styled.div`
  padding: 0px 20px 0px 20px;
`;

//이용후기 타이틀
export const ReviewHeadTitle = styled.div`
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 25px;
`;

//이용후기 평점
export const ScoreAvg = styled.div`
  font-size: 17px;
`;

//리뷰쓰기 별점+리뷰창+버튼
export const ReviewInput = styled.div`
  margin-bottom: 40px;
`;

export const ReviewStarRating = styled.div``;
export const ReviewTextInput = styled.textarea`
  resize: none;
  margin-top: 10px;
  width: 350px;
  height: 47px;
  background-color: #e0e0e0;
  border-style: none;
  border-radius: 5px;
  padding: 10px;
`;

//등록버튼
export const ReviewBtn = styled.button`
  width: 60px;
  height: 40px;
  background-color: #fad61d;
  border-style: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const ReviewList = styled.div``;

//Review.jsx

//작성된 리뷰
export const ReviewDetail = styled.div`
  /* background-color: #e0e0e0; */
  display: flex;
  justify-content: space-between;
  padding: 30px 15px;
  width: 420px;
  border-top: solid 2px #e0e0e0;
`;

export const ReviewBox = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const ProfileImg = styled.img`
  background-color: grey;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 10px;
`;

//리뷰 수정삭제 모달
export const OptionModal = styled.div`
  width: 60px;
  /* background-color: lightgrey; */
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 410px;
  top: 55px;
  /* justify-content: space-evenly; */
`;

export const EditBtn = styled.button`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-style: none;
  width: 60px;
  padding: 7px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
export const DeleteBtn = styled.button`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-style: none;
  width: 60px;
  padding: 7px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const Rating = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

export const EditReviewTextInput = styled.textarea`
  width: 300px;
  height: 47px;
  resize: none;
  margin-right: 20px;
  background-color: #e0e0e0;
  border-style: none;
  border-radius: 5px;
`;

export const DeleteCheck = styled.div``;
