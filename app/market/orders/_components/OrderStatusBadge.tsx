import { Status } from "@/app/lib/types";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "green" | "yellow" | "red" | "blue" }
> = {
  OPEN: { label: "Ouvert", color: "green" },
  IN_PROGRESS: { label: "En cours", color: "yellow" },
  CANCELED: { label: "Annulé", color: "red" },
  CLOSED: { label: "Succès", color: "blue" },
};

const OrderStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default OrderStatusBadge;
