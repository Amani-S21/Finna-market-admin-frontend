"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { CategoriesToolBar } from "../_components";
import LoadingCategoriesPage from "./loading";
import { Suspense } from "react";
import { useFetchSubCategories } from "../_features/hooks";
import SubCategoriesTable from "../_components/SubCategoriesTable";

const BuildSubCategoriesPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: subCategoriesResponse,
    isLoading,
    error,
  } = useFetchSubCategories({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingCategoriesPage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <CategoriesToolBar />
      {subCategoriesResponse && (
        <SubCategoriesTable subCategoriesResponse={subCategoriesResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={subCategoriesResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

const SubCategoriesPage = () => {
  return (
    <Suspense fallback={<LoadingCategoriesPage />}>
      <BuildSubCategoriesPage />
    </Suspense>
  );
};

export default SubCategoriesPage;
