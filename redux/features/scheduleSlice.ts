import { TripLegPayload } from "@/app/transport/schedules/_features/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface AgencyState {
  tripLegs: TripLegPayload[] | null;
}

const initialState: AgencyState = {
  tripLegs: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addTripLeg: (state, action: PayloadAction<TripLegPayload>) => {
      const exists = state.tripLegs?.some(
        (trip) => trip.order === action.payload.order
      );

      if (!exists) {
        state.tripLegs?.push(action.payload);
        toast.success("Ajouté a la liste");
      } else {
        toast.error("Scale du meme ordre existe déjà");
      }
    },
    deleteTripLeg: (state, action: PayloadAction<TripLegPayload>) => {
      if (state.tripLegs) {
        state.tripLegs = state.tripLegs.filter(
          (v) => v.id !== action.payload.id
        );
        toast.success("Segment supprimé de la liste");
      }
    },
  },
});

export const { addTripLeg, deleteTripLeg } = scheduleSlice.actions;
export default scheduleSlice.reducer;
