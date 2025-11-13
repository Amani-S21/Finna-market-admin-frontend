import { z } from "zod";
import { subCategorySchema } from "./validations";

export type SubmitSubCategory = {
  id? : string;
  icon?: string;
  name?: string;
  categoryId?: string;
};

export type CreatedSubCategory = {
  id: string;
  name: string;
  icon: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export type SubCategoriesResponse = {
  count : number,
  data : CreatedSubCategory
}

export type SubCategorySchema = z.infer<typeof subCategorySchema>;

export type UpdateSubCategoryIconType = {
  id : string,
  icon : string,
}