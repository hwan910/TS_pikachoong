import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getChargerinfo } from '../../common/api';
import { szcode, szscode } from '../../common/zcode';
import * as S from './style';
import { Item } from '../../types/MapInterface';
import { PageBtnBox } from '../../shared/Layout/Header/style';
import { useNavigate, useParams } from 'react-router-dom';
import PageNation from '../../components/Search/PageNation';
import Loader from '../../components/Loader';

export const SearchPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [i, setI] = useState(0);
  const { z2 } = useParams();
  const [page, setPage] = useState(0);
  const { data, isLoading, refetch } = useQuery('station', () =>
    getChargerinfo(z2?.slice(0, 2), z2),
  );

  useEffect(() => {
    queryClient.removeQueries('station');
    refetch();
    setPage(0);
    setI(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [z2]);

  if (isLoading) return <Loader />

  //  statId가 같은 값들을 중복제거 함
  const pageResult = data?.data.items[0].item.filter(
    (stat: Item, idx: number, arr: Item[]) => {
      return arr.findIndex((item: Item) => item.statId === stat.statId) === idx;
    },
  );
  const searchResult = pageResult.slice(10 * page, 10 * (page + 1));

  const pageNum = pageResult.map((x: string, i: number) => i + 1);

  // 페이지 번호를 5개씩 노출되게 함
  const allpage =
    Math.ceil(pageNum.length / 10) > 5 * (i + 1)
      ? pageNum.slice(5 * i, 5 * (i + 1))
      : pageNum.slice(5 * i, Math.ceil(pageNum.length / 10));

  return (
    <S.Container>
      <S.MainTitle>
        {`${
          szcode[typeof z2?.slice(0, 2) === 'string' ? z2?.slice(0, 2) : '11']
        } ${szscode[typeof z2 === 'string' ? z2 : '11680']} 검색결과`}
      </S.MainTitle>

      <S.Table>
        <S.TableHead>
          <div style={{ width: '10%', textAlign: 'center' }}>번호</div>
          <div style={{ width: '60%' }}>충전소명</div>
          <div style={{ width: '30%', textAlign: 'center' }}>충전소정보</div>
        </S.TableHead>
        {searchResult?.map((v: Item, i: number) => {
          const station = data?.data.items[0].item.filter(
            (a: Item) => a.statId === v.statId,
          );
          const stationAvailable = data?.data.items[0].item.filter(
            (a: Item) => a.statId === v.statId && a.stat === '2',
          );

          return (
            <S.TableBody
              onClick={() =>
                navigate(`/${v.statId}`, {
                  state: data?.data.items[0].item.filter(
                    (y: Item) => y.statId === v.statId,
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
                  전체 충전기:{station.length}
                </div>
                <div
                  style={{
                    color: stationAvailable.length === 0 ? 'red' : 'blue',
                  }}
                >
                  사용가능:{stationAvailable.length}
                </div>
              </div>
            </S.TableBody>
          );
        })}
      </S.Table>
      <PageBtnBox>
        <S.PageBtn
          disabled={page === 0 ? true : false}
          onClick={() => {
            setPage(page - 1);
            if (page % 5 === 0) setI(i - 1);
          }}
        >
          &lt; 이전
        </S.PageBtn>
        <PageNation allpage={allpage} setPage={setPage} page={page} />
        <S.PageBtn
          disabled={page === Math.floor(pageResult?.length / 10) ? true : false}
          onClick={() => {
            setPage(page + 1);
            if ((page + 1) % 5 === 0) setI(i + 1);
          }}
        >
          다음 &gt;
        </S.PageBtn>
      </PageBtnBox>
    </S.Container>
  );
};
