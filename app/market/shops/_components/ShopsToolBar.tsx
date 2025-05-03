import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const ShopsToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <IoStorefrontOutline />
          <span className="font-bold">Boutiques</span>
        </div>
        <Text as="p" size="2">
          Toutes les boutiques disponibles dans l'entreprise
        </Text>
      </div>

      <Link href="/market/shops/new">
        <Button>
          <span className="text-xs">Nouvelle Boutique</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default ShopsToolBar;
