import { PlaceType } from "../../places/_features/types";

export interface TripPayload {
  vehicleId: string;
  departure: string; // ISO date string
  arrival: string;   // ISO date string
  fromId: string;
  toId: string;
  price: number;
  dayOfWeek: number; // 0-6 if it's following JS convention
  legs: TripLegPayload[];
}

export interface TripLegPayload {
  id? : string;
  fromId: string;
  fromName? : string;
  toId: string;
  toName? : string;
  departure: string; // ISO date string
  arrival: string;   // ISO date string
  order: number;
  price: number;
}


// export interface Place {
//   id: string;
//   name: string;
//   city: string;
//   createdAt: string; // ISO datetime
//   updatedAt: string; // ISO datetime
// }

export interface ScheduleLeg {
  id: string;
  scheduleId: string;
  fromId: string;
  toId: string;
  departure: string; // ISO datetime
  arrival: string;   // ISO datetime
  order: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  vehicleId: string;
  from: PlaceType;
  to: PlaceType;
}

export interface Schedule {
  id: string;
  vehicleId: string;
  dayOfWeek: number;
  departure: string; // ISO datetime
  arrival: string;   // ISO datetime
  fromId: string;
  toId: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  from: PlaceType;
  to: PlaceType;
  legs: ScheduleLeg[];
}

export interface SchedulesResponse {
  count: number;
  data: Schedule[];
}
