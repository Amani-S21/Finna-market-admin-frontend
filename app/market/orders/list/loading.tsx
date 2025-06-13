import LoadingTable from "@/app/_components/LoadingTable";
import OrdersToolBar from "../_components/OrdersToolBar";
import { Flex } from "@radix-ui/themes";

const LoadingOrdersPage = () => {
  return (
    <Flex direction="column" gap="4">
      <OrdersToolBar />
      <LoadingTable columns={ordersColumns} />
    </Flex>
  );
};

export const ordersColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Date" },
  { label: "Client" },
  { label: "Livreur" },
  { label: "Status" },
  { label: "Action" },
];

export default LoadingOrdersPage;

// import React from "react";

// const LoadingOrdersPage = () => {
//   return <div>loading...</div>;
// };

// export default LoadingOrdersPage;
