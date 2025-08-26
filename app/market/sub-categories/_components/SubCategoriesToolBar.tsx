import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { TbCategoryMinus } from "react-icons/tb";

const SubCategoriesToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <TbCategoryMinus />
          <span className="font-bold">Sous catégories</span>
        </div>
        <Text as="p" size="2">
          Toutes les sous catégories disponibles dans l'entreprise
        </Text>
      </div>

      <Link href="/market/sub-categories/new">
        <Button>
          <span className="text-xs">Nouvelle sous catégorie</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default SubCategoriesToolBar;
