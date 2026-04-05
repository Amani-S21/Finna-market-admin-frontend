import { Card } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RoomBookingSummary } from "../_features/types";

const RoomBookingsChart = (
  {
  roomBookingSummaryCounts,
}: {
  roomBookingSummaryCounts: RoomBookingSummary;
}
) => {
  const data = [
    { label: "Tout", value: roomBookingSummaryCounts.all },
    { label: "En cours", value: roomBookingSummaryCounts.inProgress },
    { label: "Confirmé", value: roomBookingSummaryCounts.confirmed },
    { label: "Annulés", value: roomBookingSummaryCounts.canceled },
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

export default RoomBookingsChart;
