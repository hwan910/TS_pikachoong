import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <Loading>
      <Img src={require('../assets/pngwing.com.png')} />
    </Loading>
  );
};

export default Loader;

const Loading = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;

const rotate = keyframes`
0%{
    transform: rotate(0deg);
}
100%{
    transform: rotate(360deg);
}
`;

const Img = styled.img`
  width: 7%;
  animation: ${rotate} 1.5s linear infinite;
`;
