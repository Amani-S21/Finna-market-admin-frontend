export type SubmitSubCategory = {
  id? : string;
  icon?: string;
  name?: string;
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