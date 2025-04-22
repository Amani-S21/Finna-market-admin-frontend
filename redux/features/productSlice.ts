import { FeatureWithValues } from "@/app/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  features: FeatureWithValues[] | null;
}

const initialState: ProductState = {
  features: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addFeature: (state, action: PayloadAction<FeatureWithValues>) => {
      state.features?.push(action.payload);
    },
  },
});

export const { addFeature } = productSlice.actions;
export default productSlice.reducer;
