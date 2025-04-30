import LoadingTable from "@/app/_components/LoadingTable";
import "react-loading-skeleton/dist/skeleton.css";
import { ShopsToolBar } from "../_components";

export const shopsColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Boutique" },
  { label: "Addrèsse" },
  { label: "Date" },
  { label: "Action" },
];

const LoadingShopspPage = () => {
  return (
    <div>
      <ShopsToolBar />
      <LoadingTable columns={shopsColumns} />
    </div>
  );
};

export default LoadingShopspPage;
