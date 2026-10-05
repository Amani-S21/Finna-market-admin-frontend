import PageToolbar from "@/app/_components/PageToolbar";
import React from "react";
import { FaUsers } from "react-icons/fa6";
import UserRoleFilter from "./UserRoleFilter";
import { Roles } from "@/app/lib/types";

const UsersToolBar = ({ userRole }: { userRole?: Roles }) => {
  return (
    <PageToolbar icon={<FaUsers />} title="Utilisateurs" description="Tous les utilisateurs disponibles dans l'entreprise">
      {userRole === "SUPER_ADMIN" && <UserRoleFilter />}
    </PageToolbar>
  );
};

export default UsersToolBar;
