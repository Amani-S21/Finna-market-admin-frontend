"use client";

import React from "react";
import VehiclesListLoading from "./loading";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { BackButton, Pagination } from "@/app/_components";
import { Flex } from "@radix-ui/themes";
import VehiclesTable from "../../agencies/_components/VehiclesTable";
import VehiclesToolBar from "../_components/VehiclesToolBar";
import { useFetchVehicles } from "../_features/hooks";

const VehiclesListPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: vehiclesResponse,
    error,
    isLoading: isLoadingVehicles,
  } = useFetchVehicles({
    axios,
    page: Number(page),
    enabled: status === "authenticated",
  });

  if (isLoadingVehicles || status === "loading") return <VehiclesListLoading />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <BackButton />
      <VehiclesToolBar />
      {vehiclesResponse && (
        <VehiclesTable vehiclesResponse={vehiclesResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={vehiclesResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

export default VehiclesListPage;
