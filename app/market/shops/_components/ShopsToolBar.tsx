import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const ShopsToolBar = () => {
  return (
    <Flex justify="between">
      <div className="mb-2">
        <div className="flex items-center space-x-4">
          <IoStorefrontOutline />
          <span className="font-bold">Boutiques</span>
        </div>
        <Text as="p" size="2" mb="4">
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
