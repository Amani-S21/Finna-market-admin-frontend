"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { useFetchTaxes } from "../_features/hooks";
import LoadingTaxesPage from "./loading";
import { Flex } from "@radix-ui/themes";
import { Pagination } from "@/app/_components";
import { TaxesTable, TaxesToolBar } from "../_components";

const BuildTaxesPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: taxesResponse,
    isLoading,
    error,
  } = useFetchTaxes({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingTaxesPage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <TaxesToolBar />
      {taxesResponse && <TaxesTable taxesResponse={taxesResponse} />}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={taxesResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

const TaxesPage = () => {
  return (
    <Suspense fallback={<LoadingTaxesPage />}>
      <BuildTaxesPage />
    </Suspense>
  );
};

export default TaxesPage;
