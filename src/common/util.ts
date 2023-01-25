// 로그인, 회원가입 유효성 검증
export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// 사용할 컴포넌트에서 postTime import 하고 사용
// const dateString  = postTime();
export const postTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const dateString = year + month + day + hours + minutes + seconds;
  return dateString;
};
// 20230109171500 -> 2023/01/09로 전환
// 사용 예시 <Date>{getDate(comment.date)}</Date>
export const getDate = (date: string) => {
  return `${date?.slice(2, 4)}.${date?.slice(4, 6)}.${date?.slice(6, 8)}`;
};
