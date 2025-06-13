"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { CategoriesToolBar } from "../_components";
import CategoriesTable from "../_components/CategoriesTable";
import { useFetchCategories } from "../_features/hooks";
import LoadingCategoriesPage from "./loading";
import { Suspense } from "react";

const BuildCategoriesPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useFetchCategories({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingCategoriesPage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
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
    </Flex>
  );
};

const CategoriesPage = () => {
  return (
    <Suspense fallback={<LoadingCategoriesPage />}>
      <BuildCategoriesPage />
    </Suspense>
  );
};

export default CategoriesPage;
