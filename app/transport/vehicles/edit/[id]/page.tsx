"use client";

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import React from "react";
import { TbCategoryMinus } from "react-icons/tb";
import VehicleForm from "../../_components/VehicleForm";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useFetchVehicle } from "../../_features/hooks";

const EditVehiclePage = () => {
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

  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Véhicule</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour modifier le vehicule
        </Text>
      </div>

      <VehicleForm agencyId={id} vehicle={vehicleDetails} />
    </>
  );
};

export default EditVehiclePage;
