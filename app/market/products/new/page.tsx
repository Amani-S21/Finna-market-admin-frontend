"use client";

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import { AiOutlineProduct } from "react-icons/ai";
import { ProductForm } from "../_components";

const NewProductPage = () => {
  return (
    <div className="">
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <AiOutlineProduct />
          <span className="font-bold">Produit</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer un nouveau produit
        </Text>
      </div>

      <ProductForm />
    </div>
  );
};

export default NewProductPage;
