import styled from 'styled-components';
import { COLOR } from '../../common/color';

export const Container = styled.section`
  width: 85%;
  max-width: 900px;
`;
export const MainTitle = styled.div`
  border-bottom: 3px solid ${COLOR.YELLOW};
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

export const Table = styled.article``;

export const TableHead = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  font-weight: 700;
`;
export const TableBody = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  align-items: center;
  border-bottom: 1px dotted lightgray;
  margin-bottom: 3px;
`;
