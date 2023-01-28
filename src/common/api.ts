import axios from 'axios';
import { Data } from '../types/MapInterface';

const SERVER_URL = `https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=${process.env.REACT_APP_API_KEY}`;

interface DataKey {
  queryKey: [string, string];
}

export const getData = async ({ queryKey }: DataKey) => {
  const [zcode, zscode] = queryKey;

  const { data } = await axios.get<Data>(
    `${SERVER_URL}&numOfRows=3000&pageNo=1&dataType=JSON&zcode=${zcode}&zscode=${zscode}`,
  );
  return data;
};

const pageNo = 1;

export const getChargerinfo = (zcode: any, zscode: any): any => {
  return axios.get(
    `${SERVER_URL}&numOfRows=3000&zcode=${zcode}&zscode=${zscode}&pageNo=${pageNo}`,
  );
};
