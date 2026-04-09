import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { TbCategoryMinus } from "react-icons/tb";

const HotelsToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <TbCategoryMinus />
          <span className="font-bold">Entréprises</span>
        </div>
        <Text as="p" size="2">
          Toutes les entreprise disponibles
        </Text>
      </div>

      <Link href="/booking/hotels/new">
        <Button>
          <span className="text-xs">Nouvel entréprise</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default HotelsToolBar;
