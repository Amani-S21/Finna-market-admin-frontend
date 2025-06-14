"use client";

import BackButton from "@/app/_components/BackButton";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import LoadingShopDetails from "../../[id]/loading";
import { useFetchShopsById } from "../../_features/hooks";
import EditShopForm from "../../new/_components/EditShopForm";
import LoadingEditShopPage from "./loading";

const BuildEditShopPage = () => {
  const { status } = useSession();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const axios = useAxiosAuth();

  const {
    data: shop,
    isLoading,
    error,
  } = useFetchShopsById({
    axios,
    shopId: id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingShopDetails />;

  if (error) notFound();

  return (
    <div>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <IoStorefrontOutline />
          <span className="font-bold">Boutique</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour modifier la boutique
        </Text>
      </div>

      <EditShopForm shop={shop} />
    </div>
  );
};

const EditShopPage = () => {
  return (
    <Suspense fallback={<LoadingEditShopPage />}>
      <BuildEditShopPage />
    </Suspense>
  );
};

export default EditShopPage;
