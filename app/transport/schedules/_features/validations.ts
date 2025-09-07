import { z } from "zod";

export const newScheduleSchema = z.object({
  order: z.string().min(1, "Ce champs est obligatoire"),
  price: z.string().min(1, "Ce champs est obligatoire"),
});

export type NewScheduleSchema = z.infer<typeof newScheduleSchema>;

export const newTripSchema = z.object({
  price: z.string().min(1, "Ce champs est obligatoire"),
});

export type NewTripSchema = z.infer<typeof newTripSchema>;