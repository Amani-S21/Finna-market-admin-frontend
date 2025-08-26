"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { TbCategoryMinus } from "react-icons/tb";
import SubCategoryForm from "../../_components/SubCategoryForm";
import { useFetchSubCategoryById } from "../../_features/hooks";
import LoadingEditCategoriesPage from "./loading";

const BuildEditSubCategoryPage = () => {
  const { status } = useSession();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const axios = useAxiosAuth();

  const {
    data: subCategory,
    isLoading,
    error,
  } = useFetchSubCategoryById({
    axios,
    id,
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
          <span className="font-bold">Sous catégorie</span>
        </div>
        <Text as="p" size="2" mb="4">
          Vous pouvez modifier la sous catégorie
        </Text>
      </div>

      <SubCategoryForm subCategory={subCategory} />
    </>
  );
};

const EditCategoryPage = () => {
  return (
    <Suspense fallback={<LoadingEditCategoriesPage />}>
      <BuildEditSubCategoryPage />
    </Suspense>
  );
};

export default EditCategoryPage;
