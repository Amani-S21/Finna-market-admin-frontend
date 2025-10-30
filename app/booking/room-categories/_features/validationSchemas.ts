import { z } from "zod";

export const roomCategoriesSchema = z.object({
  name: z.string().min(1, "Veuillez remplir le nom"),
  description: z.string().optional(),
  capacity: z.string().optional(),
  totalRooms: z.string().optional(),
  pricePerNight: z.string().optional(),
});