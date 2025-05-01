import LoadingTable from "@/app/_components/LoadingTable";
import OrdersToolBar from "../_components/OrdersToolBar";

export const ordersColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Date" },
  { label: "Client" },
  { label: "Status" },
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
