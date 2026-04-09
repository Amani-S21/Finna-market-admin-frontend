import React from 'react'

const RoomCategoriesListLoadingPage = () => {
  return (
    <div>
        <p>Chargement...</p>
    </div>
  )
}

export const roomCategoriesColumns: {
  label: string;
}[] = [
  { label: "N"},
  { label: "Photos"},
  { label: "Nom"},
  { label: "Prix"},
  { label: "Nbre. disponibles"},
  { label: "Action"},
];

export default RoomCategoriesListLoadingPage