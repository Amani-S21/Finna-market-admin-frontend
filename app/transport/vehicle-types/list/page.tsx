"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import VehicleTypeToolBar from "../../_components/VehicleTypeToolBar";
import VehicleTypesTable from "../../_components/VehicleTypesTable";
import { useFetchVehicleTypes } from "../_features/hooks";
import LoadingVehicleTypePage from "./loading";

const VehicleTypePage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: vehicleTypesResponse,
    isLoading,
    error,
  } = useFetchVehicleTypes({
    axios,
    page,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingVehicleTypePage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <VehicleTypeToolBar />
      {vehicleTypesResponse && (
        <VehicleTypesTable vehicleTypeResponse={vehicleTypesResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={vehicleTypesResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

export default VehicleTypePage;
