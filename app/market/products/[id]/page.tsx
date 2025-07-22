"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { formattedDate } from "@/app/lib/tools";
import { Product } from "@/app/lib/types";
import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Suspense } from "react";
import { ProductsFeaturesTable } from "../_components";
import LoadingProductDetails from "./loading";

const BuildProductsDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const {  status } = useSession();
  const id = params.id;
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

  if (isLoading || status === "loading") return <LoadingProductDetails />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading className="lowercase first-letter:uppercase">
            {product?.name}
          </Heading>
          <Text size="2">{formattedDate(`${product?.createdAt}`)}</Text>

          <Card my="4">
            <Flex direction="column" gap="4">
              <Text size="2" className="font-bold">
                Créé par
              </Text>
              <Flex align="center" gap="2">
                <div className="h-[40px] w-[40px] border border-gray-200 rounded-full uppercase flex items-center justify-center">
                  {product?.user?.fullName
                    ? product.user.fullName.substring(0, 1)
                    : ""}
                </div>
                <Flex direction="column">
                  <p className="lowercase first-letter:uppercase">
                    {product?.user?.fullName}
                  </p>
                  <p className="text-sm font-bold text-gray-600">
                    {product?.user?.phone}
                  </p>
                </Flex>
              </Flex>
            </Flex>
          </Card>

          <Text size="2" className="font-bold">
            Photos
          </Text>
          <Flex mt="2" gap="4">
            {(product?.pictures ?? []).length > 0 &&
              product?.pictures.map((picture) => (
                <div
                  key={picture}
                  className="h-[80px] w-[100px] flex justify-center items-center rounded-md bg-white relative"
                >
                  <Image
                    height={80}
                    width={100}
                    alt="product image"
                    src={`https://finna-media.buy-one-store.com/v1/uploads/images/${picture}`}
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
          </Flex>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Déscription
            </Text>
            <p className="mt-1">{product?.description}</p>
          </Card>
          <Flex gap="4" mb="4">
            <Card mt="4" variant="ghost">
              <Text size="2" className="font-bold">
                Catégorie
              </Text>
              <p className="mt-1 lowercase first-letter:uppercase">
                {product?.subCategory?.category?.name}
              </p>
            </Card>
            <Card mt="4" variant="ghost">
              <Text size="2" className="font-bold">
                Sous Catgégorie
              </Text>
              <p className="mt-1 lowercase first-letter:uppercase">
                {product?.subCategory.name}
              </p>
            </Card>
          </Flex>
          <ProductsFeaturesTable
            featureAffectations={product?.featuresAffectations ?? []}
          />
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Coût
            </Text>
            <p className="mt-1">{product?.cost}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Prix
            </Text>
            <p className="mt-1">{product?.price}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Poids en gramme
            </Text>
            <p className="mt-1">{product?.weightInGrams}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Hauteur en cm
            </Text>
            <p className="mt-1">{product?.heightInCm}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Largeur en cm
            </Text>
            <p className="mt-1">{product?.widthInCm}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Longuer en cm
            </Text>
            <p className="mt-1">{product?.lengthInCm}</p>
          </Card>
          <Card mt="4" variant="ghost">
            <Text size="2" className="font-bold">
              Pourcentage
            </Text>
            <p className="mt-1">{product?.percentage}</p>
          </Card>
        </div>
        <div>
          <Link href={`/market/products/edit/${product?.id}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

const ProductsDetailsPage = () => {
  return (
    <Suspense fallback={<LoadingProductDetails />}>
      <BuildProductsDetailsPage />
    </Suspense>
  );
};

export default ProductsDetailsPage;
