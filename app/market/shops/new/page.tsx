"use client";

import BackButton from "@/app/_components/BackButton";
import { Text } from "@radix-ui/themes";
import { IoStorefrontOutline } from "react-icons/io5";
import ShopForm from "./_components/NewShopForm";

const NewShopPage = () => {
  return (
    <div>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <IoStorefrontOutline />
          <span className="font-bold">Boutique</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer une nouvelle boutique
        </Text>
      </div>

      <ShopForm />
    </div>
  );
};

export default NewShopPage;
