"use client";

import BackButton from "@/app/_components/BackButton";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { use } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import ShopForm from "../../new/_components/ShopForm";
import LoadingEditShopPage from "./loading";
import { Shop } from "@/app/lib/types";

const EditShopPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const axios = useAxiosAuth();

  const {
    data: shop,
    isLoading,
    error,
  } = useQuery<Shop>({
    queryKey: ["shop", id],
    queryFn: async () =>
      await axios.get(`/shops/${id}`).then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <LoadingEditShopPage />;

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
