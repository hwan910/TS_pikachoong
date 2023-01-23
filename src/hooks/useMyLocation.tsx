import { useState } from "react";
import { Location, Result } from "../types/MapInterface";
import * as Z from "../common/zcode";

const { kakao } = window;

const useMyLocation = () => {
  const [zcode, setZcode] = useState("");
  const [zscode, setZscode] = useState("");

  const geocoder = new kakao.maps.services.Geocoder();

  const callback = (result: Result[], status: string) => {
    if (status === kakao.maps.services.Status.OK) {
      const arr = { ...result };
      const doe = arr[0].address.region_1depth_name;
      const sigungu = arr[0].address.region_2depth_name.split(" ")[0]
      setZcode(Z.zcode[doe]);
      switch (true) {
        case doe === "서울":
          setZscode(Z.zcode11[sigungu]);
          break;
        case doe === "부산":
          setZscode(Z.zcode26[sigungu]);
          break;
        case doe === "대구":
          setZscode(Z.zcode27[sigungu]);
          break;
        case doe === "인천":
          setZscode(Z.zcode28[sigungu]);
          break;
        case doe === "광주":
          setZscode(Z.zcode29[sigungu]);
          break;
        case doe === "대전":
          setZscode(Z.zcode30[sigungu]);
          break;
        case doe === "울산":
          setZscode(Z.zcode31[sigungu]);
          break;
        case doe === "세종특별자치시":
          setZscode(Z.zcode36[sigungu]);
          break;
        case doe === "경기":
          setZscode(Z.zcode41[sigungu]);
          break;
        case doe === "강원":
          setZscode(Z.zcode42[sigungu]);
          break;
        case doe === "충북":
          setZscode(Z.zcode43[sigungu]);
          break;
        case doe === "충남":
          setZscode(Z.zcode44[sigungu]);
          break;
        case doe === "전북":
          setZscode(Z.zcode45[sigungu]);
          break;
        case doe === "전남":
          setZscode(Z.zcode46[sigungu]);
          break;
        case doe === "경북":
          setZscode(Z.zcode47[sigungu]);
          break;
        case doe === "경남":
          setZscode(Z.zcode48[sigungu]);
          break;
        case doe === "제주특별자치도":
          setZscode(Z.zcode50[sigungu]);
          break;
      }
    }
  };

  const setLocation = (location: Location) => {
    const loc = new kakao.maps.LatLng(location.lat, location.lng)
    if (loc) {
      geocoder.coord2Address(loc.getLng(), loc.getLat(), callback);
    }
  };

  return [zcode, zscode, setLocation] as const
};

export default useMyLocation;
