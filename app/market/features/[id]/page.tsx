"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Grid, Heading, Link, Text } from "@radix-ui/themes";
import { use } from "react";
import { useFetchFeatureById } from "../_features/hooks";
import { SelectSearchItem } from "../../products/_components";
import LoadingFeatureDetails from "./loading";
import { notFound } from "next/navigation";

const FeatureDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const axios = useAxiosAuth();
  const { id } = use(params);
  const {
    data: feature,
    isLoading,
    error,
  } = useFetchFeatureById({
    axios,
    featureId: id,
  });

  if (isLoading) return <LoadingFeatureDetails />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {feature?.name}
          </Heading>
          <Text size="2">{feature?.createdAt}</Text>

          <Text mt="4" size="2" as="p" className="font-bold">
            Valeurs de la caractéristique
          </Text>
          {(feature?.featuresHasFeatureValues ?? []).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {feature?.featuresHasFeatureValues?.map((v) => (
                <SelectSearchItem
                  key={v.featureValueId}
                  title={v.featureValues.value}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <Link href={`/market/features/edit/${feature?.id}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default FeatureDetails;
