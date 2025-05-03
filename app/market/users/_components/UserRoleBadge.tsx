import { Roles } from "@/app/lib/types";
import { Badge, Heading } from "@radix-ui/themes";
import React from "react";

const UserRoleBadge = ({ role }: { role: Roles }) => {
  return (
    <Badge>
      <p className="lowercase first-letter:uppercase">{useRole[role]}</p>
    </Badge>
  );
};

const useRole: Record<Roles, string> = {
  CUSTOMER: "client",
  DELIVERER: "livreur",
  SUPER_ADMIN: "super admin",
  SUPER_MARKET_ADMIN: "super admin super marché",
};

export default UserRoleBadge;
