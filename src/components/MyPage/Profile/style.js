import styled from 'styled-components';

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
  height: 13rem;
  object-fit: contain;
  @media screen and (max-width: 768px) {
    width: 8rem;
    height: 8rem;
  }
`;

const StyledTextDiv = styled.div`
  text-align: center;
`;

export { StyledProfileDiv, StyledImg, StyledTextDiv };
