import { shopSchema, signinSchema } from "@/app/lib/validationSchemas";
import { z } from "zod";

export type SigninSchema = z.infer<typeof signinSchema>;

export type ShopSchema = z.infer<typeof shopSchema>;

export type ShopsListResponse = {
  count: number;
  data: Shop[];
};

export type SubmitShop = {
  id?: string;
  name: string;
  address: string;
  userId?: string;
};


export type Shop = {
  id: string;
  name: string;
  address: string;
  users: User;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  fullName: string;
  role: string;
  emailAddress: string;
  createdAt: string;
  updatedAt: string;
};
