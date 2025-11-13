"use client";

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import React, { Suspense } from "react";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FeatureForm } from "../_components";
import NewFeaturesLoadingPage from "../new2/loading";

const BuildNewFeaturePage = () => {
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

const NewFeaturePage = () => {
  return (
    <Suspense fallback={<NewFeaturesLoadingPage />}>
      <BuildNewFeaturePage />
    </Suspense>
  );
};

export default NewFeaturePage;
