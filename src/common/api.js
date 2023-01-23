//주석만 달아볼까요?

import axios from 'axios';
const BASE_URL = 'https://apis.data.go.kr/B552584/EvCharger';
const API_KEY =
  'GZrWXIC2MesQBDxWNWBAM%2F2kOkiLtP0XWhKAjyqQb7%2FZiJY9OUrqcv8lpBFcPoyVsuNoInArZzfbYrbXxW9E%2Fg%3D%3D';

export const getData = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/getChargerInfo?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
