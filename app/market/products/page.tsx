"use client";

import React, { use } from "react";
import { ProductsTable, ProductsToolBar } from "./_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { ProductsListResponse } from "@/app/lib/types";
import LoadingProductsPage from "./loading";
import { Pagination } from "@/app/_components";

const ProductsPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const axios = useAxiosAuth();
  const { page } = use(searchParams);

  const {
    data: productsResponse,
    isLoading,
    error,
  } = useQuery<ProductsListResponse>({
    queryKey: ["products", page],
    queryFn: () =>
      axios.get(`/products?page=${page}&limit=10`).then((res) => res.data),
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingProductsPage />;

  if (error) return;

  return (
    <div>
      <ProductsToolBar />
      {productsResponse && (
        <ProductsTable productsResponse={productsResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={productsResponse?.count ?? 0}
        className="mt-4"
      />
    </div>
  );
};

export default ProductsPage;
