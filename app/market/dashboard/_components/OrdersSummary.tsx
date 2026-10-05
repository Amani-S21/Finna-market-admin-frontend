import { OrderSymmary } from "@/app/lib/types";
import { StatCard } from "@/app/_components/DashboardView";
import styles from "@/app/_components/dashboard.module.css";

const OrdersSummary = ({
  orderSummaryCounts,
}: {
  orderSummaryCounts: OrderSymmary;
}) => {
  return (
    <div className={styles.stats}>
      <StatCard
        title="Ouverts"
        description="Total des commandes ouverts"
        value={orderSummaryCounts?.opened ?? 0}
        link="/market/orders/list?status=OPEN&page=1"
      />
      <StatCard
        title="En cours"
        description="Total des commandes en cours"
        value={orderSummaryCounts?.inProgress ?? 0}
        link="/market/orders/list?status=IN_PROGRESS&page=1"
      />
      <StatCard
        title="Annulées"
        description="Total des commandes annulées"
        value={orderSummaryCounts?.canceled ?? 0}
        link="/market/orders/list?status=CANCELED&page=1"
      />
      <StatCard
        title="Terminées"
        description="Total des commandes terminées"
        value={orderSummaryCounts?.closed ?? 0}
        link="/market/orders/list?status=CLOSED&page=1"
      />
    </div>
  );
};

export default OrdersSummary;
