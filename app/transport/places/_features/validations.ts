import { z } from "zod";

export const newPlaceSchema = z.object({
  name: z.string().min(1, "Ce champs est obligatoire"),
  city: z.string().min(1, "Ce champs est obligatoire"),
});

export type NewPlaceSchema = z.infer<typeof newPlaceSchema>;