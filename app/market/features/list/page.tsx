"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import FeaturesTable from "../_components/FeaturesTable";
import FeaturesToolBar from "../_components/FeaturesToolBar";
import { useFetchFeatures } from "../_features/hooks";
import LoadingFeatures from "./loading";
import { Suspense } from "react";

const FeaturesPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";

  const {
    data: featuresResponse,
    isLoading,
    error,
  } = useFetchFeatures({
    axios,
    page,
    enabled: status === "authenticated",
  });

  if (status === "loading" || isLoading) return <LoadingFeatures />;

  if (error) return <p>Erreur</p>;

  return (
    <Suspense fallback={<LoadingFeatures />}>
      <Flex direction="column" gap="4">
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
      </Flex>
    </Suspense>
  );
};

export default FeaturesPage;
