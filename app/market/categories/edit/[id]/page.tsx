"use client"

import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import React, { use } from "react";
import { TbCategoryMinus } from "react-icons/tb";
import CategoryForm from "../../_components/CategoryForm";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useFetchCategoryById } from "../../_features/hooks";
import { notFound } from "next/navigation";
import LoadingEditCategoriesPage from "./loading";

const EditCategoryPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { status } = useSession();
  const { id } = use(params);
  const axios = useAxiosAuth();

  const {
    data: category,
    isLoading,
    error,
  } = useFetchCategoryById({
    axios,
    categoryId: id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingEditCategoriesPage />;

  if (error) notFound();

  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <TbCategoryMinus />
          <span className="font-bold">Catégorie</span>
        </div>
        <Text as="p" size="2" mb="4">
          Vous pouvez modifier la catégorie
        </Text>
      </div>

      <CategoryForm category={category} />
    </>
  );
};

export default EditCategoryPage;
