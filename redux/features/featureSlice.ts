import {
  FeatureValue,
  FeatureValuePrice,
  FeatureWithValues,
} from "@/app/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeatureState {
  features: FeatureWithValues[] | null;
  featureValues: FeatureValue[] | null;
  featureValuePrices: FeatureValuePrice[] | null;
}

const initialState: FeatureState = {
  features: [],
  featureValues: [],
  featureValuePrices: [],
};

const featureSlice = createSlice({
  name: "feature",
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
    addFeatureValue: (state, action: PayloadAction<FeatureValue>) => {
      state.featureValues?.push(action.payload);
    },

    updateFeatureValue: (state, action: PayloadAction<FeatureValue>) => {
      const index =
        state.featureValues?.findIndex(
          (v) => v.index === action.payload.index
        ) ?? 0;

      

      state.featureValues![index] = {
        id: action.payload.id,
        index: action.payload.index,
        value: action.payload.value,
      };
    },

    addFeatureValues: (state, action: PayloadAction<FeatureValue[]>) => {
      state.featureValues = [];
      state.featureValues?.push(...action.payload);
    },

    removeFeatureValue: (state, action: PayloadAction<{ feature: string }>) => {
      state.featureValues =
        state.featureValues?.filter(
          (v) => v.value !== action.payload.feature
        ) ?? [];
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

    removeFeature: (state, action: PayloadAction<{ featureId: string }>) => {
      state.features =
        state.features?.filter(
          (feature) => feature.featureId !== action.payload.featureId
        ) ?? [];
    },

    resetList: (state) => {
      state.featureValuePrices = [];
    },
  },
});

export const {
  addFeature,
  updateFeatureValue,
  addFeatureValue,
  addFeatureValues,
  resetList,
  removeFeature,
  removeFeatureValue,
  addFeatures,
  addAndRemoveFeaturePrices,
} = featureSlice.actions;
export default featureSlice.reducer;
