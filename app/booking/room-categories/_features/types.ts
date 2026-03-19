import { z } from "zod";
import { roomCategoriesSchema } from "./validationSchemas";
import { Hotel } from "../../hotels/_features/types";

export interface ApiResponse<T> {
  count: number;
  data: T[];
}

export interface Picture {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  hotelId?: string;
  roomCategoryId?: string;
}

// export interface Hotel {
//   id: string;
//   name: string;
//   visible: boolean;
//   country: string;
//   city: string;
//   createdById: string;
//   address: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   pictures: Picture[];
// }

export interface RoomCategory {
  id: string;
  description: string;
  visible: boolean;
  capacity: number;
  createdById: string;
  totalRooms: number;
  pricePerNight: number;
  hotelId: string;
  createdAt: string;
  updatedAt: string;
  hotel: Hotel;
  pictures: Picture[];
  roomCategoryType: RoomCategoryType;
}

// ✅ Example usage for your JSON:
export type RoomCategoriesResponse = ApiResponse<RoomCategory>;

export type RoomCategoriesSchema = z.infer<typeof roomCategoriesSchema>;

export interface RoomCategoryType {
  id: string;
  name: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface RoomCategoryTypeListResponse {
  count: number;
  data: RoomCategoryType[];
}

export interface ComoditiesListResponse {
  count: number;
  data: Comodity[];
}

export interface Comodity {
  id: string;
  name: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
