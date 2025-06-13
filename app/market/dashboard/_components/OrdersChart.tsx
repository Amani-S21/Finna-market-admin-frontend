import { OrderSymmary } from "@/app/lib/types";
import { Card } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

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

  return (
    <Card>
      <ResponsiveContainer width={500} height={440}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip
            wrapperStyle={{
              width: 100,
              backgroundColor: "#ccc",
            }}
          />
          <Bar
            dataKey="value"
            barSize={20}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default OrdersChart;
