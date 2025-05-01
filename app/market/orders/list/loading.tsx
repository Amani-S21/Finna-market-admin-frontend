import LoadingTable from "@/app/_components/LoadingTable";
import OrdersToolBar from "../_components/OrdersToolBar";

export const ordersColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Commandé par" },
  { label: "Status" },
  { label: "Date" },
  { label: "Action" },
];

const LoadingOrdersPage = () => {
  return (
    <>
      <OrdersToolBar />
      <LoadingTable columns={ordersColumns} />
    </>
  );
};

export default LoadingOrdersPage;
