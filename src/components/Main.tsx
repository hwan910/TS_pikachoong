import styled from 'styled-components';
import { COLOR } from '../common/color';
import { useState } from 'react';
import MainItem from './MainItem';

// interface LocationType {
//   latitude: number;
//   longitude: number;
// }

interface Props {
  filterData: any[];
  // {
  //   addr: string;
  //   bnm: string;
  //   busiCall: string;
  //   busiId: string;
  //   busiNm: string;
  //   chgerId: string;
  //   chgerType: string;
  //   delDetail: string;
  //   delYn: string;
  //   kind: string;
  //   kindDetail: string;
  //   lastTedt: string;
  //   lastTsdt: string;
  //   lat: string;
  //   limitDetail: string;
  //   limitYn: string;
  //   lng: string;
  //   location: string;
  //   method: string;
  //   note: string;
  //   nowTsdt: string;
  //   output: string;
  //   parkingFree: string;
  //   powerType: string;
  //   stat: string;
  //   statId: string;
  //   statNm: string;
  //   statUpdDt: string;
  //   trafficYn: string;
  //   useTime: string;
  //   zcode: string;
  //   zscode: string;
  // };
}

export default function Main({ filterData }: Props) {
  const [data, setData] = useState<any>(filterData);
  let newData = Array.from(new Set(data));

  return (
    <NearbyChargingStationWrap>
      <NearbyChargingStationTitleWrap>
        <NearbyChargingStationTitle>인근 충전소</NearbyChargingStationTitle>
      </NearbyChargingStationTitleWrap>
      <NearbyChargingStationCardWrap>
        {newData.map((item: any) => {
          return <MainItem data={data} item={item} key={item.statId} />;
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
  width: auto;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px 50px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
