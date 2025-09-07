"use client";

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import React from "react";
import { TbCategoryMinus } from "react-icons/tb";
import VehicleTypeForm from "../../_components/SeatForm";
import { notFound, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFetchSeat } from "../../_features/hooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import LoadingEditSeatsPage from "./loading";

const EditSeatsPage = () => {
  const axios = useAxiosAuth();
  const { status } = useSession();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data: seat,
    isLoading,
    error,
  } = useFetchSeat({
    axios,
    id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingEditSeatsPage />;

  if (error) notFound();
  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Modifier le siège</span>
        </div>
        <Text as="p" size="2" mb="4">
          Completer ce champ pour modifier siège éxistant
        </Text>
      </div>

      <VehicleTypeForm vehicleId={seat?.vehicleId ?? ""} seat={seat} />
    </>
  );
};

export default EditSeatsPage;
