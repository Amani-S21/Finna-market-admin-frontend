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

export interface Hotel {
  id: string;
  name: string;
  visible: boolean;
  country: string;
  city: string;
  createdById: string;
  address: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  pictures: Picture[];
}

export interface RoomCategory {
  id: string;
  name: string;
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
}

// ✅ Example usage for your JSON:
export type RoomCategoriesResponse = ApiResponse<RoomCategory>;
