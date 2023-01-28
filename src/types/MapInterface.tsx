export interface Data {
  resultMsg: string;
  totalCount: number;
  pageNo: number;
  resultCode: string;
  numOfRows: number;
  items: {
    item: Item[];
  };
}

export interface Location {
  lat: number | string;
  lng: number | string;
}

export interface Result {
  address: Address;
  road_address: string | null;
}

export interface Address {
  address_name: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  zip_code: string;
}

export interface GeoResult {
  address: GeoAddress;
  address_name: string;
  address_type: string;
  road_address: string | null;
  x: string;
  y: string;
}

export interface GeoAddress {
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  x: string;
  y: string;
}

export interface Item {
  [key: string]: string | number;
}

export interface Zcode {
  [key: string]: string;
}

export interface MarkerLocation {
  [key: string]: number;
}
