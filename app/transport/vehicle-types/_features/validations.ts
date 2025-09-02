import { z } from "zod";

export const newVehicleSchema = z.object({
  name: z.string().min(1, "Ce champs est obligatoire"),
});

export type NewVehicleSchema = z.infer<typeof newVehicleSchema>;