"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { formattedDate } from "@/app/lib/tools";
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { use } from "react";
import {
  AsigneeSelect,
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
      <Grid columns="3" mt="4">
        <div className="col-span-2">
          <Heading mb="1" className="lowercase first-letter:uppercase">
            {formattedDate(`${order?.createdAt}`)}
          </Heading>
          {order?.status && <OrderStatusBadge status={order?.status} />}
          <Card mt="4" mb="4">
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
          <Text size="2" mt="4" className="font-bold">
            Produits commandés
          </Text>
          {order?.ordersDetails && (
            <OrderDetailsFeaturesTable orderDetails={order?.ordersDetails} />
          )}
        </div>
        <div>
          <AsigneeSelect />
        </div>
      </Grid>
    </>
  );
};

export default OrderDetailsPage;
