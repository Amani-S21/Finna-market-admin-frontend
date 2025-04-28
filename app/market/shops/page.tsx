"use client";

import Pagination from "@/app/_components/Pagination";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { use } from "react";
import { ShopsTable, ShopsToolBar } from "./_components";
import { useFetchShops } from "./_features/hooks";
import LoadingShopspPage from "./loading";

const ShopsPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const axios = useAxiosAuth();
  const { page } = use(searchParams);

  const {
    data: shopsResponse,
    isLoading,
    error,
  } = useFetchShops({ axios, page });

  if (isLoading) return <LoadingShopspPage />;

  if (error) return;

  return (
    <div>
      <ShopsToolBar />
      {shopsResponse && <ShopsTable shopsResponse={shopsResponse} />}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={shopsResponse?.count ?? 0}
        className="mt-4"
      />
    </div>
  );
};

export default ShopsPage;
