import LoadingTable from "@/app/_components/LoadingTable";
import "react-loading-skeleton/dist/skeleton.css";
import { ShopsToolBar } from "../_components";
import { Flex } from "@radix-ui/themes";

const LoadingShopspPage = () => {
  return (
    <Flex direction="column" gap="4">
      <ShopsToolBar />
      <LoadingTable columns={shopsColumns} />
    </Flex>
  );
};

export const shopsColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Boutique" },
  { label: "Id Nat" },
  { label: "Rccm" },
  { label: "Code" },
  { label: "Date" },
  { label: "Action" },
];

export default LoadingShopspPage;
