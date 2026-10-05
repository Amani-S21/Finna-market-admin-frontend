import { StatCard } from "@/app/_components/DashboardView";
import styles from "@/app/_components/dashboard.module.css";
import { RoomBookingSummary } from "../_features/types";

const RoomBookingSummaryArea = ({
  roomBookingSummaryCounts,
}: {
  roomBookingSummaryCounts: RoomBookingSummary;
}) => {
  return (
    <div className={styles.stats}>
      <StatCard
        title="Tout"
        description="Total de toutes les réservations"
        value={roomBookingSummaryCounts?.all ?? 0}
        link="/market/orders/list?status=OPEN&page=1"
      />
      <StatCard
        title="En cours"
        description="Total des réservations en cours"
        value={roomBookingSummaryCounts?.inProgress ?? 0}
        link="/market/orders/list?status=IN_PROGRESS&page=1"
      />
      <StatCard
        title="Annulées"
        description="Total des réservations annulées"
        value={roomBookingSummaryCounts?.canceled ?? 0}
        link="/market/orders/list?status=CANCELED&page=1"
      />
      <StatCard
        title="Confirmées"
        description="Total des réservations terminées"
        value={roomBookingSummaryCounts?.confirmed ?? 0}
        link="/market/orders/list?status=CLOSED&page=1"
      />
    </div>
  );
};

export default RoomBookingSummaryArea;
