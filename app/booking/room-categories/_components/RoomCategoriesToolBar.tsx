import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { TbCategoryMinus } from "react-icons/tb";

const RoomCategoriesToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <TbCategoryMinus />
          <span className="font-bold">Catégories des chambres</span>
        </div>
        <Text as="p" size="2">
          Toutes les catégories des chambres disponibles dans l'entreprise
        </Text>
      </div>

      <Link href="/booking/room-categories/new">
        <Button>
          <span className="text-xs">Nouvelle catégorie de chambre</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default RoomCategoriesToolBar;
