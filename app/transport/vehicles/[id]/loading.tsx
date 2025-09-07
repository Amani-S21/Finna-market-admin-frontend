import React from "react";

const LoadingVehicleDetails = () => {
  return <div>Chargement...</div>;
};

export const vehicleSchedulesColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Provenance" },
  { label: "Déstination" },
  { label: "Action" },
];

export default LoadingVehicleDetails;
