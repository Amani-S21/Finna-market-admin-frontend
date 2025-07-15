"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { useFetchTaxeById } from "../_features/hooks";
import LoadingTaxeDetails from "./loading";

const BuildTaxeDetails = () => {
  const { status } = useSession();
  const params = useParams<{ id: string }>();
  const axios = useAxiosAuth();

  const {
    data: taxe,
    isLoading,
    error,
  } = useFetchTaxeById({
    axios,
    taxeId: params.id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingTaxeDetails />;

  if (error) notFound();
  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {taxe?.name}
          </Heading>
          <Text size="2">{taxe?.createdAt}</Text>
          <Text mt="4" size="2" as="p" className="font-bold">
            Taxe
          </Text>
        </div>
        <div>
          <Link href={`/market/taxes/edit/${taxe?.id}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

const TaxeDetails = () => {
  return (
    <Suspense fallback={<LoadingTaxeDetails />}>
      <BuildTaxeDetails />
    </Suspense>
  );
};

export default TaxeDetails;
