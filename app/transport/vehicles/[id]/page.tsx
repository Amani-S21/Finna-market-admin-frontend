"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { useFetchVehicle } from "../_features/hooks";
import LoadingVehicleDetails from "./loading";
import { formattedDate } from "@/app/lib/tools";
import router from "next/router";
import VehiclesTable from "../../agencies/_components/VehiclesTable";

const BuildVehicleDetailsPage = () => {
  const { status } = useSession();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const axios = useAxiosAuth();

  const {
    data: vehicleDetails,
    isLoading,
    error,
  } = useFetchVehicle({
    axios,
    id,
    enabled: status === "authenticated",
  });

  if (status === "loading" || isLoading) return <LoadingVehicleDetails />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4" gap="8">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            Détails du vehicule
          </Heading>
          <Text size="2">{formattedDate(`${vehicleDetails?.createdAt}`)}</Text>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Model
            </Text>
            <p className="mt-1">{vehicleDetails?.model}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Capacité
            </Text>
            <p className="mt-1">{vehicleDetails?.capacity} sièges</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Type
            </Text>
            <p className="mt-1">
              {vehicleDetails?.vehicleType.name}
            </p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Numero de plaque
            </Text>
            <p className="mt-1">
              {vehicleDetails?.plateNumber}
            </p>
          </Card>
        </div>
        <div>
          <Link href={`/transport/vehicles/edit/${vehicleDetails?.id}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

const VehicleDetailsPage = () => {
  return (
    <Suspense fallback={<LoadingVehicleDetails />}>
      <BuildVehicleDetailsPage />
    </Suspense>
  );
};

export default VehicleDetailsPage;
