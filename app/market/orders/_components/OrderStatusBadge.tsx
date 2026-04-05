import { Status } from "@/app/lib/types";
import { Badge, Text } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "green" | "yellow" | "red" | "blue" }
> = {
  OPEN: { label: "Ouvert", color: "green" },
  IN_PROGRESS: { label: "En cours", color: "yellow" },
  PENDING: { label: "En cours", color: "yellow" },
  CANCELED: { label: "Annulé", color: "red" },
  CLOSED: { label: "Succès", color: "blue" },
  CONFIRMED: { label: "Succès", color: "blue" },
};

const OrderStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>
      <Text size="2">{statusMap[status].label}</Text>
    </Badge>
  );
};

export default OrderStatusBadge;
