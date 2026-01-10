"use client";

import { formattedDate } from "@/app/lib/tools";
import { OrdersResponse } from "@/app/lib/types";
import { Badge, IconButton, Table, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { GoEye } from "react-icons/go";
import { ordersColumns } from "../list/loading";
import OrderStatusBadge from "./OrderStatusBadge";
import QRCode from "react-qr-code";

const OrdersTable = ({
  ordersResponse,
}: {
  ordersResponse: OrdersResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root mt="6" mb="4" variant="surface">
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
          <Table.Row align="center" key={order.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <div className="h-15 w-15 mt-4">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`${order.code}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </Table.Cell>
            <Table.Cell>{formattedDate(`${order.createdAt}`)}</Table.Cell>
            <Table.Cell>{order.totalAmount}</Table.Cell>

            <Table.Cell>
              <Badge>
                <Text
                  as="p"
                  size="2"
                  className="lowercase first-letter:uppercase"
                >
                  {order.orderType?.name}
                </Text>
              </Badge>
            </Table.Cell>
            <Table.Cell className="truncate max-w-75">
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
  );
};

export default OrdersTable;
