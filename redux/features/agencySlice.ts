import { TransportAgency } from "@/app/transport/agencies/_features/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AgencyState  {
  currentAgency: TransportAgency | null;
};

const initialState: AgencyState = {
  currentAgency: null,
};

const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {
    setAgency: (state, action: PayloadAction<TransportAgency>) => {
      state.currentAgency = action.payload;
    },
  },
});

export const { setAgency } = agencySlice.actions;
export default agencySlice.reducer;
