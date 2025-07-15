"use client"

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useFetchShopTaxes } from "../_features/hooks";
import LoadingShopTaxesPage from "./loading";
import { Flex } from "@radix-ui/themes";
import { Pagination } from "@/app/_components";
import TaxesPriceTable from "../_components/TaxesPriceTable";

const ShopTaxesPage = () => {
  const { status, data: session } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";
  const shopId = session?.data.shopAffectations[0].shopId || "";

  const {
    data: taxesResponse,
    isLoading,
    error,
  } = useFetchShopTaxes({
    axios,
    shopId,
    page,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingShopTaxesPage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <ShopTaxesPage />
      {taxesResponse && <TaxesPriceTable taxesResponse={taxesResponse} />}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={taxesResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

export default ShopTaxesPage;
