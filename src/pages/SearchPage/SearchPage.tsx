import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getChargerinfo } from '../../common/api';
import { szcode, szscode } from '../../common/zcode';
import { Container, Table, MainTitle, TableHead, TableBody } from './style';
import { Item } from '../../types/MapInterface';

export const SearchPage = () => {
  const result = useSelector((state: any) => state.search);
  const [page, setPage] = useState(0);
  const { data } = useQuery('station', () =>
    getChargerinfo(result.zcode, result.zscode),
  );

  const searchResult = data?.data.items[0].item
    .filter((stat: Item, idx: number, arr: Item[]) => {
      return arr.findIndex((item: Item) => item.statId === stat.statId) === idx;
    })
    .slice(10 * page, 10 * (page + 1));

  return (
    <Container>
      <MainTitle>
        {`${szcode[result.zcode]} ${szscode[result.zscode]} 검색결과`}
      </MainTitle>

      <Table>
        <TableHead>
          <div style={{ width: '10%', textAlign: 'center' }}>번호</div>
          <div style={{ width: '60%' }}>충전소명</div>
          <div style={{ width: '30%', textAlign: 'center' }}>충전소정보</div>
        </TableHead>
        {searchResult?.map((v: any, i: number) => {
          const test = data?.data.items[0].item.filter(
            (a: any) => a.statId === v.statId,
          );
          const test1 = data?.data.items[0].item.filter(
            (a: any) => a.statId === v.statId && a.stat === '2',
          );
          console.log(test1.length);

          return (
            <TableBody>
              <div style={{ width: '10%', textAlign: 'center' }}>
                {10 * page + i + 1}
              </div>
              <div style={{ width: '60%' }}>
                <div style={{ paddingBottom: 5 }}>{v.statNm}</div>
                <div style={{ color: 'gray' }}>{v.addr}</div>
              </div>
              <div style={{ width: '30%', textAlign: 'center' }}>
                <div style={{ color: 'gray', paddingBottom: 5 }}>
                  전체 충전기:{test.length}
                </div>
                <div style={{ color: 'blue' }}> 사용가능:{test1.length}</div>
              </div>
            </TableBody>
          );
        })}
      </Table>
      {page > 0 && <button onClick={() => setPage(page - 1)}>이전</button>}
      <div>{page + 1}</div>
      {page < searchResult.length && (
        <button onClick={() => setPage(page + 1)}>다음</button>
      )}
    </Container>
  );
};
