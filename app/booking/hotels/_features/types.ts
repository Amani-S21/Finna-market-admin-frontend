export type HotelPicture = {
  id: string;
  hotelId: string;
  url: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type Hotel = {
  id: string;
  name: string;
  visible: boolean;
  country: string;
  city: string;
  createdById: string;
  address: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  pictures: HotelPicture[];
}

export type HotelResponse = {
  count: number;
  data: Hotel[];
}

// export interface City {
//   name: string;
// }

export interface Country {
  name: string;
  code: string;
  accronym: string;
  flag: string;
  cities: string[],
}

export interface CountriesData {
  countries: Country[];
}
