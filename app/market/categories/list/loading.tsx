import LoadingTable from "@/app/_components/LoadingTable";
import { CategoriesToolBar } from "../_components";


export const categoriesColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Catégories" },
  { label: "Date" },
  { label: "Valeurs" },
  { label: "Action" },
];

const LoadingCategoriesPage = () => {
  return (
    <>
      <CategoriesToolBar />
      <LoadingTable columns={categoriesColumns} />
    </>
  );
};

export default LoadingCategoriesPage;
