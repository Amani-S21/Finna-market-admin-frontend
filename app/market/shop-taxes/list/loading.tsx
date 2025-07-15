import LoadingTable from "@/app/_components/LoadingTable";
import { Flex } from "@radix-ui/themes";
import { TaxesToolBar } from "../_components";

const LoadingShopTaxesPage = () => {
  return (
    <Flex direction="column" gap="4">
      <TaxesToolBar />
      <LoadingTable columns={taxePriceColumns} />
    </Flex>
  );
};

export const taxePriceColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Taxe" },
  { label: "Pourcentage" },
  { label: "Date" },
  { label: "Détails" },
];

export default LoadingShopTaxesPage;
