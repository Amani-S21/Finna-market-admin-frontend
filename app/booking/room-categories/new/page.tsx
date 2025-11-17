"use client";

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { TbCategoryMinus } from "react-icons/tb";
import RoomCategoriesForm from "../_components/RoomCategoriesForm";
import NewRoomCategoriesPageLoading from "./loading";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useFetchRoomCategoryTypes } from "../_features/hooks";
import { useState } from "react";
import { RoomCategoryType } from "../_features/types";

const NewRoomCategoriesPage = () => {
  const {  status } = useSession();
  const axios = useAxiosAuth();
  const [selectedType, setSelectedType] = useState<
    RoomCategoryType | undefined
  >();
  // const searchParams = useSearchParams();
  // const page: string = searchParams.get("page") ?? "";

  const {
    data: roomCategoriesResponse,
    isLoading,
    
  } = useFetchRoomCategoryTypes({
    axios,
    page: "1",
    enabled: status === "authenticated",
  });

  if (status === "loading" || isLoading)
    return <NewRoomCategoriesPageLoading />;

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
      <RoomCategoriesForm
        roomCategoryTypes={roomCategoriesResponse?.data ?? []}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
    </>
  );
};

export default NewRoomCategoriesPage;
