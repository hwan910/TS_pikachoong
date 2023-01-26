import axios from 'axios';
import { Data } from '../types/MapInterface';
import { APIKEY } from './firebase';
import { zcode } from './zcode';

const SERVER_URL =
  'https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=GZrWXIC2MesQBDxWNWBAM%2F2kOkiLtP0XWhKAjyqQb7%2FZiJY9OUrqcv8lpBFcPoyVsuNoInArZzfbYrbXxW9E%2Fg%3D%3D';

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

//주석만 달아볼까요?

// import axios from 'axios';
// const BASE_URL = 'https://apis.data.go.kr/B552584/EvCharger';
// const API_KEY =
//   'GZrWXIC2MesQBDxWNWBAM%2F2kOkiLtP0XWhKAjyqQb7%2FZiJY9OUrqcv8lpBFcPoyVsuNoInArZzfbYrbXxW9E%2Fg%3D%3D';

// export const getData = async () => {
//   try {
//     const { data } = await axios.get(
//       `${BASE_URL}/getChargerInfo?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON`,
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const BASE_URL = 'https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?';
const pageNo = 1;

export const getChargerinfo = (zcode: any, zscode: any): any => {
  return axios.get(
    `${BASE_URL}serviceKey=${APIKEY}&numOfRows=3000&zcode=${zcode}&zscode=${zscode}&pageNo=${pageNo}`,
  );
};
