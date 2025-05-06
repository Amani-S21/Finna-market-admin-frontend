// "use client";

import { Order } from "@/app/lib/types";
import { Card, Flex, Heading, IconButton, Table, Text } from "@radix-ui/themes";

import React from "react";
import { OrderStatusBadge } from "../../orders/_components";
import { GoEye } from "react-icons/go";
import { useRouter } from "next/navigation";

const RecentOrders = ({ orders }: { orders: Order[] }) => {
  const router = useRouter();
  return (
    <Card className="min-h-full">
      <Flex direction="column">
        <Heading size="4">Commandes récentes</Heading>
        <Text as="p" size="2" mb="4">
          La liste des commandes les plus récentes
        </Text>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              {recentOrdersColumns.map((column) => (
                <Table.ColumnHeaderCell key={column.label}>
                  {column.label}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders.map((order, index) => (
              <Table.Row key={order.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{order?.customer?.fullName}</Table.Cell>
                <Table.Cell>{order?.deliverer?.fullName ?? "-"}</Table.Cell>
                <Table.Cell className="truncate max-w-[300px]">
                  {order.status && <OrderStatusBadge status={order.status} />}
                </Table.Cell>
                <Table.Cell>
                  <IconButton
                    variant="ghost"
                    ml="4"
                    onClick={() => router.push(`/market/orders/${order.id}`)}
                  >
                    <GoEye size={18} color="black" />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </Card>
  );
};

export const recentOrdersColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Client" },
  { label: "Livreur" },
  { label: "Status" },
  { label: "Action" },
];

export default RecentOrders;
