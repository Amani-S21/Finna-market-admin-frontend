import {
  featureSchema,
  productSchema,
  shopSchema,
  signinSchema,
} from "@/app/lib/validationSchemas";
import { z } from "zod";

export type SigninSchema = z.infer<typeof signinSchema>;

export type ShopSchema = z.infer<typeof shopSchema>;

export type FeatureSchema = z.infer<typeof featureSchema>;

export type ProductSchema = z.infer<typeof productSchema>;

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

export type ProductsListResponse = {
  count: number;
  data: Product[];
};

export type Product = {
  id?: string;
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
  user?: User;
  subCategory: SubCategory;
  featuresAffectations: FeatureAffectation[];
};

export type SubCategoriesResponse = {
  count: number;
  data: SubCategory[];
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
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
  featuresHasFeatureValues: FeatureHasFeatureValue[];
};

export type FeaturesResponse = {
  count: number;
  data: Feature[];
};

export type FeatureValuesByFeatureResponse = {
  count: number;
  data: FeatureValueByFeature[];
};

export type FeatureValueByFeature = {
  featureId: string;
  featureValueId: string;
  featureValues: FeatureValue;
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
  id?: string;
  index?: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FeatureWithValues = {
  featureId: string;
  name: string;
  featureValues: FeatureValuePrice[];
};

export type FeatureValuePrice = {
  featureValueId: string;
  name: string;
  price: number;
};

export type UploadFileResponse = {
  message: string;
  url: string;
};

export type FeatureHasFeatureValue = {
  featureId: string;
  featureValueId: string;
  featureValues: FeatureValue;
};

export type SubmitFeatureWithValues = {
  id?: string;
  name: string;
  featureValues: FeatureValue[];
};

export type SubmitProduct = {
  id?: string;
  name: string;
  purchasedPrice: number;
  oldPrice: number;
  currentPrice: number;
  published: boolean;
  userId: string;
  pictures: string[];
  description: string;
  categoryId: string;
  subCategoryId: string;
  features: SubmitFeature[];
};

type SubmitFeature = {
  featureId: string;
  featureValues: SubmitFeatureValue[];
};

type SubmitFeatureValue = {
  featureValueId: string;
  price: number;
};

export type CategoriesResponse = {
  count: number;
  data: Category[];
};

export type SubCategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  category: Category[];
};
