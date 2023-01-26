import styled from 'styled-components';
import { COLOR } from '../../../common/color';

export const StyledHeader = styled.div`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid rgb(204, 204, 204);
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background-color: ${COLOR.YELLOW};
`;

export const HeaderContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 13px;
`;

export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Logo = styled.img`
  height: 50px;
`;
export const LogoText = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const SearchBox = styled.div`
  /* border-radius: 15px; */
  width: 40%;
  display: flex;
  justify-content: space-between;
  height: 30px;
  background-color: #ffffff;
  opacity: 0.8;
  border-radius: 25px;
`;

export const SearchInput = styled.input`
  all: unset;
  padding-left: 20px;
  font-size: 13px;
  width: 100%;
`;

export const SearchSelect = styled.div`
  width: 90%;
  min-width: 260px;
  display: flex;
  justify-content: space-evenly;
`;

export const SearchBtn = styled.button`
  all: unset;
  margin-top: -6px;
  margin-right: -10px;
  cursor: pointer;
`;

export const HeaderBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 5px;
`;

export const HeaderBtn = styled.div`
  font-size: 12px;
  width: 80px;
  margin-left: 10px;
  padding: 3px 0 3px 0;
  cursor: pointer;
  background-color: white;
  border-radius: 15px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 7px;
  }
`;
