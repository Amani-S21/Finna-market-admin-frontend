export type SeatPayload = {
  seatNumber: string;
  vehicleId: string;
  type: string;
};


export type Seat = {
  id: string;
  seatNumber: string;
  type: "ECONOMIC" | "BUSINESS" | "VIP"; // adjust depending on your enum values
  vehicleId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type SeatsResponse = {
  count: number;
  data: Seat[];
};
