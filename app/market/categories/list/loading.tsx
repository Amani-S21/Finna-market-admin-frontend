import LoadingTable from "@/app/_components/LoadingTable";
import { CategoriesToolBar } from "../_components";
import { Flex } from "@radix-ui/themes";

const LoadingCategoriesPage = () => {
  return (
    <Flex direction="column" gap="4">
      <CategoriesToolBar />
      <LoadingTable columns={categoriesColumns} />
    </Flex>
  );
};

export const categoriesColumns: {
  label: string;
}[] = [
  { label: "N"},
  // { label: "Photo"},
  { label: "Catégories"},
  { label: "Date"},
  { label: "Sous catégorie"},
  { label: "Action"},
];

export default LoadingCategoriesPage;
