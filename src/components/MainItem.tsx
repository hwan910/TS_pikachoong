import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Item, MarkerLocation } from '../types/MapInterface';

interface Props {
  item: Item;
  data: Item[];
  newMarkerLocation: MarkerLocation[];
}

export default function MainItem({ item, data, newMarkerLocation }: Props) {
  const navigate = useNavigate();

  const allCharge = data?.filter((x: any) => x.statId === item.statId).length;
  const okCharge = data?.filter(
    (x: any) => x.statId === item.statId && x.stat === '2',
  ).length;

  const newData = newMarkerLocation.map((x: any) => {
    if (
      Number(item.lat).toFixed(10) === x.Ma.toFixed(10) &&
      Number(item.lng).toFixed(10) === x.La.toFixed(10)
    ) {
      return x.dist;
    }
  });

  let distArr = Array.from(new Set(newData)).filter((x: any) => !!x);

  return (
    <NearbyChargingStationCard
      onClick={() => {
        navigate(`${item.statId}`, {
          state: data?.filter((y: any) => y.statId === item.statId),
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
          {item.addr} / {Math.floor(distArr[0]) + 'm'}
        </NearbyChargingStationCardContent>
        <NearbyChargingStationCardContent>
          전체 충전기 : {allCharge} / 충전 가능 :{' '}
          {okCharge > 0 ? `${okCharge}` : 0}
        </NearbyChargingStationCardContent>
      </NearbyChargingStationCardTextWrap>
    </NearbyChargingStationCard>
  );
}

const NearbyChargingStationCard = styled.div`
  min-width: 400px;
  border-radius: 10px;
  background-color: white;
  width: 35%;
  height: 50%;
  box-shadow: 2px 2px 8px rgba(101, 101, 101, 0.25);
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 20px;
  cursor: pointer;
  margin: 0 auto 0 0;
`;

const NearbyChargingStationCardTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const NearbyChargingStationCardTitle = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`;

const NearbyChargingStationCardContent = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 10px;
`;
