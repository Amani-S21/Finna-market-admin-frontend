import LoadingTable from "@/app/_components/LoadingTable";
import "react-loading-skeleton/dist/skeleton.css";
import { ShopsToolBar } from "../_components";
import { shopsColumns } from "../_components/ShopsTable";

const LoadingShopspPage = () => {
  return (
    <div>
      <ShopsToolBar />
      <LoadingTable columns={shopsColumns} />
    </div>
  );
};

export default LoadingShopspPage;
