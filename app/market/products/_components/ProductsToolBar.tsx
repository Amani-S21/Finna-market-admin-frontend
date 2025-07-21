import { Roles } from "@/app/lib/types";
import { Button, Flex, Link, Text } from "@radix-ui/themes";
import { Search } from "lucide-react";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const ProductsToolBar = ({ role }: { role?: Roles }) => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <IoStorefrontOutline />
          <span className="font-bold">Produits</span>
        </div>
        <Text as="p" size="2">
          Tous les produits disponibles dans l'entreprise
        </Text>
      </div>

      {role && role !== "SUPER_ADMIN" && (
        <Flex gap="4" align="center">
          <Search size={16} />
          <Link href="/market/products/new">
            <Button>
              <span className="text-xs">Nouveau produit</span>
            </Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default ProductsToolBar;
