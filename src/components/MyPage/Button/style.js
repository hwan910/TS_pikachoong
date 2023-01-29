import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(250, 214, 29, 0.3);
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  position: relative;
  bottom: 5rem;
  @media screen and (max-width: 768px) {
    position: relative;
    bottom: 0rem;
  }
`;

export { StyledButton };
