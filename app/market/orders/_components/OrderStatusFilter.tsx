import { Status } from "@/app/lib/types";
import { Select } from "@radix-ui/themes";

const OrderStatusFilter = () => {
  return (
    <Select.Root>
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

const statusses: { label: string; value: Status | "ALL" }[] = [
  { label: "Tout", value : "ALL"},
  { label: "Ouvert", value: "OPEN" },
  { label: "En cours", value: "IN_PROGRESS" },
  { label: "Annulé", value: "CANCELED" },
  { label: "Terminé", value: "CLOSED" },
];

export default OrderStatusFilter;
