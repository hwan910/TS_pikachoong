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
  const [data, setData] = useState(filterData);
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    slidesToShow:
      window.innerWidth > 1200 ? 3 : window.innerWidth > 600 ? 2 : 1,
    slidesToScroll: 3,
  });

  let newData = Array.from(new Set(data)).sort(
    (a: Item, b: Item) => Number(a.dist) - Number(b.dist),
  );

  window.onresize = function () {
    let innerWidth = window.innerWidth;

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: innerWidth > 1200 ? 3 : innerWidth > 600 ? 2 : 1,
      slidesToScroll: 3,
    };

    setSettings(settings);
  };

  if (newData.length === 0) {
    return (
      <NearbyChargingStationWrap>
        ☠️ 주변에 데이터가 없다 ☠️
      </NearbyChargingStationWrap>
    );
  }

  return (
    <StyledSlider {...settings}>
      {newData.map((item: Item) => {
        return <MainItem data={data} item={item} key={item.statId} />;
      })}
    </StyledSlider>
  );
}
