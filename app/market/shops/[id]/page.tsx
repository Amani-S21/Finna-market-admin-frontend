"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Shop } from "@/app/lib/types";
import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import LoadingShopDetails from "./loading";
import { notFound } from "next/navigation";
import BackButton from "@/app/_components/BackButton";
import Link from "next/link";

const ShopsDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const axios = useAxiosAuth();

  const {
    data: shop,
    isLoading,
    error,
  } = useQuery<Shop>({
    queryKey: ["shop", id],
    queryFn: async () =>
      await axios.get(`/shops/${id}`).then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <LoadingShopDetails />;

  if (error) notFound();

  return (
    <div>
      <BackButton />
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {shop?.name}
          </Heading>
          <Text size="2">{shop?.createdAt}</Text>
          <Card mt="4">
            <Flex align="center" gap="2">
              <div className="h-[40px] w-[40px] border border-gray-200 rounded-full uppercase flex items-center justify-center">{`${shop?.users?.fullName.substring(
                0,
                1
              )}`}</div>
              <Flex direction="column">
                <p className="lowercase first-letter:uppercase">
                  {shop?.users?.fullName}
                </p>
                <p className="text-sm font-bold text-gray-600">
                  {shop?.users?.phone}
                </p>
              </Flex>
            </Flex>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Addrèsse
            </Text>
            <p className="mt-2">{shop?.address}</p>
          </Card>
        </div>
        <div>
          <Link href={`/market/shops/${shop?.id}/edit`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </div>
  );
};

export default ShopsDetailPage;
