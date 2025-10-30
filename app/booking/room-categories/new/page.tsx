"use client";

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { TbCategoryMinus } from "react-icons/tb";
import NewHotelPageLoading from "./loading";
import NewRoomCategoriesPageLoading from "./loading";
import RoomCategoriesForm from "../_components/RoomCategoriesForm";

const NewRoomCategoriesPage = () => {
  const { data: session, status } = useSession();
  // const axios = useAxiosAuth();
  // const searchParams = useSearchParams();
  // const page: string = searchParams.get("page") ?? "";

  // const {
  //   data: hotelsResponse,
  //   isLoading,
  //   error,
  // } = useFetchHotels({ axios, page, enabled: status === "authenticated" });

  if (status === "loading") return <NewRoomCategoriesPageLoading />;

  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Catégories des chambres</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer une nouvelle catégorie de
          chambre
        </Text>
      </div>
      <RoomCategoriesForm />
    </>
  );
};

export default NewRoomCategoriesPage;
