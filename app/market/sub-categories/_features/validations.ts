import { z } from "zod";

export const subCategorySchema = z.object({
  name: z.string().min(1, "Veuillez remplir le nom"),
});