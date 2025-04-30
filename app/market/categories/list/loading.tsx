import LoadingTable from "@/app/_components/LoadingTable";
import { CategoriesToolBar } from "../_components";

const LoadingCategoriesPage = () => {
  return (
    <>
      <CategoriesToolBar />
      <LoadingTable />
    </>
  );
};

export default LoadingCategoriesPage;
