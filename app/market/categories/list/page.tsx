"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { use } from "react";
import { useFetchCategories } from "../_features/hooks";
import LoadingCategoriesPage from "./loading";
import { CategoriesToolBar } from "../_components";
import CategoriesTable from "../_components/CategoriesTable";
import { Pagination } from "@/app/_components";

const CategoriesPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const { page } = use(searchParams);

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useFetchCategories({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingCategoriesPage />;

  if (error) return;

  return (
    <>
      <CategoriesToolBar />
      {categoriesResponse && (
        <CategoriesTable categoriesResponse={categoriesResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={categoriesResponse?.count ?? 0}
        className="mt-4"
      />
    </>
  );
};

export default CategoriesPage;
