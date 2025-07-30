export type SubmitSubCategory = {
  id? : string;
  icon?: string;
  name?: string;
};

export type UpdateCategoryIconType = {
  id : string,
  icon : string,
}

export interface CreatedCategory {
  id: string;
  name: string;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatedSubCategory {
  id: string;
  name: string;
  icon: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryResponse {
  createdCategory: CreatedCategory;
  createdSubCategories: CreatedSubCategory[];
}
