import { SubCategory } from "@/app/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  subCategories: SubCategory[] | null;
}

const initialState: CategoryState = {
  subCategories: [],
};

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addSubCategory: (state, action: PayloadAction<SubCategory>) => {
      const exist = state.subCategories?.some(
        (v) => v.id === action.payload.id
      );
      if (!exist) {
        state.subCategories?.push(action.payload);
      }
    },

    updateSubCategory: (state, action: PayloadAction<SubCategory>) => {
      const index =
        state.subCategories?.findIndex(
          (v) => v.index === action.payload.index
        ) ?? 0;

      state.subCategories![index] = {
        id: action.payload.id,
        index: action.payload.index,
        name: action.payload.name,
      };
    },

    addSubCategories: (state, action: PayloadAction<SubCategory[]>) => {
      state.subCategories = [];
      state.subCategories?.push(...action.payload);
    },

    removeSubCategory: (state, action: PayloadAction<{ category: string }>) => {
      state.subCategories =
        state.subCategories?.filter(
          (v) => v.name !== action.payload.category
        ) ?? [];
    },
  },
});

export const {
  addSubCategory,
  updateSubCategory,
  addSubCategories,
  removeSubCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
