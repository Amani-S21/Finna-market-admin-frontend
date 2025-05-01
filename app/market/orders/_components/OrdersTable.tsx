"use client";

import { formattedDate } from "@/app/lib/tools";
import { OrdersResponse, ShopsListResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { GoEye } from "react-icons/go";
import { ordersColumns } from "../list/loading";
import OrderStatusBadge from "./OrderStatusBadge";

const OrdersTable = ({
  ordersResponse,
}: {
  ordersResponse: OrdersResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {ordersColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ordersResponse?.data.map((order, index) => (
          <Table.Row key={order.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{formattedDate(`${order.createdAt}`)}</Table.Cell>
            <Table.Cell>{order.user.fullName}</Table.Cell>
            <Table.Cell className="truncate max-w-[300px]">
              <OrderStatusBadge status={order.status} />
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
  );
};

export default OrdersTable;
