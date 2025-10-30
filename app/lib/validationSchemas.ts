import { z } from "zod";

export const signinSchema = z.object({
  phone: z.string().min(1, "Veuillez saisir le mot de passe"),
  password: z
    .string()
    .min(5, "Le mot de passe doit etre au minimum 5 caracteres"),
});

export const newShopSchema = z.object({
  name: z.string().min(1, "Ce champs est obligatoire"),
  address: z.string().min(1, "Veuillez saisir l'addrèsse"),
  percentage: z.coerce.number().min(1, "Le pourcentage doit etre au minimum 1"),
  nationalId: z.string(),
  rccm: z.string(),
  emailAddress: z.string().optional(),
  phone: z.string().optional(),
});

export const affectShopSchema = z.object({
  userName: z.string().min(1, "Veuillez selectionner un utilisateur"),
});

export const editShopSchema = z.object({
  name: z.string().min(1, "Veuillez saisir le nom de la boutique"),
  address: z.string().min(1, "Veuillez saisir l'addrèsse"),
  percentage: z.coerce.number().min(1, "Le pourcentage doit etre au minimum 1"),
});

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Veuillez saisir le mot de passe"),
    newPassword: z.string().min(1, "Veuillez saisir le nouveau mot de passe"),
    confirmPassword: z
      .string()
      .min(1, "Veuillez confirmer le nouveau mot de passe"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export const updateUserSchema = z.object({
  fullName: z.string().min(1, "Veuillez saisir le nom complet"),
  phone: z.string().min(1, "Veuillez saisir le numero de téléphone"),
  emailAddress: z.string().min(1, "Veuillez saisir l'addrèsse mail"),
});

export const userSchema = z.object({
  role: z.string().min(1, "Veuillez selectionner un role"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Veuillez remplir le nom"),
  subCategory: z.string().optional(),
});



// export const subCategorySchema = z.object({
//   name: z.string().min(1, "Nom de la sous catégorie obligatoire"),
// });

export const taxeSchema = z.object({
  name: z.string().min(1, "Veuillez remplir le nom"),
});

export const featureSchema = z.object({
  name: z.string().min(1, "Veuillez remplir le nom"),
  type: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Veuillez saisir le nom de la boutique"),
  cost: z.coerce.number().min(1, "Le cout doit etre au minimum 1"),
  price: z.coerce.number().min(1, "Le prix doit etre au minimum 1"),
  discountPrice: z.coerce
    .number()
    .min(1, "Le prix de reduction doit etre au minimum 1"),
  weightInGrams: z.coerce
    .number()
    .min(1, "Le poids en gramme doit etre au minimum 1")
    .optional(),
  heightInCm: z.coerce
    .number()
    .min(1, "La hauteur en cm doit etre au minimum 1")
    .optional(),
  widthInCm: z.coerce
    .number()
    .min(1, "La largeur en cm doit etre au minimum 1")
    .optional(),
  lengthInCm: z.coerce
    .number()
    .min(1, "La longueur en cm doit etre au minimum 1")
    .optional(),
  description: z.coerce
    .string()
    .min(5, "La déscription doit avoir au minimum 5 caracteres"),
  category: z.string().min(1, "Veuillez sélectionner la catégorie"),
  feature: z.string().optional(),
});
