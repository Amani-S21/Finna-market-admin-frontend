import LoadingTable from "@/app/_components/LoadingTable";
import { ProductsToolBar } from "../_components";
import { Flex } from "@radix-ui/themes";

const LoadingProductsPage = () => {
  return (
    <Flex direction="column" gap="4">
      <ProductsToolBar />
      <LoadingTable columns={productColumns} />
    </Flex>
  );
};

export const productColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Produit" },
  { label: "Addrèsse" },
  { label: "Date" },
  { label: "Action" },
];

export default LoadingProductsPage;
