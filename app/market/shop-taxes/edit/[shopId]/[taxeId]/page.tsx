"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Text } from "@radix-ui/themes";
import { DollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { ShopTaxeForm } from "../../../_components";
import { useFetchShopTaxe } from "../../../_features/hooks";
import LoadingTaxePricesDetailsPage from "./loading";

const EditShopTaxePage = () => {
  const { status } = useSession();
  const params = useParams<{ shopId: string; taxeId: string }>();
  const axios = useAxiosAuth();

  const {
    data: taxe,
    isLoading,
    error,
  } = useFetchShopTaxe({
    axios,
    shopId: params.shopId,
    taxeId: params.taxeId,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading")
    return <LoadingTaxePricesDetailsPage />;

  if (error) notFound();

  return (
    <div className="max-w-xl">
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <DollarSign size={18} />
          <span className="font-bold">Taxe</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour modifier le pourcentage de la taxe
        </Text>
      </div>

      <ShopTaxeForm tax={taxe} />
    </div>
  );
};

export default EditShopTaxePage;
