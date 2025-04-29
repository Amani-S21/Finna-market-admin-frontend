import LoadingTable from "@/app/_components/LoadingTable";
import "react-loading-skeleton/dist/skeleton.css";
import { ShopsToolBar } from "../_components";

const LoadingShopspPage = () => {
  return (
    <div>
      <ShopsToolBar />
      <LoadingTable />
    </div>
  );
};

export default LoadingShopspPage;
