import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import { FaUsers } from "react-icons/fa6";
import UserRoleFilter from "./UserRoleFilter";
import { Roles } from "@/app/lib/types";

const UsersToolBar = ({ userRole }: { userRole?: Roles }) => {
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
      {userRole === "SUPER_ADMIN" && <UserRoleFilter />}
    </Flex>
  );
};

export default UsersToolBar;
