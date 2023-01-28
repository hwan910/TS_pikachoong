import styled from 'styled-components';
import { COLOR } from '../common/color';
import { useState } from 'react';
import MainItem from './MainItem';
import { Item, MarkerLocation } from '../types/MapInterface';

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

const NearbyChargingStationWrap = styled.div`
  width: 85%;
  height: 45vh;
  margin-bottom: 15%;
`;

const NearbyChargingStationTitleWrap = styled.div`
  width: auto;
  height: 60px;
  border-radius: 15px;
  background-color: ${COLOR.YELLOW};
  display: flex;
  align-items: center;
`;

const NearbyChargingStationTitle = styled.span`
  margin-left: 30px;
  font-size: 30px;
  font-weight: bold;
`;

const NearbyChargingStationCardWrap = styled.div`
  overflow: scroll;
  padding: 50px 0 20px 0;
  width: 80%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  gap: 50px 50px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
