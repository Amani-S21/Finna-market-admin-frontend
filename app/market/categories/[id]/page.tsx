"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { SelectSearchItem } from "../../products/_components";
import { useFetchCategoryById } from "../_features/hooks";
import LoadingCategoryDetails from "./loading";

const BuildCategoryDetails = () => {
  const { status } = useSession();
  const params = useParams<{ id: string }>();
  const id = params.id;
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

  if (isLoading || status === "loading") return <LoadingCategoryDetails />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {category?.name}
          </Heading>
          <Text size="2">{category?.createdAt}</Text>
          <Text mt="4" size="2" as="p" className="font-bold">
            Sous catégories
          </Text>
          {(category?.subCategories ?? []).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {category?.subCategories?.map((v) => (
                <SelectSearchItem key={v.id} title={`${v.name}`} />
              ))}
            </div>
          )}
        </div>
        <div>
          <Link href={`/market/categories/edit/${category?.id}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

const CategoryDetails = () => {
  return (
    <Suspense fallback={<LoadingCategoryDetails />}>
      <BuildCategoryDetails />
    </Suspense>
  );
};

export default CategoryDetails;
