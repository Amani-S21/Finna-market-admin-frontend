"use client";

import BackButton from "@/app/_components/BackButton";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import LoadingEditProductPage from "../../products/edit/[id]/loading";
import { useFetchShopsById } from "../_features/hooks";
import LoadingShopDetails from "./loading";
import { formattedDate } from "@/app/lib/tools";
import { Edit } from "lucide-react";

const BuildShopsDetailPage = () => {
  const { status } = useSession();

  const params = useParams<{ id: string }>();
  const id = params.id;
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

  const superMarketOwner =
    shop?.shopAffectations.length && shop?.shopAffectations[0].user;

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4" gap="8">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {shop?.name}
          </Heading>
          <Text size="2">{formattedDate(`${shop?.createdAt}`)}</Text>
          <Card mt="4">
            {superMarketOwner ? (
              <Flex align="center" gap="2">
                <div className="h-[40px] w-[40px] border border-gray-200 rounded-full uppercase flex items-center justify-center">{`${superMarketOwner?.fullName?.substring(
                  0,
                  1
                )}`}</div>
                <Flex direction="column">
                  <p className="lowercase first-letter:uppercase">
                    {superMarketOwner?.fullName}
                  </p>
                  <p className="text-sm font-bold text-gray-600">
                    {superMarketOwner?.phone}
                  </p>
                </Flex>
              </Flex>
            ) : (
              <Flex gap="4">
                <Text color="red" size="2">
                  Affecter un propriétaire
                </Text>
                <Link href={`/market/shops/affect/${shop?.id}`}>
                  <Edit size={18} style={{ color: "var(--accent-9)" }} />
                </Link>
              </Flex>
            )}
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Id National
            </Text>
            <p className="mt-1">{shop?.nationalId}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              RCCM
            </Text>
            <p className="mt-1">{shop?.rccm}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Code
            </Text>
            <p className="mt-1">{shop?.code}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Téléphone
            </Text>
            <p className="mt-1">{shop?.phone}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Addrèsse mail
            </Text>
            <p className="mt-1">{shop?.emailAddress}</p>
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

const ShopsDetailPage = () => {
  return (
    <Suspense fallback={<LoadingEditProductPage />}>
      <BuildShopsDetailPage />
    </Suspense>
  );
};

export default ShopsDetailPage;
