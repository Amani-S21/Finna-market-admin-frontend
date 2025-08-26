"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { useFetchSubCategoryById } from "../_features/hooks";
import LoadingCategoryDetails from "./loading";

const BuildCategoryDetails = () => {
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

  if (isLoading || status === "loading") return <LoadingCategoryDetails />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {subCategory?.name}
          </Heading>
          <Text size="2">{subCategory?.createdAt}</Text>
        </div>
        <div>
          <Link href={`/market/sub-categories/edit/${subCategory?.id}`}>
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
