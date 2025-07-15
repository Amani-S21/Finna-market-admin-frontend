"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import React from "react";
import { useFetchShopTaxe } from "../../_features/hooks";
import LoadingTaxePricesDetailsPage from "./loading";
import { BackButton } from "@/app/_components";
import { Button, Grid, Heading, Link, Text } from "@radix-ui/themes";

const TaxesPricesDetailsPage = () => {
  const { status } = useSession();
  const params = useParams<{ shopId: string; taxeId: string }>();
  const axios = useAxiosAuth();

  const {
    data: taxe,
    isLoading,
    error,
  } = useFetchShopTaxe({
    axios,
    shopId: params.shopId,
    taxeId: params.taxeId,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading")
    return <LoadingTaxePricesDetailsPage />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {taxe?.price}
          </Heading>
          <Text size="2">{taxe?.createdAt}</Text>
          <p>{taxe?.price}</p>
        </div>
        <div>
          <Link href={`/market/taxes/edit/${taxe?.shopId}/${taxe?.taxeId}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default TaxesPricesDetailsPage;
