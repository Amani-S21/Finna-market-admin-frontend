import React from "react";
import UsersToolBar from "../_components/UsersToolBar";
import LoadingTable from "@/app/_components/LoadingTable";
import { Flex } from "@radix-ui/themes";

const LoadingUsersPage = () => {
  return (
    <Flex direction="column" gap="4">
      <UsersToolBar />
      <LoadingTable columns={usersColumns} />
    </Flex>
  );
};

export const usersColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Utilisateur" },
  { label: "Role" },
  { label: "Contact" },
  { label: "Date création" },
  { label: "Action" },
];

export default LoadingUsersPage;
