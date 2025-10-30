import { z } from "zod";

export const hotelSchema = z.object({
  name: z.string().min(1, "Veuillez remplir le nom"),
  address: z.string().optional(),
  description: z.string().optional(),
});