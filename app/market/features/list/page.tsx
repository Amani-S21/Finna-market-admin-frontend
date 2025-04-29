"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { use } from "react";
import FeaturesTable from "../_components/FeaturesTable";
import FeaturesToolBar from "../_components/FeaturesToolBar";
import { useFetchFeatures } from "../_features/hooks";
import LoadingFeatures from "./loading";

const FeaturesPage = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const { page } = use(searchParams);

  const {
    data: featuresResponse,
    isLoading,
    error,
  } = useFetchFeatures({
    axios,
    page,
    enabled: status === "authenticated",
  });

  if (status === "loading" || isLoading) return LoadingFeatures();

  if (error) return <p>Erreur</p>;

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
