import { Button, Flex, Link, Text } from "@radix-ui/themes";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const ProductsToolBar = () => {
  return (
    <Flex justify="between">
      <div className="mb-2">
        <div className="flex items-center space-x-4">
          <IoStorefrontOutline />
          <span className="font-bold">Produits</span>
        </div>
        <Text as="p" size="2" mb="4">
          Tous les produits disponibles dans l'entreprise
        </Text>
      </div>

      <Link href="/market/products/new">
        <Button>
          <span className="text-xs">Nouveau produit</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default ProductsToolBar;
