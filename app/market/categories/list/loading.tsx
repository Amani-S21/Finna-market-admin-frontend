import LoadingTable from "@/app/_components/LoadingTable";
import { CategoriesToolBar } from "../_components";
import { categoriesColumns } from "../_components/CategoriesTable";

const LoadingCategoriesPage = () => {
  return (
    <>
      <CategoriesToolBar />
      <LoadingTable columns={categoriesColumns} />
    </>
  );
};

export default LoadingCategoriesPage;
