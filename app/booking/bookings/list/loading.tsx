import React from 'react'

const LoadingBookingsList = () => {
  return (
    <div>Chargement...</div>
  )
}

export const roomBookingColumns: {
  label: string;
}[] = [
  { label: "N"},
  { label: "Client"},
  { label: "Catégorie"},
  { label: "Entréprise"},
  { label: "Status"},
  { label: "Date début"},
  { label: "Date fin"},
  { label: "Action"},
];


export default LoadingBookingsList