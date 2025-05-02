"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { formattedDate } from "@/app/lib/tools";
import { Badge, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { use } from "react";
import {
  DelivererSelect,
  OrderDetailsFeaturesTable,
  OrderStatusBadge,
} from "../_components";
import { useFetchOrderById } from "../_features/hooks";
import LoadingOrderDetailsPage from "./loading";

const OrderDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { status } = useSession();
  const { id } = use(params);
  const axios = useAxiosAuth();

  const {
    data: order,
    isLoading,
    error,
  } = useFetchOrderById({
    axios,
    orderId: id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingOrderDetailsPage />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4" gapX="4">
        <div className="col-span-2">
          <Heading mb="1" className="lowercase first-letter:uppercase">
            {formattedDate(`${order?.createdAt}`)}
          </Heading>
          {order?.status && <OrderStatusBadge status={order?.status} />}
          <Card mt="4" mb="5">
            <Flex align="center" gap="2">
              <div className="h-[40px] w-[40px] border border-gray-200 rounded-full uppercase flex items-center justify-center">{`${order?.customer?.fullName.substring(
                0,
                1
              )}`}</div>
              <Flex direction="column">
                <p className="lowercase first-letter:uppercase">
                  {order?.customer?.fullName}
                </p>
                <p className="text-sm font-bold text-gray-600">
                  {order?.customer?.phone}
                </p>
              </Flex>
            </Flex>
          </Card>
          <Text as="p" size="2" className="font-bold">
            Produits commandés
          </Text>
          <Text as="p" size="2" mt="1" mr="2">
            Tous les produits commandés par l'utilisateurs avec toutes les
            caractéristiques séléctionnées
          </Text>
          {order?.ordersDetails && (
            <OrderDetailsFeaturesTable orderDetails={order?.ordersDetails} />
          )}
          <Text as="p" size="2" mt="5" className="font-bold mt-4">
            Livreur
          </Text>
          <Text as="p" size="2" mt="1" mr="2">
            Agent résponsable de la livraison
          </Text>
          <Flex mt="3" gap="2" align="center">
            <Badge radius="large" className="uppercase">
              <p className="p-4">
                {order?.deliverer?.fullName.substring(0, 1)}
              </p>
            </Badge>
            <Flex direction="column">
              <Text>{order?.deliverer?.fullName}</Text>
              <Text size="1" className="font-bold text-gray-600">
                {order?.deliverer?.phone}
              </Text>
            </Flex>
          </Flex>
        </div>
        <div>
          <DelivererSelect />
          <Text as="p" size="2" mt="2" mr="2">
            Vous pouvez modifier le livreur séléctionné en cliquant sur ce
            bouton si haut
          </Text>

          {/* <Text color="red" as="p" size="1" mt="2" mr="2">
            Aucun livreur assigné à cette commande, veuillez cliquer sur le
            bouton en haut pour en séléctioner un
          </Text> */}
        </div>
      </Grid>
    </>
  );
};

export default OrderDetailsPage;
