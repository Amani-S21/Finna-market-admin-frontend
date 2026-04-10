"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { useFetchRoomBookingById } from "../_features/hooks";
import BookingDetailsLoadingPage from "./loading";
import { BackButton } from "@/app/_components";
import { Card, Grid, Heading, Text } from "@radix-ui/themes";
import { formattedDate } from "@/app/lib/tools";

const BookingDetailsPage = () => {
  const { status, data: session } = useSession();
  const axios = useAxiosAuth();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  const {
    data: booking,
    isLoading,
    error,
  } = useFetchRoomBookingById({
    axios,
    id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <BookingDetailsLoadingPage />;

  if (error) notFound();

  return (
    <div>
      <BackButton />
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {booking?.customer.fullName}
          </Heading>
          <Text size="2">{formattedDate(`${booking?.createdAt}`)}</Text>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Catégorie
            </Text>
            <p className="mt-1">
              {booking?.roomCategory.roomCategoryType.name}
            </p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Entréprise
            </Text>
            <p className="mt-1">{booking?.hotel.name}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Status
            </Text>
            <p className="mt-1">{booking?.status}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Date début
            </Text>
            <p className="mt-1">{formattedDate(`${booking?.startDate}`)}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Date fin
            </Text>
            <p className="mt-1">{formattedDate(`${booking?.endDate}`)}</p>
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default BookingDetailsPage;
