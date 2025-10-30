import React from 'react'

const LoadingHotelsList = () => {
  return (
    <div>Chargement...</div>
  )
}

export const hotelsColumns: {
  label: string;
}[] = [
  { label: "N"},
  { label: "Photos"},
  { label: "Nom"},
  { label: "Date de création"},
  { label: "Action"},
];

export default LoadingHotelsList