import { useState } from 'react';
import MainItem from './MainItem';
import { Item } from '../../types/MapInterface';
import {
  NearbyChargingStationWrap,
  StyledSlider,
} from '../../pages/MainPage/style';

interface Props {
  filterData: Item[];
}

export default function Main({ filterData }: Props) {
  // 반경 1km 내에 있는 데이터를 props로 받아 useState에 저장해줌
  // slides가 화면 크기에 따라 나타나는 개수를 정해줌
  const [data, setData] = useState(filterData);
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    slidesToShow:
      window.innerWidth > 1200 ? 3 : window.innerWidth > 600 ? 2 : 1,
    slidesToScroll:
      window.innerWidth > 1200 ? 3 : window.innerWidth > 600 ? 2 : 1,
  });

  // 이름이 똑같은 주유소가 있어서 중복된 것을 제거한 뒤, 가까운 거리의 주유소로 정렬해줌
  let newData = Array.from(new Set(data)).sort(
    (a: Item, b: Item) => Number(a.dist) - Number(b.dist),
  );

  // 실시간으로 window.innerWidth의 값을 받아오기 위해 쓰는 함수
  window.onresize = function () {
    let innerWidth = window.innerWidth;

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: innerWidth > 1200 ? 3 : innerWidth > 600 ? 2 : 1,
      slidesToScroll: innerWidth > 1200 ? 3 : innerWidth > 600 ? 2 : 1,
    };

    setSettings(settings);
  };

  // 주변 데이터가 없을 때
  if (newData.length === 0) {
    return (
      <NearbyChargingStationWrap>
        ☠️ 주변에 데이터가 없다 ☠️
      </NearbyChargingStationWrap>
    );
  }

  // 슬라이더 부분
  return (
    <StyledSlider {...settings}>
      {newData.map((item: Item) => {
        return <MainItem data={data} item={item} key={item.statId} />;
      })}
    </StyledSlider>
  );
}
