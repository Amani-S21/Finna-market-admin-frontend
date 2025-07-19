import { z } from "zod";
import { shopTaxeSchema, shopTaxSchema } from "./validationSchemas";

export type ShopTaxSchema = z.infer<typeof shopTaxSchema>;

export type Taxe = {
  id: string;
  name: string;
  createdAt: string; // ISO 8601 format
  updatedAt: string;
};

export type ShopTaxeSchema = z.infer<typeof shopTaxeSchema>;

export type TaxePriceData = {
  price: number;
  taxeId: string;
  shopId: string;
  createdAt: string;
  updatedAt: string;
  taxe: Taxe;
};

export type TaxePriceResponse = {
  count: number;
  data: TaxePriceData[];
};

export type TaxePriceSubmit = {
  shopId: string;
  taxeId: string;
  price: number;
};
