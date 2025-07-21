"use client";

import { Roles } from "@/app/lib/types";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const BuildUserRoleFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("role") || "ALL"}
      onValueChange={(role) => {
        const params = new URLSearchParams();

        if (role !== "ALL") params.append("role", role);

        if (searchParams.get("page"))
          params.append("page", searchParams.get("page")!);

        const query = params.size ? `?${params}` : "";
        router.push("/market/users/list" + query);
      }}
    >
      <Select.Trigger placeholder="Séléctionner un role" />
      <Select.Content>
        {userRoles.map((role) => (
          <Select.Item key={role.label} value={role.value}>
            {role.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

const UserRoleFilter = () => {
  return (
    <Suspense>
      <BuildUserRoleFilter />
    </Suspense>
  );
};

export const userRoles: { label: string; value: Roles | "ALL" }[] = [
  { label: "tout", value: "ALL" },
  { label: "client", value: "CUSTOMER" },
  { label: "livreur", value: "DELIVERER" },
  { label: "super admin", value: "SUPER_ADMIN" },
  { label: "super marché admin", value: "SUPER_MARKET_ADMIN" },
  { label: "Admin livraison", value: "DELIVERER_ADMIN" },
];

export default UserRoleFilter;
