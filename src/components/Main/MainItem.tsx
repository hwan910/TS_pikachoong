import { useNavigate } from 'react-router-dom';
import { Item } from '../../types/MapInterface';
import {
  NearbyChargingStationCard,
  NearbyChargingStationCardTextWrap,
  NearbyChargingStationCardTitle,
  NearbyChargingStationCardContent,
} from '../../pages/MainPage/style';

interface Props {
  item: Item;
  data: Item[];
}

export default function MainItem({ item, data }: Props) {
  const navigate = useNavigate();

  // 충전기 전체 개수와 사용가능한 개수를 나타내기 위한 필터링
  const allCharge = data?.filter((x: Item) => x.statId === item.statId).length;
  const okCharge = data?.filter(
    (x: Item) => x.statId === item.statId && x.stat === '2',
  ).length;

  return (
    // 클릭하면 디테일 페이지로 이동
    <NearbyChargingStationCard
      onClick={() => {
        navigate(`${item.statId}`, {
          state: data?.filter((y) => y.statId === item.statId),
        });
      }}
    >
      <NearbyChargingStationCardTextWrap>
        <NearbyChargingStationCardTitle>
          {item.statNm}
        </NearbyChargingStationCardTitle>
      </NearbyChargingStationCardTextWrap>
      <NearbyChargingStationCardTextWrap>
        <NearbyChargingStationCardContent>
          {item.addr} / {Math.floor(Number(item.dist)) + 'm'}
        </NearbyChargingStationCardContent>
        <NearbyChargingStationCardContent>
          전체 충전기 : {allCharge} / 충전 가능 :{' '}
          {okCharge > 0 ? `${okCharge}` : 0}
        </NearbyChargingStationCardContent>
      </NearbyChargingStationCardTextWrap>
    </NearbyChargingStationCard>
  );
}
