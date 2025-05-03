import React from "react";
import UsersToolBar from "../_components/UsersToolBar";
import LoadingTable from "@/app/_components/LoadingTable";

const LoadingUsersPage = () => {
  return (
    <>
      <UsersToolBar />
      <LoadingTable columns={usersColumns} />
    </>
  );
};

export const usersColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Utilisateur" },
  { label: "Contact" },
  { label: "Date création" },
  { label: "Action" },
];

export default LoadingUsersPage;
