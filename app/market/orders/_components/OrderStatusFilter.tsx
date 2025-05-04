"use client";

import { Status } from "@/app/lib/types";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const OrderStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status !== "ALL") params.append("status", status);

        if (searchParams.get("page"))
          params.append("page", searchParams.get("page")!);

        const query = params.size ? `?${params}` : "";
        router.push("/market/orders/list" + query);
      }}
      defaultValue={searchParams.get("status") ?? "ALL"}
    >
      <Select.Trigger placeholder="Séléctionner un status" />
      <Select.Content>
        {statusses.map((status) => (
          <Select.Item key={status.label} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

const statusses: { label: string; value?: Status | "ALL" }[] = [
  { label: "Tout", value: "ALL" },
  { label: "Ouvert", value: "OPEN" },
  { label: "En cours", value: "IN_PROGRESS" },
  { label: "Annulé", value: "CANCELED" },
  { label: "Terminé", value: "CLOSED" },
];

export default OrderStatusFilter;
