"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import LoadingFeatureDetails from "../../[id]/loading";
import { FeatureForm } from "../../_components";
import { useFetchFeatureById } from "../../_features/hooks";
import { Suspense } from "react";

const BuildEditFeaturePage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const {
    data: feature,
    isLoading,
    error,
  } = useFetchFeatureById({
    axios,
    featureId: id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingFeatureDetails />;

  if (error) notFound();

  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <MdOutlineFeaturedPlayList />
          <span className="font-bold">Caractéristiques</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour modifier la caractéristique
        </Text>
      </div>

      <FeatureForm feature={feature} />
    </>
  );
};

const EditFeaturePage = () => {
  return (
    <Suspense fallback={<LoadingFeatureDetails />}>
      <BuildEditFeaturePage />
    </Suspense>
  );
};

export default EditFeaturePage;
