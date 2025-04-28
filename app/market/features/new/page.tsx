import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import React from "react";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FeatureForm } from "../_components";

const NewFeaturePage = () => {
  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <MdOutlineFeaturedPlayList />
          <span className="font-bold">Caractéristiques</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer une nouvelle
          caractéristiques
        </Text>
      </div>

      <FeatureForm />
    </>
  );
};

export default NewFeaturePage;
