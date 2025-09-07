"use client";

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import React from "react";
import { TbCategoryMinus } from "react-icons/tb";
import VehicleTypeForm from "../../_components/SeatForm";
import { useParams } from "next/navigation";

const SeatsPage = () => {
  const params = useParams<{ id: string }>();
  const vehicleId = params.id;
  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Nouveau siège</span>
        </div>
        <Text as="p" size="2" mb="4">
          Completer ce champ pour créer un nouveau siège de buss
        </Text>
      </div>

      <VehicleTypeForm vehicleId={vehicleId} />
    </>
  );
};

export default SeatsPage;
