import {
  affectShopSchema,
  categorySchema,
  editShopSchema,
  featureSchema,
  newShopSchema,
  productSchema,
  signinSchema,
  updatePasswordSchema,
  updateUserSchema,
  userSchema,
} from "@/app/lib/validationSchemas";
import { z } from "zod";

export type SigninSchema = z.infer<typeof signinSchema>;

export type NewShopSchema = z.infer<typeof newShopSchema>;

export type AffectShopSchema = z.infer<typeof affectShopSchema>;

export type EditShopSchema = z.infer<typeof editShopSchema>;

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export type UserSchema = z.infer<typeof userSchema>;

export type FeatureSchema = z.infer<typeof featureSchema>;

export type CategorySchema = z.infer<typeof categorySchema>;

export type ProductSchema = z.infer<typeof productSchema>;

export type ShopsListResponse = {
  count: number;
  data: Shop[];
};

export type SubmitShop = {
  id?: string;
  name: string;
  address: string;
  creatorId?: string;
};

export type Shop = {
  id: string;
  name: string;
  address: string;
  creator: User;
  shopAffectations: ShopAffectation[];
  createdAt: string;
  updatedAt: string;
};

export type ShopAffectation = {
  userId: string;
  shopId: string;
  role: string;
  user: User;
};

export type User = {
  id: string;
  fullName?: string;
  role?: Roles;
  phone?: string;
  emailAddress?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UsersResponse = {
  count: number;
  data: User[];
};

export type Roles =
  | "SUPER_ADMIN"
  | "SUPER_MARKET_ADMIN"
  | "CUSTOMER"
  | "DELIVERER";

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

export type SubmitProductLinks = {
  id: string;
  pictures: string[];
};

export type SubmitFeatureWithValues = {
  id?: string;
  name: string;
  featureValues: FeatureValue[];
};

export type SubmitProduct = {
  id?: string;
  name?: string;
  purchasedPrice?: number;
  oldPrice?: number;
  currentPrice?: number;
  published?: boolean;
  userId?: string;
  pictures?: string[];
  description?: string;
  categoryId?: string;
  subCategoryId?: string;
  shopId?: string;
  features?: SubmitFeature[];
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
  id?: string;
  name: string;
  index?: number;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
};

export type SubmitCategory = {
  id?: string;
  name: string;
  subCategories: SubCategory[];
};

export type OrdersResponse = {
  count: number;
  data: Order[];
};

export type Order = {
  id: string;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
  customerId?: string;
  delivererId?: string;
  customer?: User;
  deliverer?: User;
  ordersDetails?: OrderDetail[];
};

export type Status = "OPEN" | "IN_PROGRESS" | "CANCELED" | "CLOSED";

export type OrderDetail = {
  id: string;
  quantity: number;
  orderId: string;
  productId: string;
  createdAt?: string;
  updatedAt?: string;
  product: Product;
  orderDetailFeatures: OrderDetailFeatures[];
};

export type OrderDetailFeatures = {
  features: Feature;
  featureValue: OrderFeatureValue;
};

export type OrderFeatureValue = {
  id: string;
  value: string;
  featuresAffectationsHasValues: FeatureValuePrice[];
};

export type SubmitUpdatePassword = {
  id: string;
  oldPassword: string;
  newPassword: string;
};

export type OrderSymmary = {
  opened: number;
  inProgress: number;
  canceled: number;
  closed: number;
};

export type SubmitAffectShop = {
  shopId: string;
  userId: string;
  role: Roles;
};
