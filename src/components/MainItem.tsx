import React from 'react';
import styled from 'styled-components';

interface Props {
  item: any;
  data: any;
}

export default function MainItem({ item, data }: Props) {
  return (
    <NearbyChargingStationCard key={item.statNm}>
      <NearbyChargingStationCardTextWrap>
        <NearbyChargingStationCardTitle>
          {item.statNm}
        </NearbyChargingStationCardTitle>
      </NearbyChargingStationCardTextWrap>
      <NearbyChargingStationCardTextWrap>
        <NearbyChargingStationCardContent>
          {item.addr}
        </NearbyChargingStationCardContent>
        <NearbyChargingStationCardContent>
          전체 충전기 :{' '}
          {data?.filter((x: any) => x.statId === item.statId).length} / 충전
          가능 :{' '}
          {data?.filter((x: any) => x.statId === item.statId && x.stat === '2')
            .length > 0
            ? `${
                data?.filter(
                  (x: any) => x.statId === item.statId && x.stat === '2',
                ).length
              } `
            : 0}
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
