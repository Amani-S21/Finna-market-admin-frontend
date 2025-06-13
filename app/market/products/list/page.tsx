"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ProductsTable, ProductsToolBar } from "../_components";
import { useFetchProducts } from "../_features/hooks";
import LoadingProductsPage from "./loading";
import { Suspense } from "react";

const BuildProductsPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: productsResponse,
    isLoading,
    error,
  } = useFetchProducts({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingProductsPage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <ProductsToolBar />
      {productsResponse && (
        <ProductsTable productsResponse={productsResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={productsResponse?.count ?? 0}
      />
    </Flex>
  );
};

const ProductsPage = () => {
  return (
    <Suspense fallback={<LoadingProductsPage />}>
      <BuildProductsPage />
    </Suspense>
  );
};

export default ProductsPage;
