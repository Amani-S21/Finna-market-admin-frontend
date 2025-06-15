"use client";

import BackButton from "@/app/_components/BackButton";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import AffectShopForm from "../../_components/AffectShopForm";
import { useFetchShopsById } from "../../_features/hooks";
import LoadingAffectShop from "./loading";

const BuildAffectShopPage = () => {
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

  if (isLoading || status === "loading") return <LoadingAffectShop />;

  if (error) notFound();

  return (
    <div>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <IoStorefrontOutline />
          <span className="font-bold">Affecter une boutique</span>
        </div>
        <Text as="p" size="2" mb="4">
          Réchercher un utilisateur et affectez lui une boutique
        </Text>
      </div>

      <AffectShopForm shopId={`${shop?.id}`} />
    </div>
  );
};

const AffectShopPage = () => {
  return (
    <Suspense fallback={<LoadingAffectShop/>}>
      <BuildAffectShopPage />
    </Suspense>
  );
};

export default AffectShopPage;
