"use client";

import BackButton from "@/app/_components/BackButton";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { formatTime } from "@/app/lib/timeformat";
import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { useFetchSchedule } from "../_features/hooks";
import {
  default as LoadingAgencyDetails,
  default as LoadingScheduleDetailsPage,
} from "./loading";
import { getDayLabel } from "@/app/lib/tools";

const BuildScheduleDetailPage = () => {
  const { status } = useSession();

  const params = useParams<{ id: string }>();
  const id = params.id;
  const axios = useAxiosAuth();

  const {
    data: schedule,
    isLoading,
    error,
  } = useFetchSchedule({
    axios,
    id,
    enabled: status === "authenticated",
  });

  // const { data: vehiclesResponse, isLoading: isLoadingVehicles } =
  //   useFetchVehicles({
  //     axios,
  //     page: 1,
  //     enabled: status === "authenticated",
  //   });

  if (
    isLoading ||
    // || isLoadingVehicles
    status === "loading"
  )
    return <LoadingScheduleDetailsPage />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4" gap="8">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            Détails de l'horaire
          </Heading>
          <Text size="2">Les details de l'horaire d'un buss</Text>

          <Card variant="ghost" mt="6" className="mt-2">
            <Text size="2" className="text-gray-600 font-bold">
              Jour
            </Text>
            <p className="mt-1">{getDayLabel(schedule?.dayOfWeek ?? 0)}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Provenance
            </Text>
            <p className="mt-1">{schedule?.from.name}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Déstination
            </Text>
            <p className="mt-1">{schedule?.to.name}</p>
          </Card>

          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Heure de départ
            </Text>
            <p className="mt-1">{formatTime(`${schedule?.departure}`)}</p>
          </Card>

          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Heure d'arrivé
            </Text>
            <p className="mt-1">{formatTime(`${schedule?.arrival}`)}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="text-gray-600 font-bold">
              Prix
            </Text>
            <p className="mt-1">{schedule?.price}</p>
          </Card>

          <Flex justify="between" align="center" mt="6">
            <Heading className="lowercase first-letter:uppercase" mb="4">
              scales
            </Heading>
          </Flex>
          {schedule?.legs?.map((trip) => (
            <Card key={trip.id} mb="4">
              <Flex justify="between">
                <Flex direction="column">
                  <Card variant="ghost">
                    <Text size="2" className="text-gray-600 font-bold">
                      Heure de départ
                    </Text>
                    <p className="mt-1">{formatTime(`${trip.departure}`)}</p>
                  </Card>
                  <Card mt="4" variant="ghost">
                    <Text size="2" className="text-gray-600 font-bold">
                      Heure d'arrivé
                    </Text>
                    <p className="mt-1">{formatTime(`${trip.arrival}`)}</p>
                  </Card>
                  <Card mt="4" variant="ghost">
                    <Text size="2" className="text-gray-600 font-bold">
                      Provenance
                    </Text>
                    <p className="mt-1">{trip.from.name}</p>
                  </Card>
                  <Card mt="4" variant="ghost">
                    <Text size="2" className="text-gray-600 font-bold">
                      Déstination
                    </Text>
                    <p className="mt-1">{trip.to.name}</p>
                  </Card>
                  <Card mt="4" variant="ghost">
                    <Text size="2" className="text-gray-600 font-bold">
                      Prix
                    </Text>
                    <p className="mt-1">{trip.price}</p>
                  </Card>
                  <Card mt="4" variant="ghost">
                    <Text size="2" className="text-gray-600 font-bold">
                      Numero du scale
                    </Text>
                    <p className="mt-1">{trip.order}</p>
                  </Card>
                </Flex>
              </Flex>
            </Card>
          ))}
        </div>
        <div>
          <Link href={`/transport/schedules/edit/${schedule?.id}`}>
            <Button>Modifier l'horaire</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

const AgenciesDetailPage = () => {
  return (
    <Suspense fallback={<LoadingAgencyDetails />}>
      <BuildScheduleDetailPage />
    </Suspense>
  );
};



export default AgenciesDetailPage;
