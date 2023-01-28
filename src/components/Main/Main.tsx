import { useState } from 'react';
import MainItem from './MainItem';
import { Item } from '../../types/MapInterface';
import {
  NearbyChargingStationWrap,
  NearbyChargingStationTitleWrap,
  NearbyChargingStationTitle,
  NearbyChargingStationCardWrap,
} from '../../pages/MainPage/style';

interface Props {
  filterData: Item[];
}

export default function Main({ filterData }: Props) {
  const [data, setData] = useState(filterData);

  let newData = Array.from(new Set(data)).sort(
    (a: Item, b: Item) => Number(a.dist) - Number(b.dist),
  );

  return (
    <NearbyChargingStationWrap>
      <NearbyChargingStationTitleWrap>
        <NearbyChargingStationTitle>피카츙</NearbyChargingStationTitle>
      </NearbyChargingStationTitleWrap>
      <NearbyChargingStationCardWrap>
        {newData.map((item: Item) => {
          return <MainItem data={data} item={item} key={item.statId} />;
        })}
      </NearbyChargingStationCardWrap>
    </NearbyChargingStationWrap>
  );
}
