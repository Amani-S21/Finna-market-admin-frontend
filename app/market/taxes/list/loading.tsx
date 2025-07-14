import LoadingTable from "@/app/_components/LoadingTable";
import { Flex } from "@radix-ui/themes";
import { TaxesToolBar } from "../_components";

const LoadingTaxesPage = () => {
  return (
    <Flex direction="column" gap="4">
      <TaxesToolBar />
      <LoadingTable columns={taxesColumns} />
    </Flex>
  );
};

export const taxesColumns: {
  label: string;
}[] = [{ label: "N" }, { label: "Taxe" }, { label: "Date" }, { label: "Détails" }];

export default LoadingTaxesPage;
