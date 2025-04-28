import { Button, Flex, Link, Text } from "@radix-ui/themes";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

const FeaturesToolBar = () => {
  return (
    <Flex justify="between">
      <div className="mb-2">
        <div className="flex items-center space-x-4">
          <MdOutlineFeaturedPlayList />
          <span className="font-bold">Caractéristiques</span>
        </div>
        <Text as="p" size="2" mb="4">
          Toutes les caractéristiques disponibles dans l'entreprise
        </Text>
      </div>

      <Link href="/market/features/new">
        <Button>
          <span className="text-xs">Nouvelle caractéristique</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default FeaturesToolBar;
