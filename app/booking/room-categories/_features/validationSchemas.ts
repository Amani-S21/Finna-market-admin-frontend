import { z } from "zod";

export const roomCategoriesSchema = z.object({
  description: z.string().optional(),
  capacity: z.string().optional(),
  totalRooms: z.string().optional(),
  pricePerNight: z.string().optional(),
});