"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { use } from "react";
import LoadingCategoryDetails from "./loading";
import { notFound } from "next/navigation";
import { useFetchCategoryById } from "../_features/hooks";
import { BackButton } from "@/app/_components";
import { Button, Grid, Heading, Text } from "@radix-ui/themes";
import { SelectSearchItem } from "../../products/_components";
import Link from "next/link";

const CategoryDetails = ({ params }: { params: Promise<{ id: string }> }) => {
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
                <SelectSearchItem key={v.id} title={v.name} />
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

export default CategoryDetails;
