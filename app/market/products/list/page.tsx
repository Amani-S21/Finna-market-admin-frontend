"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { use } from "react";
import LoadingProductsPage from "./loading";
import { ProductsToolBar, ProductsTable } from "../_components";
import { useFetchProducts } from "../_features/hooks";
import { useSession } from "next-auth/react";
import { Flex } from "@radix-ui/themes";

const ProductsPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const { page } = use(searchParams);

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

export default ProductsPage;
