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
  phone: string;
  emailAddress: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductResponse = {
  count: number;
  data: Product[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  oldPrice: number;
  currentPrice: number;
  purchasedPrice: number;
  publised: boolean;
  pictures: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  subCategoryId: string;
  user: User;
  subCategory: SubCategory;
  featuresAffectations: FeatureAffectation[];
};

export type SubCategory = {
  id: string;
  name: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type FeatureAffectation = {
  featureId: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
  feature: Feature;
  featuresAffectationsHasValues: FeatureAffectationValue[];
};

export type Feature = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type FeatureAffectationValue = {
  price: number;
  featureAffectationProductId: string;
  featureAffectationFeatureId: string;
  featureValueId: string;
  createdAt: string;
  updatedAt: string;
  featureValue: FeatureValue;
};

export type FeatureValue = {
  id: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

