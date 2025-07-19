import { z } from "zod";

export const shopTaxeSchema = z.object({
  name: z.string().min(1, "Veuillez remplir le nom"),
  price: z.string().min(1, "Veuillez remplir le pourcentage de la taxe"),
});

export const shopTaxSchema = z.object({
  taxName: z.string().min(1, "Veuillez sélectionner une taxe"),
  price: z.string().min(1, "Veuillez saisir le pourcentage"),
});
