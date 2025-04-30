import LoadingTable from "@/app/_components/LoadingTable";
import { ProductsToolBar } from "../_components";


export const productColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Boutique" },
  { label: "Addrèsse" },
  { label: "Date" },
  { label: "Action" },
];

const LoadingProductsPage = () => {
  

  return (
    <div>
      <ProductsToolBar />
      <LoadingTable columns={productColumns} />
    </div>
  );
};

export default LoadingProductsPage;
