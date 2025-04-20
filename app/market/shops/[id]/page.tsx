"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Shop } from "@/app/lib/types";
import { Button, Card, Grid } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import LoadingShopDetails from "./loading";
import { notFound } from "next/navigation";

const ShopsDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const axios = useAxiosAuth();

  const {
    data: shop,
    isLoading,
    error,
    isError,
  } = useQuery<Shop>({
    queryKey: ["shop", id],
    queryFn: async () =>
      await axios.get(`/shops/${id}`).then((res) => res.data),
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingShopDetails />;

  if (error) return <LoadingShopDetails />;

  return (
    <Grid columns="2">
      <div>
        <p>{shop?.name}</p>
        <p>{shop?.createdAt}</p>
        <Card>{shop?.address}</Card>
        <Card>{shop?.users?.fullName}</Card>
      </div>
      <div>
        <Button>Modifier</Button>
      </div>
    </Grid>
  );
};

export default ShopsDetailPage;
