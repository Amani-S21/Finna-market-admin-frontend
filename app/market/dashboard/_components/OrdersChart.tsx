import { OrderSymmary } from "@/app/lib/types";
import DashboardChart from "@/app/_components/DashboardChart";

const OrdersChart = ({
  orderSummaryCounts,
}: {
  orderSummaryCounts: OrderSymmary;
}) => {
  const data = [
    { label: "Ouverts", value: orderSummaryCounts.opened },
    { label: "En cours", value: orderSummaryCounts.inProgress },
    { label: "Annulées", value: orderSummaryCounts.canceled },
    { label: "Terminées", value: orderSummaryCounts.closed },
  ];

  return <DashboardChart data={data} title="Commandes par statut" />;
};

export default OrdersChart;
