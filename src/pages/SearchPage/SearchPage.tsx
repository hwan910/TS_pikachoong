import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { getChargerinfo } from '../../common/api';
import { szcode, szscode } from '../../common/zcode';
import { Container, Table, MainTitle, TableHead, TableBody } from './style';
import { Item } from '../../types/MapInterface';
import { PageBtnBox } from '../../shared/Layout/Header/style';
import { useNavigate, useParams } from 'react-router-dom';

export const SearchPage = () => {
  const navigate = useNavigate();
  const result = useSelector((state: any) => state.search);
  const queryClient = useQueryClient();
  const [pageNum, setPageNum] = useState<any>();

  const { z2 }: any = useParams();
  const [page, setPage] = useState(0);
  const { data, isLoading, refetch } = useQuery('station', () =>
    getChargerinfo(z2?.slice(0, 2), z2),
  );

  useEffect(() => {
    queryClient.removeQueries('station');
    refetch();
    setPage(0);
    pageNumMaker();
  }, [z2]);

  const searchResult = data?.data.items[0].item
    .filter((stat: Item, idx: number, arr: Item[]) => {
      return arr.findIndex((item: Item) => item.statId === stat.statId) === idx;
    })
    .slice(10 * page, 10 * (page + 1));

  const pageResult = data?.data.items[0].item.filter(
    (stat: Item, idx: number, arr: Item[]) => {
      return arr.findIndex((item: Item) => item.statId === stat.statId) === idx;
    },
  );

  const pageNumMaker = () => {
    const pageNum = [];
    for (let i = 5; i < pageResult?.length / 10 + 1; i += 5) {
      const a = [];
      if (i > pageResult?.length / 10 + 1) i = pageResult?.length / 10 + 1;
      for (let j = 1; j <= i / 10 + 1; j++) {
        a.push(j);
      }
      pageNum.push(a);
    }
    console.log(pageNum);
    return setPageNum(pageNum);
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <Container>
      <MainTitle>
        {`${
          szcode[typeof z2?.slice(0, 2) === 'string' ? z2?.slice(0, 2) : '11']
        } ${szscode[typeof z2 === 'string' ? z2 : '11680']} 검색결과`}
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

          return (
            <TableBody
              onClick={() =>
                navigate(`/${v.statId}`, {
                  state: data?.data.items[0].item.filter(
                    (y: any) => y.statId === v.statId,
                  ),
                })
              }
              key={v.statId}
            >
              <div style={{ width: '10%', textAlign: 'center' }}>
                {10 * page + i + 1}
              </div>
              <div style={{ width: '60%' }}>
                <div style={{ paddingBottom: 5 }}>{v.statNm}</div>
                <div
                  style={{
                    color: 'gray',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {v.addr}
                </div>
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
      <PageBtnBox>
        <button
          disabled={page === 0 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          이전
        </button>
        <div>
          {pageNum.map((v: any, i: any) => {
            return <button>{i - 1}</button>;
          })}
        </div>

        <button
          disabled={page === Math.floor(pageResult?.length / 10) ? true : false}
          onClick={() => setPage(page + 1)}
        >
          다음
        </button>
      </PageBtnBox>
    </Container>
  );
};
