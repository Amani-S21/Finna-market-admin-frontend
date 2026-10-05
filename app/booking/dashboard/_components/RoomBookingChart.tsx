import DashboardChart from "@/app/_components/DashboardChart";
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

  return <DashboardChart data={data} title="Réservations par statut" />;
};

export default RoomBookingsChart;
