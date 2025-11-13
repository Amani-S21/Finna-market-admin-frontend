import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import ShopProductForm from "../../_components/ShopProductForm";

const NewShopProductsPage = () => {
  return (
    <div>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <IoStorefrontOutline />
          <span className="font-bold">Nouveau produit de la boutique</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer un nouveau produit de la
          boutique
        </Text>
      </div>

      <ShopProductForm />
    </div>
  );
};

export default NewShopProductsPage;
