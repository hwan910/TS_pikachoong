import { useState } from 'react';
import MainItem from './MainItem';
import { Item, MarkerLocation } from '../../types/MapInterface';
import {
  NearbyChargingStationWrap,
  NearbyChargingStationTitleWrap,
  NearbyChargingStationTitle,
  NearbyChargingStationCardWrap,
} from '../../pages/MainPage/style';

interface Props {
  filterData: Item[];
  markerLocation: MarkerLocation[];
}

export default function Main({ filterData, markerLocation }: Props) {
  const [data, setData] = useState(filterData);
  const [newMarkerLocation, setNewMarkerLocation] = useState(markerLocation);
  let newData = Array.from(new Set(data));

  return (
    <NearbyChargingStationWrap>
      <NearbyChargingStationTitleWrap>
        <NearbyChargingStationTitle>피카츙</NearbyChargingStationTitle>
      </NearbyChargingStationTitleWrap>
      <NearbyChargingStationCardWrap>
        {newData.map((item: Item) => {
          return (
            <MainItem
              data={data}
              item={item}
              key={item.statId}
              newMarkerLocation={newMarkerLocation}
            />
          );
        })}
      </NearbyChargingStationCardWrap>
    </NearbyChargingStationWrap>
  );
}
