import { shopSchema, signinSchema } from "@/app/validationSchemas";
import { z } from "zod";

export type SigninSchema = z.infer<typeof signinSchema>;

export type ShopSchema = z.infer<typeof shopSchema>;
