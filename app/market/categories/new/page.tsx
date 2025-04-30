import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import React from "react";
import { TbCategoryMinus } from "react-icons/tb";
import CategoryForm from "../_components/CategoryForm";

const NewCategoryPage = () => {
  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Catégorie</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer une nouvelle catégorie
        </Text>
      </div>

      <CategoryForm />
    </>
  );
};

export default NewCategoryPage;
