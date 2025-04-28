"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import FeaturesToolBar from "./_components/FeaturesToolBar";
import { useFetchFeatures } from "./_features/hooks";
import { use } from "react";
import LoadingFeatures from "./loading";
import { Pagination } from "@/app/_components";
import FeaturesTable from "./_components/FeaturesTable";

const FeaturesPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = use(searchParams);
  const axios = useAxiosAuth();

  const {
    data: featuresResponse,
    isLoading,
    isError,
  } = useFetchFeatures({ axios, page });

  if (isLoading) return LoadingFeatures();

  if (isError) return null;

  return (
    <>
      <FeaturesToolBar />
      {featuresResponse && (
        <FeaturesTable featuresResponse={featuresResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={featuresResponse?.count ?? 0}
        className="mt-4"
      />
    </>
  );
};

export default FeaturesPage;
