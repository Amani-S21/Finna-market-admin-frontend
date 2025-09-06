"use client";

import BackButton from "@/app/_components/BackButton";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { formattedDate } from "@/app/lib/tools";
import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { useFetchAgency, useFetchVehicles } from "../_features/hooks";
import LoadingAgencyDetails from "./loading";
import VehiclesTable from "../_components/VehiclesTable";
import { Row } from "@radix-ui/themes/components/table";

const BuildAgencyDetailPage = () => {
  const { status } = useSession();

  const params = useParams<{ id: string }>();
  const id = params.id;
  const axios = useAxiosAuth();

  const {
    data: agency,
    isLoading,
    error,
  } = useFetchAgency({
    axios,
    id,
    enabled: status === "authenticated",
  });

  const { data: vehiclesResponse, isLoading: isLoadingVehicles } =
    useFetchVehicles({
      axios,
      page: 1,
      enabled: status === "authenticated",
    });

  if (isLoading || isLoadingVehicles || status === "loading")
    return <LoadingAgencyDetails />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4" gap="8">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {agency?.name}
          </Heading>
          <Text size="2">{formattedDate(`${agency?.createdAt}`)}</Text>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Nom de l'agence
            </Text>
            <p className="mt-1">{agency?.name}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Addrèsse
            </Text>
            <p className="mt-1">{agency?.address}</p>
          </Card>

          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Téléphone
            </Text>
            <p className="mt-1">{agency?.phone}</p>
          </Card>
          <Card mt="4" mb="6" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Addrèsse mail
            </Text>
            <p className="mt-1">{agency?.email}</p>
          </Card>
          <Flex justify="between" align="center">
            <Heading className="lowercase first-letter:uppercase" mb="4">
              Quelques engins
            </Heading>
            <Text className="hover:cursor-pointer">Voir plus</Text>
          </Flex>
          {vehiclesResponse && (
            <VehiclesTable vehiclesResponse={vehiclesResponse} />
          )}
        </div>
        <div>
          <Link href={`/transport/agencies/edit/${agency?.id}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

const AgenciesDetailPage = () => {
  return (
    <Suspense fallback={<LoadingAgencyDetails />}>
      <BuildAgencyDetailPage />
    </Suspense>
  );
};

export default AgenciesDetailPage;
