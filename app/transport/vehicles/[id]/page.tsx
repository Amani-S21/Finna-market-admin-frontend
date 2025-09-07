"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { formattedDate } from "@/app/lib/tools";
import { Button, Card, Grid, Heading, Link, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { useFetchVehicle, useFetchVehicles } from "../_features/hooks";
import LoadingVehicleDetails from "./loading";
import { useFetchVehicleSchedules } from "../../schedules/_features/hooks";
import VehicleSchedulesTable from "../_components/VehicleSchedulesTable";

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

  const { data: vehicleSchedulesResponse, isLoading: isLoadingSchedules } =
    useFetchVehicleSchedules({
      axios,
      page: "1",
      vehicleId: id,
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
            <p className="mt-1">{vehicleDetails?.vehicleType.name}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Numero de plaque
            </Text>
            <p className="mt-1">{vehicleDetails?.plateNumber}</p>
          </Card>

          <Heading className="lowercase first-letter:uppercase" mt="6" mb="4">
            Quelques horaires du buss
          </Heading>
          {vehicleSchedulesResponse && (
            <VehicleSchedulesTable
              schedulesResponse={vehicleSchedulesResponse}
            />
          )}
        </div>
        <div className="flex gap-4">
          <Link href={`/transport/vehicles/edit/${vehicleDetails?.id}`}>
            <Button>Modifier le vehicule</Button>
          </Link>
          <Link href={`/transport/schedules/new/${vehicleDetails?.id}`}>
            <Button variant="outline">Nouvel horaire</Button>
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
