import { z } from "zod";

export const newAgencySchema = z.object({
  name: z.string().min(1, "Ce champs est obligatoire"),
  email: z.string().min(1, "Veuillez saisir l'addrèsse"),
  phone: z.string().optional(),
  address: z.string().optional(),
});
