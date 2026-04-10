export interface RoomBookingResponse {
  count: number;
  data: RoomBooking[];
}

export interface RoomBooking {
  id: string;
  hotelId: string;
  roomCategoryId: string;
  customerId: string;
  startDate: string; // or Date if parsed
  endDate: string; // or Date if parsed
  roomsBooked: number;
  status: "CONFIRMED" | "PENDING" | "CANCELED"; // adjust if you have more
  createdAt: string; // or Date
  updatedAt: string; // or Date;

  customer: Customer;
  hotel: Hotel;
  roomCategory: RoomCategory;
}

export interface Customer {
  id: string;
  fullName: string;
  role: "SUPER_ADMIN" | "ADMIN" | "CUSTOMER"; // adjust roles
  idCardCopy: string | null;
  idCardNumber: string | null;
  emailAddress: string;
  phone: string;
  password: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
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
}

export interface RoomCategory {
  id: string;
  description: string;
  location: string;
  visible: boolean;
  capacity: number;
  createdById: string;
  totalRooms: number;
  pricePerNight: number;
  hotelId: string;
  createdAt: string;
  updatedAt: string;
  roomCategoryTypeId: string;
  roomCategoryType: {
    id: string;
    name: string;
    bookingTypeId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export type RoomBookingSummary = {
  confirmed: number;
  inProgress: number;
  canceled: number;
  all: number;
};
