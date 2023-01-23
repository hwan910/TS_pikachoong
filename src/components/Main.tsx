import styled from 'styled-components';
import { COLOR } from '../styles/color';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getData } from '../common/api';

interface LocationType {
  latitude: number;
  longitude: number;
}

export default function Main() {
  const [myLocation, setMyLocation] = useState<LocationType>();
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useQuery('data', getData);

  const getLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        // getCurrentPosition 사용자의 경도, 위도를 알려줌
        // 첫 번째 인자가 성공했을 때 반환하는 함수, 두 번째 인자가 실패했을 때 반환하는 함수
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              resolve(position);
            }
          },
          (error) => reject(error),
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  };

  const setLocation = async () => {
    const location: GeolocationPosition = await getLocation();
    setMyLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setLocation();
  }, []);

  useEffect(() => {
    if (myLocation) {
      const currentPosition = [myLocation.latitude, myLocation.longitude];

      const map: naver.maps.Map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoom: 16,
      });

      // 내 위치 마커 표시하기
      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        map,
        // 원하는 이미지로 마커 커스텀
        // icon: {
        //     url: pinImage,
        //     size: new naver.maps.Size(50, 52),
        //     origin: new naver.maps.Point(0, 0),
        //     anchor: new naver.maps.Point(25, 26),
        //   },
      });

      var proj = map.getProjection();
      let items = data.items.item;
      for (const item of items) {
        let distance = proj.getDistance(
          new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
          new naver.maps.LatLng(item.lat, item.lng),
        );
        console.log(distance);
      }
    }
  }, [myLocation]);

  return (
    <Container>
      {isLoading ? (
        <div style={{ width: '70%', height: '500px' }}>Loading...</div>
      ) : (
        <div id="map" style={{ width: '70%', height: '500px' }} />
      )}

      {/* <MainMap>지도</MainMap> */}
      <NearbyChargingStationWrap>
        <NearbyChargingStationTitleWrap>
          <NearbyChargingStationTitle>인근 충전소</NearbyChargingStationTitle>
        </NearbyChargingStationTitleWrap>
        <NearbyChargingStationCardWrap>
          <NearbyChargingStationCard>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardTitle>
                이대서울병원
              </NearbyChargingStationCardTitle>
            </NearbyChargingStationCardTextWrap>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardContent>
                서울특별시 강서구 발산동 / 370M
              </NearbyChargingStationCardContent>
              <NearbyChargingStationCardContent>
                전체 충전기 : 2대 / 사용가능 : 2대
              </NearbyChargingStationCardContent>
            </NearbyChargingStationCardTextWrap>
          </NearbyChargingStationCard>
          <NearbyChargingStationCard>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardTitle>
                이대서울병원
              </NearbyChargingStationCardTitle>
            </NearbyChargingStationCardTextWrap>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardContent>
                서울특별시 강서구 발산동 / 370M
              </NearbyChargingStationCardContent>
              <NearbyChargingStationCardContent>
                전체 충전기 : 2대 / 사용가능 : 2대
              </NearbyChargingStationCardContent>
            </NearbyChargingStationCardTextWrap>
          </NearbyChargingStationCard>
          <NearbyChargingStationCard>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardTitle>
                이대서울병원
              </NearbyChargingStationCardTitle>
            </NearbyChargingStationCardTextWrap>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardContent>
                서울특별시 강서구 발산동 / 370M
              </NearbyChargingStationCardContent>
              <NearbyChargingStationCardContent>
                전체 충전기 : 2대 / 사용가능 : 2대
              </NearbyChargingStationCardContent>
            </NearbyChargingStationCardTextWrap>
          </NearbyChargingStationCard>
          <NearbyChargingStationCard>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardTitle>
                이대서울병원
              </NearbyChargingStationCardTitle>
            </NearbyChargingStationCardTextWrap>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardContent>
                서울특별시 강서구 발산동 / 370M
              </NearbyChargingStationCardContent>
              <NearbyChargingStationCardContent>
                전체 충전기 : 2대 / 사용가능 : 2대
              </NearbyChargingStationCardContent>
            </NearbyChargingStationCardTextWrap>
          </NearbyChargingStationCard>
          <NearbyChargingStationCard>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardTitle>
                이대서울병원
              </NearbyChargingStationCardTitle>
            </NearbyChargingStationCardTextWrap>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardContent>
                서울특별시 강서구 발산동 / 370M
              </NearbyChargingStationCardContent>
              <NearbyChargingStationCardContent>
                전체 충전기 : 2대 / 사용가능 : 2대
              </NearbyChargingStationCardContent>
            </NearbyChargingStationCardTextWrap>
          </NearbyChargingStationCard>
          <NearbyChargingStationCard>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardTitle>
                이대서울병원
              </NearbyChargingStationCardTitle>
            </NearbyChargingStationCardTextWrap>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardContent>
                서울특별시 강서구 발산동 / 370M
              </NearbyChargingStationCardContent>
              <NearbyChargingStationCardContent>
                전체 충전기 : 2대 / 사용가능 : 2대
              </NearbyChargingStationCardContent>
            </NearbyChargingStationCardTextWrap>
          </NearbyChargingStationCard>
          <NearbyChargingStationCard>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardTitle>
                이대서울병원
              </NearbyChargingStationCardTitle>
            </NearbyChargingStationCardTextWrap>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardContent>
                서울특별시 강서구 발산동 / 370M
              </NearbyChargingStationCardContent>
              <NearbyChargingStationCardContent>
                전체 충전기 : 2대 / 사용가능 : 2대
              </NearbyChargingStationCardContent>
            </NearbyChargingStationCardTextWrap>
          </NearbyChargingStationCard>
          <NearbyChargingStationCard>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardTitle>
                이대서울병원
              </NearbyChargingStationCardTitle>
            </NearbyChargingStationCardTextWrap>
            <NearbyChargingStationCardTextWrap>
              <NearbyChargingStationCardContent>
                서울특별시 강서구 발산동 / 370M
              </NearbyChargingStationCardContent>
              <NearbyChargingStationCardContent>
                전체 충전기 : 2대 / 사용가능 : 2대
              </NearbyChargingStationCardContent>
            </NearbyChargingStationCardTextWrap>
          </NearbyChargingStationCard>
        </NearbyChargingStationCardWrap>
      </NearbyChargingStationWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainMap = styled.div`
  width: 75%;
  height: 33vh;
  margin-bottom: 3%;
  background-color: #e3e3e3;
`;

const NearbyChargingStationWrap = styled.div`
  width: 75%;
  height: 45vh;
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
  padding: 50px 0 50px 0;
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

const NearbyChargingStationCard = styled.div`
  min-width: 300px;
  border-radius: 10px;
  background-color: white;
  width: 35%;
  height: 45%;
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
  font-size: 25px;
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
