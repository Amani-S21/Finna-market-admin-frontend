"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { BookingType } from "@/app/lib/types";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TbCategoryMinus } from "react-icons/tb";
import RoomCategoriesForm from "../_components/RoomCategoriesForm";
import {
  useFetchBookingTypes,
  useFetchComodities,
  useFetchRoomCategoryTypes,
} from "../_features/hooks";
import { RoomCategoryType } from "../_features/types";
import NewRoomCategoriesPageLoading from "./loading";

const NewRoomCategoriesPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const [selectedType, setSelectedType] = useState<
    RoomCategoryType | undefined
  >();
  const [selectedBookingType, setSelectedBookingType] = useState<
    BookingType | undefined
  >();

  const [selectedCommodities, setSelectedCommodities] = useState<string[]>([]);

  const { data: roomCategoriesResponse, isLoading } = useFetchRoomCategoryTypes(
    {
      axios,
      page: "1",
      bookingTypeId: `${selectedBookingType?.id}`,
      enabled: status === "authenticated" && !!selectedBookingType,
    },
  );

  const { data: comoditiesResponse, isLoading: isLoadingComodities } =
    useFetchComodities({
      axios,
      page: "1",
      enabled: status === "authenticated",
    });

  const { data: bookingTypesResponse } = useFetchBookingTypes({
    axios,
    page: "1",
    enabled: status === "authenticated",
  });

  if (status === "loading" || isLoading || isLoadingComodities)
    return <NewRoomCategoriesPageLoading />;

  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Catégories</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer une nouvelle catégorie de réservation
        </Text>
      </div>
      <RoomCategoriesForm
        roomCategoryTypes={roomCategoriesResponse?.data ?? []}
        commodities={comoditiesResponse?.data ?? []}
        bookingTypes={bookingTypesResponse?.data ?? []}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
        setSelectedBookingType={setSelectedBookingType}
        selectedBookingType={selectedBookingType}
        selectedCommodities={selectedCommodities}
        setSelectedCommodities={setSelectedCommodities}
      />
    </>
  );
};

export default NewRoomCategoriesPage;
