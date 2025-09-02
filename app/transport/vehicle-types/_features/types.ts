export type VehicleTypeResponse = {
  count: number;
  data: VehicleType[];
};

export type VehicleType = {
  id: string;
  name: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type VehicleTypePayload = {
  name: string;
};
