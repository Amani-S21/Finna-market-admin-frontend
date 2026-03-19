import { z } from "zod";
import { hotelSchema } from "./validationSchemas";

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


export interface Picture {
  id: string;
  url: string;
}

export interface RoomCategoryPayload {
  
  description?: string;
  capacity: number;
  totalRooms: number;
  pricePerNight: number;
  hotelId: string;
  roomCategoryTypeId: string;
  createdById: string;
  visible: boolean;
  pictures: Picture[];
}


export interface HotelPayload {
  createdById: string;
  name: string;
  country?: string;
  city?: string;
  visible: boolean;
  address: string;
  description?: string;
  pictures: Picture[];
}

export type SubmitHotelPictures = {
  hotelId: string;
  pictures: {
    url: string;
  }[];
};

export type HotelSchema = z.infer<typeof hotelSchema>;