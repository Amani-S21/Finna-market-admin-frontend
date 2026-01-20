import LoadingTable from "@/app/_components/LoadingTable";
import { Flex } from "@radix-ui/themes";
import ShopOrdersToolBar from "../_components/ShopOrdersToolBar";

const LoadingOrdersPage = () => {
  return (
    <Flex direction="column" gap="4">
      <ShopOrdersToolBar  />
      <LoadingTable columns={shopOrdersColumns} />
    </Flex>
  );
};

export const shopOrdersColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Qr-code" },
  { label: "Date" },
  { label: "Prix" },
  { label: "Type" },
  { label: "Status" },
  { label: "Action" },
];

export default LoadingOrdersPage;
