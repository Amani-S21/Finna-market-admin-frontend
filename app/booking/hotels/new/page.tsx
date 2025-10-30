"use client";

import React from "react";
import { useFetchHotels } from "../_features/hooks";
import LoadingHotelsList from "./loading";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Flex, Text } from "@radix-ui/themes";
import { BackButton, Pagination } from "@/app/_components";
import HotelsToolBar from "../_components/HotelsToolBar";
import HotelsTable from "../_components/HotelsTable";
import { TbCategoryMinus } from "react-icons/tb";
import HotelForm from "../_components/HotelForm";

const NewHotelPage = () => {
  // const { status } = useSession();
  // const axios = useAxiosAuth();
  // const searchParams = useSearchParams();
  // const page: string = searchParams.get("page") ?? "";

  // const {
  //   data: hotelsResponse,
  //   isLoading,
  //   error,
  // } = useFetchHotels({ axios, page, enabled: status === "authenticated" });

  // if (isLoading || status === "loading") return <LoadingHotelsList />;

  // if (error) return;

  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Hotels</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer un hotel
        </Text>
      </div>
      <HotelForm />
    </>
  );
};

export default NewHotelPage;
