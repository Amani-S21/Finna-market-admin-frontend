"use client";

import React from "react";
import { useFetchTaxeById } from "../../_features/hooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { notFound, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingEditTaxePage from "./loading";
import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import { DollarSign } from "lucide-react";
import { TaxeForm } from "../../_components";

const EditTaxePage = () => {
  const { status } = useSession();
  const params = useParams<{ id: string }>();
  const axios = useAxiosAuth();

  const {
    data: taxe,
    isLoading,
    error,
  } = useFetchTaxeById({
    axios,
    taxeId: params.id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingEditTaxePage />;

  if (error) notFound();

  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <DollarSign size={18} />
          <span className="font-bold">Taxe</span>
        </div>
        <Text as="p" size="2" mb="4">
          Vous pouvez modifier la taxe
        </Text>
      </div>

      <TaxeForm taxe={taxe} />
    </>
  );
};

export default EditTaxePage;
