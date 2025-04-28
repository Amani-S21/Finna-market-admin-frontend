import { FeatureValuePrice, FeatureWithValues } from "@/app/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  features: FeatureWithValues[] | null;
  featureValuePrices: FeatureValuePrice[] | null;
}

const initialState: ProductState = {
  features: [],
  featureValuePrices: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addFeatures: (state, action: PayloadAction<FeatureWithValues[]>) => {
      state.features = action.payload;
    },
    addFeature: (state, action: PayloadAction<FeatureWithValues>) => {
      const { featureId } = action.payload;

      if (state.features?.some((v) => v.featureId === featureId)) {
        // remove first the feature that already exist
        state.features = state.features.filter(
          (e) => e.featureId !== featureId
        );

        // now push the new one
        state.features.push(action.payload);
      } else {
        state.features?.push(action.payload);
      }
    },
    addAndRemoveFeaturePrices: (
      state,
      action: PayloadAction<FeatureValuePrice>
    ) => {
      const { featureValueId } = action.payload;
      if (
        state.featureValuePrices?.some(
          (v) => v.featureValueId === featureValueId
        )
      ) {
        state.featureValuePrices = state.featureValuePrices?.filter(
          (v) => v.featureValueId !== featureValueId
        );
      } else {
        state.featureValuePrices?.push(action.payload);
      }
    },

    resetList: (state) => {
      state.featureValuePrices = [];
    },
  },
});

export const { addFeature, resetList, addFeatures, addAndRemoveFeaturePrices } =
  productSlice.actions;
export default productSlice.reducer;
