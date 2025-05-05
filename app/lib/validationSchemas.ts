import { z } from "zod";

export const signinSchema = z.object({
  phone: z.string().min(1, "Veuillez saisir le mot de passe"),
  password: z
    .string()
    .min(5, "Le mot de passe doit etre au minimum 5 caracteres"),
});

export const shopSchema = z.object({
  userName: z.string().min(1, "Veuillez selectionner un utilisateur"),
  name: z.string().min(1, "Veuillez saisir le nom de la boutique"),
  address: z.string().min(1, "Veuillez saisir l'addrèsse"),
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

export const userSchema = z.object({
  role: z.string().min(1, "Veuillez selectionner un role"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Veuillez remplir le nom"),
  subCategory: z.string().optional(),
});

export const featureSchema = z.object({
  name: z.string().min(1, "Veuillez remplir le nom"),
  type: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Veuillez saisir le nom de la boutique"),
  purchasedPrice: z.string().min(1, "Veuillez saisir le prix d'achat"),
  oldPrice: z.string().min(1, "Veuillez saisir l'ancien prix"),
  currentPrice: z.string().min(1, "Veuillez saisir le prix courant"),
  description: z
    .string()
    .min(5, "La déscription doit avoir au minimum 5 caracteres"),
  category: z.string().min(1, "Veuillez sélectionner la catégorie"),
  feature: z.string().optional(),
});
