"use client";

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FeatureForm } from "../../_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { notFound } from "next/navigation";
import { use } from "react";
import { useFetchFeatureById } from "../../_features/hooks";
import LoadingFeatureDetails from "../../[id]/loading";
import { useSession } from "next-auth/react";

const EditFeaturePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const { id } = use(params);
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

export default EditFeaturePage;
