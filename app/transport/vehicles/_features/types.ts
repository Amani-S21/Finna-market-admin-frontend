import { z } from "zod";
import { newVehicleSchema } from "./validations";

export type VehiclePayload = {
  plateNumber: string;
  model: string;
  capacity: number;
  vehicleTypeId: string;
  agencyId: string;
};


export type NewVehicleSchema = z.infer<typeof newVehicleSchema>;