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
});

export const productSchema = z.object({
  name: z.string().min(1, "Veuillez saisir le nom de la boutique"),
  purchasedPrice: z.number().min(1, "Veuillez saisir le prix d'achat"),
  oldPrice: z.number().min(1, "Veuillez saisir l'ancien prix"),
  currentPrice: z.string().min(5, "Veuillez saisir le prix courant"),
  description: z
    .string()
    .min(5, "L'addrèsse doit avoir au minimum 5 caracteres"),
  category: z.string().min(5, "L'addrèsse doit avoir au minimum 5 caracteres"),
  subCategory: z
    .string()
    .min(5, "L'addrèsse doit avoir au minimum 5 caracteres"),
});
