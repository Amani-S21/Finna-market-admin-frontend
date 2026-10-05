"use client";

import { ClipboardList, Inbox } from "lucide-react";
import styles from "@/app/_components/dashboard.module.css";


import { Order } from "@/app/lib/types";
import {
  Badge,
  Flex,
  IconButton,
  Table,
  Text,
} from "@radix-ui/themes";

import React from "react";
import { OrderStatusBadge } from "../../orders/_components";
import { GoEye } from "react-icons/go";
import { useRouter } from "next/navigation";

const RecentOrders = ({ orders }: { orders: Order[] }) => {
  const router = useRouter();
  return (
    <section className={styles.panel}>
      <Flex direction="column">
        <div className={styles.panelHeader}><span className={styles.panelIcon}><ClipboardList size={19} aria-hidden="true" /></span><div><h2>Commandes récentes</h2><p>Les dernières commandes enregistrées</p></div></div>
        <div className={styles.tableScroll}>
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
                    aria-label="Voir les détails"
                    variant="ghost"
                    ml="4"
                    onClick={() => router.push(`/market/orders/${order.id}`)}
                  >
                    <GoEye size={18} aria-hidden="true" />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        </div>
        {orders.length === 0 && <div className={styles.empty}><Inbox size={30} aria-hidden="true" /><p>Aucune activité récente à afficher.</p></div>}
      </Flex>
    </section>
  );
};

export const recentOrdersColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Client" },
  { label: "Type" },
  { label: "Status" },
  { label: "Action" },
];

export default RecentOrders;
