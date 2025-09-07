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

export const seatsColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Nom" },
  { label: "Type" },
  { label: "Action" },
];

export default LoadingVehicleDetails;
