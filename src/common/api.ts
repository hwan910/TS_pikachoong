import axios from "axios";
import { Data } from "../types/MapInterface";

const SERVER_URL = "https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=GZrWXIC2MesQBDxWNWBAM%2F2kOkiLtP0XWhKAjyqQb7%2FZiJY9OUrqcv8lpBFcPoyVsuNoInArZzfbYrbXxW9E%2Fg%3D%3D";

interface DataKey {
  queryKey: [string, string];
}

export const getData = async ({ queryKey }: DataKey) => {
  const [zcode, zscode] = queryKey;
  const { data } = await axios.get<Data>(`${SERVER_URL}&numOfRows=3000&pageNo=1&dataType=JSON&zcode=${zcode}&zscode=${zscode}`);
  return data;
};
