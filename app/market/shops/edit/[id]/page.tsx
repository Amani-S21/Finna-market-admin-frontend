"use client";

import BackButton from "@/app/_components/BackButton";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { use } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import LoadingShopDetails from "../../[id]/loading";
import { useFetchShopsById } from "../../_features/hooks";
import ShopForm from "../../new/_components/ShopForm";

const EditShopPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { status } = useSession();
  const { id } = use(params);
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

      <ShopForm shop={shop} />
    </div>
  );
};

export default EditShopPage;
