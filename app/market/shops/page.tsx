"use client";

import Pagination from "@/app/_components/Pagination";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import LoadingShopspPage from "./loading";
import { ShopsListResponse } from "@/app/lib/types";
import { ShopsTable, ShopsToolBar } from "./_components";

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
  } = useQuery<ShopsListResponse>({
    queryKey: ["shops", page],
    queryFn: () =>
      axios.get(`/shops?page=${page}&limit=10`).then((res) => res.data),
    staleTime: 60 * 1000,
  });

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
