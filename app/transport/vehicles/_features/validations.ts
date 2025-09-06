import { z } from "zod";

export const newVehicleSchema = z.object({
  plateNumber: z.string().min(1, "Ce champs est obligatoire"),
  model: z.string().min(1, "Ce champs est obligatoire"),
  capacity: z.string().min(1, "Ce champs est obligatoire"),
});