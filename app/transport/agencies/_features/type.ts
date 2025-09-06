import { z } from "zod";
import { newAgencySchema } from "./validations";
import { VehicleType } from "../../vehicle-types/_features/types";

export interface TransportAgencyResponse {
  count: number;
  data: TransportAgency[];
}

export interface TransportAgency {
  id: string;
  name: string;
  photo: string | null;
  email: string | null;
  phone: string | null;
  visible: boolean;
  address: string | null;
  documents: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type TransportAgencyPayload = {
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  documents: string | null;
  photo: string | null;
};

export type NewAgencySchema = z.infer<typeof newAgencySchema>;

export type VehiclesResponse = {
  count: number;
  data: Vehicle[];
};

export type Vehicle = {
  id: string;
  plateNumber: string;
  model: string;
  capacity: number;
  visible: boolean;
  agencyId: string;
  vehicleTypeId: string;
  createdAt: string;
  updatedAt: string;
  vehicleType: VehicleType;
};
