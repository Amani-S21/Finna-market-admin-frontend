import LoadingTable from "@/app/_components/LoadingTable";
import { ProductsToolBar } from "../_components";
import { productColumns } from "../_components/ProductsTable";

const LoadingProductsPage = () => {
  

  return (
    <div>
      <ProductsToolBar />
      <LoadingTable columns={productColumns} />
    </div>
  );
};

export default LoadingProductsPage;
