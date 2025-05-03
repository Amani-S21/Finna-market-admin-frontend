import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import { FaUsers } from "react-icons/fa6";
import UserRoleFilter from "./UserRoleFilter";

const UsersToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <FaUsers />
          <span className="font-bold">Utilisateurs</span>
        </div>
        <Text as="p" size="2">
          Tous les utilisateurs disponibles dans l'entreprise
        </Text>
      </div>
      <UserRoleFilter />
    </Flex>
  );
};

export default UsersToolBar;
