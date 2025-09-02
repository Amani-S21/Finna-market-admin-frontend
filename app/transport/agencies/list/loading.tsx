import React from 'react'

const AgenciesLoadingPage = () => {
  return (
    <div>Chargement...</div>
  )
}

export const agenciesColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Photo" },
  { label: "Agence" },
  { label: "Phone" },
  { label: "Visible" },
  { label: "Action" },
];

export default AgenciesLoadingPage