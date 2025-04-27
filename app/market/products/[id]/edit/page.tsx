"use client";

import { BackButton } from "@/app/_components";
import React, { use } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { ProductForm } from "../../new/_components";
import { Text } from "@radix-ui/themes";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/app/lib/types";
import LoadingEditProductPage from "./loading";
import { notFound } from "next/navigation";

const EditProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const axios = useAxiosAuth();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () =>
      await axios.get(`/products/${id}`).then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <LoadingEditProductPage />;

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
