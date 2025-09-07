import { z } from "zod";

export const seatSchema = z.object({
  seatNumber: z.string().min(1, "Ce champs est obligatoire"),
});

export type SeatSchema = z.infer<typeof seatSchema>;