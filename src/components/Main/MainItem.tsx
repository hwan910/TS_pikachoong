import { useNavigate } from 'react-router-dom';
import { Item, MarkerLocation } from '../../types/MapInterface';
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

  const allCharge = data?.filter((x: Item) => x.statId === item.statId).length;
  const okCharge = data?.filter(
    (x: Item) => x.statId === item.statId && x.stat === '2',
  ).length;

  // const newData = newMarkerLocation.map((x: MarkerLocation) => {
  //   if (
  //     Number(item.lat).toFixed(10) === x.Ma.toFixed(10) &&
  //     Number(item.lng).toFixed(10) === x.La.toFixed(10)
  //   ) {
  //     return x.dist;
  //   } else return undefined;
  // });

  // let distArr: (number | undefined)[] = Array.from(new Set(newData)).filter(
  //   (x: number | undefined) => !!x,
  // );

  // item.dist = distArr[0];

  return (
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
