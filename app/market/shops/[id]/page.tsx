"use client";

import BackButton from "@/app/_components/BackButton";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useFetchShopsById } from "../_features/hooks";
import LoadingShopDetails from "./loading";

const ShopsDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { status } = useSession();
  const { id } = use(params);
  const axios = useAxiosAuth();

  const {
    data: shop,
    isLoading,
    error,
  } = useFetchShopsById({
    axios,
    shopId: id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingShopDetails />;

  if (error) notFound();

  return (
    <>
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
            <p className="mt-1">{shop?.address}</p>
          </Card>
        </div>
        <div>
          <Link href={`/market/shops/edit/${shop?.id}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default ShopsDetailPage;
