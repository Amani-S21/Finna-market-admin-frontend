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
  { label: "Nombre"},
  { label: "Action"},
];

export default RoomCategoriesListLoadingPage