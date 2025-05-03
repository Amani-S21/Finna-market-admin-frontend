import { Roles } from "@/app/lib/types";
import { Select } from "@radix-ui/themes";
import React from "react";

const UserRoleFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Séléctionner un role" />
      <Select.Content>
        {userRoles.map((role) => (
          <Select.Item key={role.label} value={role.value || ""}>
            {role.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export const userRoles: { label: string; value: Roles | "ALL" }[] = [
  { label: "tout", value: "ALL" },
  { label: "client", value: "CUSTOMER" },
  { label: "livreur", value: "DELIVERER" },
  { label: "super admin", value: "SUPER_ADMIN" },
  { label: "super marché admin", value: "SUPER_MARKET_ADMIN" },
];

export default UserRoleFilter;
