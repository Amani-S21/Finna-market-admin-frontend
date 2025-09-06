"use client";

import { Pagination } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import AgenciesTable from "../../_components/AgenciesTable";
import AgenciesToolBar from "../../_components/ToolBar";
import { useFetchAgencies } from "../_features/hooks";
import AgenciesLoadingPage from "./loading";

const AgenciesPage = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "";
  // const params = useParams<{ id: string }>();
  // const id = params.id;

  const {
    data: agenciesResponse,
    isLoading,
    error,
  } = useFetchAgencies({ axios, page, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <AgenciesLoadingPage />;

  if (error) return;

  return (
    <Flex direction="column" gap="4">
      <AgenciesToolBar  />
      {agenciesResponse && (
        <AgenciesTable agenciesResponse={agenciesResponse} />
      )}
      <Pagination
        pageSize={10}
        currentPage={parseInt(page)}
        itemCount={agenciesResponse?.count ?? 0}
        className="mt-4"
      />
    </Flex>
  );
};

export default AgenciesPage;
