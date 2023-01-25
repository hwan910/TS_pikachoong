import React from 'react';
import { getChargerinfo } from '../../common/api';
import { Container, Table, MainTitle, TableHead, TableBody } from './style';

export const SearchPage = () => {
  return (
    <Container>
      <MainTitle>신사동 검색결과</MainTitle>
      <Table>
        <TableHead>
          <div style={{ width: '10%', textAlign: 'center' }}>번호</div>
          <div style={{ width: '60%' }}>충전소명</div>
          <div style={{ width: '30%', textAlign: 'center' }}>충전소정보</div>
        </TableHead>
        <TableBody>
          <div style={{ width: '10%', textAlign: 'center' }}>1</div>
          <div style={{ width: '60%' }}>
            <div style={{ paddingBottom: 5 }}>강남구_신사동주민센터</div>
            <div style={{ color: 'gray' }}>서울특별시 강남구 신사동</div>
          </div>
          <div style={{ width: '30%', textAlign: 'center' }}>
            <div style={{ color: 'gray', paddingBottom: 5 }}>
              전체 충전기:1대
            </div>
            <div style={{ color: 'blue' }}>사용가능:1대</div>
          </div>
        </TableBody>
        <TableBody>
          <div style={{ width: '10%', textAlign: 'center' }}>1</div>
          <div style={{ width: '60%' }}>
            <div style={{ paddingBottom: 5 }}>강남구_신사동주민센터</div>
            <div style={{ color: 'gray' }}>서울특별시 강남구 신사동</div>
          </div>
          <div style={{ width: '30%', textAlign: 'center' }}>
            <div style={{ color: 'gray', paddingBottom: 5 }}>
              전체 충전기:1대
            </div>
            <div style={{ color: 'blue' }}>사용가능:1대</div>
          </div>
        </TableBody>
        <TableBody>
          <div style={{ width: '10%', textAlign: 'center' }}>1</div>
          <div style={{ width: '60%' }}>
            <div style={{ paddingBottom: 5 }}>강남구_신사동주민센터</div>
            <div style={{ color: 'gray' }}>서울특별시 강남구 신사동</div>
          </div>
          <div style={{ width: '30%', textAlign: 'center' }}>
            <div style={{ color: 'gray', paddingBottom: 5 }}>
              전체 충전기:1대
            </div>
            <div style={{ color: 'blue' }}>사용가능:1대</div>
          </div>
        </TableBody>
        <TableBody>
          <div style={{ width: '10%', textAlign: 'center' }}>1</div>
          <div style={{ width: '60%' }}>
            <div style={{ paddingBottom: 5 }}>강남구_신사동주민센터</div>
            <div style={{ color: 'gray' }}>서울특별시 강남구 신사동</div>
          </div>
          <div style={{ width: '30%', textAlign: 'center' }}>
            <div style={{ color: 'gray', paddingBottom: 5 }}>
              전체 충전기:1대
            </div>
            <div style={{ color: 'blue' }}>사용가능:1대</div>
          </div>
        </TableBody>
        <TableBody>
          <div style={{ width: '10%', textAlign: 'center' }}>1</div>
          <div style={{ width: '60%' }}>
            <div style={{ paddingBottom: 5 }}>강남구_신사동주민센터</div>
            <div style={{ color: 'gray' }}>서울특별시 강남구 신사동</div>
          </div>
          <div style={{ width: '30%', textAlign: 'center' }}>
            <div style={{ color: 'gray', paddingBottom: 5 }}>
              전체 충전기:1대
            </div>
            <div style={{ color: 'blue' }}>사용가능:1대</div>
          </div>
        </TableBody>
      </Table>
    </Container>
  );
};
