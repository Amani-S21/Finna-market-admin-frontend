"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { use } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { ProductForm } from "../../_components";
import { useFetchProductById } from "../../_features/hooks";
import LoadingEditProductPage from "./loading";

const EditProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const { id } = use(params);

  const {
    data: product,
    isLoading,
    error,
  } = useFetchProductById({
    axios,
    productId: id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingEditProductPage />;

  if (error) notFound();
  return (
    <div className="max-w-xl">
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <AiOutlineProduct />
          <span className="font-bold">Produit</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour modifier le produit
        </Text>
      </div>

      <ProductForm product={product} />
    </div>
  );
};

export default EditProductPage;
