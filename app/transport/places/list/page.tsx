"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import VehicleTypeToolBar from "../../_components/VehicleTypeToolBar";
import LoadingVehicleTypePage from "./loading";
import VehicleTypesTable from "../_components/PlacesTable";
import PlacesToolBar from "../_components/PlaceToolBar";
import { useFetchPlaces } from "../_features/hooks";
import PlacesTable from "../_components/PlacesTable";

const VehicleTypePage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: placesResponse,
    isLoading,
    error,
  } = useFetchPlaces({
    axios,
    page,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingVehicleTypePage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <PlacesToolBar />
      {placesResponse && (
        <PlacesTable placesResponse={placesResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={placesResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

export default VehicleTypePage;
