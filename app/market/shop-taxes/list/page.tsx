"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { TaxesToolBar } from "../_components";
import TaxesPriceTable from "../_components/TaxesPriceTable";
import { useFetchShopTaxes } from "../_features/hooks";
import LoadingShopTaxesPage from "./loading";

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
      <TaxesToolBar />
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
