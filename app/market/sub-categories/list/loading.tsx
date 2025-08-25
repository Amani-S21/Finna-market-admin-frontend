import LoadingTable from "@/app/_components/LoadingTable";
import { CategoriesToolBar } from "../_components";
import { Flex } from "@radix-ui/themes";

const LoadingSubCategoriesPage = () => {
  return (
    <Flex direction="column" gap="4">
      <CategoriesToolBar />
      <LoadingTable columns={subCategoriesColumns} />
    </Flex>
  );
};

export const subCategoriesColumns: {
  label: string;
}[] = [
  { label: "N"},
  { label: "Photo"},
  { label: "Sous catégorie"},
  { label: "Date"},
  { label: "Action"},
];

export default LoadingSubCategoriesPage;
