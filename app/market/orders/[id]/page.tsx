"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { use } from "react";
import { useFetchOrderById } from "../_features/hooks";
import LoadingOrderDetailsPage from "./loading";
import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Table,
  Text,
} from "@radix-ui/themes";
import { formattedDate } from "@/app/lib/tools";
import { OrderStatusBadge } from "../_components";
import { OrderDetail, OrderDetailFeatures } from "@/app/lib/types";
import { SelectSearchItem } from "../../products/_components";

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

  const totalOrderFeaturesPrice = (orderDetail: OrderDetail): number => {
    const total = orderDetail.orderDetailFeatures.reduce(
      (sum, item) =>
        (sum += item.featureValue.featuresAffectationsHasValues[0].price),
      0
    );
    return total + orderDetail.product.currentPrice;
  };

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
          <Table.Root mt="2">
            <Table.Header>
              <Table.Row>
                {orderDetailsColumns.map((column) => (
                  <Table.ColumnHeaderCell key={column.label}>
                    {column.label}
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {order?.ordersDetails?.map((orderDetail, index) => (
                <Table.Row key={orderDetail.id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell className="lowercase first-letter:uppercase">
                    {orderDetail.quantity}
                  </Table.Cell>
                  <Table.Cell className="lowercase first-letter:uppercase">
                    {orderDetail.product.name}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-wrap gap-2">
                      {orderDetail.orderDetailFeatures.map((value) => (
                        <SelectSearchItem
                          key={value?.featureValue?.id}
                          title={value.featureValue.value}
                          valuePrice={
                            value.featureValue.featuresAffectationsHasValues[0]
                              .price
                          }
                          currency="Usd"
                        />
                      ))}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="lowercase first-letter:uppercase">
                    {orderDetail.product.currentPrice}
                  </Table.Cell>
                  <Table.Cell className="lowercase first-letter:uppercase">
                    {totalOrderFeaturesPrice(orderDetail) *
                      orderDetail.quantity}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
        <div>
          <Button>Assigner</Button>
        </div>
      </Grid>
    </>
  );
};

const orderDetailsColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Quantité" },
  { label: "Produit" },
  { label: "Propriétés" },
  { label: "Pu" },
  { label: "Pt" },
];

export default OrderDetailsPage;
