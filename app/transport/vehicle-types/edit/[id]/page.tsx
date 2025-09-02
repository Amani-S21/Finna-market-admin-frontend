"use client";

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import { TbCategoryMinus } from "react-icons/tb";
import VehicleTypeForm from "../../_components/VehicleTypeForm";
import { useFetchVehicleType } from "../../_features/hooks";
import LoadingVehicleTypesEdit from "./loading";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useParams, notFound } from "next/navigation";

const EditVehicleTypePage = () => {
  const { status } = useSession();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const axios = useAxiosAuth();

  const {
    data: vehicleType,
    isLoading,
    error,
  } = useFetchVehicleType({
    axios,
    id,
    enabled: status === "authenticated",
  });

  if (status === "loading") return <LoadingVehicleTypesEdit />;

  if (error) notFound();

  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Type de véhicule</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour modifier un nouveau type de
          vehicule
        </Text>
      </div>
      {vehicleType && <VehicleTypeForm vehicleType={vehicleType} />}
    </>
  );
};

export default EditVehicleTypePage;
