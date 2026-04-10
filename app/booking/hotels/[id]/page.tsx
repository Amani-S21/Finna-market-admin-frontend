"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import React from "react";
import { useFetchHotelById } from "../_features/hooks";
import HotelDetailsLoadingPage from "./loading";
import { BackButton } from "@/app/_components";
import { Button, Card, Grid, Heading, Text } from "@radix-ui/themes";
import { formattedDate } from "@/app/lib/tools";
import Link from "next/link";

const HotelDetailsPage = () => {
  const { status, data: session } = useSession();
  const axios = useAxiosAuth();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  const {
    data: enterprise,
    isLoading,
    error,
  } = useFetchHotelById({
    axios,
    id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <HotelDetailsLoadingPage />;

  if (error) notFound();

  return (
    <div>
      <BackButton />
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {enterprise?.name}
          </Heading>
          <Text size="2">{formattedDate(`${enterprise?.createdAt}`)}</Text>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Ville
            </Text>
            <p className="mt-1">{enterprise?.city}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Pays
            </Text>
            <p className="mt-1">{enterprise?.country}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Addrèsse
            </Text>
            <p className="mt-1">{enterprise?.address}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Déscription
            </Text>
            <p className="mt-1">{enterprise?.description}</p>
          </Card>
        </div>
        <div>
          <Link href={`/booking/hotels/edit/${enterprise?.id}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </div>
  );
};

export default HotelDetailsPage;
