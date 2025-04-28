"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { use } from "react";
import { ProductsTable, ProductsToolBar } from "./_components";
import { useFetchProducts } from "./_features/hooks";
import LoadingProductsPage from "./loading";

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
  } = useFetchProducts({ axios, page });

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
