import styled from 'styled-components';

export const StyledHeader = styled.div`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid rgb(204, 204, 204);
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background-color: white;
`;

export const HeaderContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 13px;
`;

export const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`;

export const HeaderBtnBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeaderBtn = styled.div`
  padding: 10px 15px;
  cursor: pointer;
`;
