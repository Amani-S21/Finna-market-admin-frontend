"use client";

import { ClipboardList, Inbox } from "lucide-react";
import styles from "@/app/_components/dashboard.module.css";


import {
  Badge,
  Flex,
  IconButton,
  Table,
  Text,
} from "@radix-ui/themes";

import { OrderStatusBadge } from "@/app/market/orders/_components";
import { useRouter } from "next/navigation";
import { GoEye } from "react-icons/go";
import { RoomBooking } from "../_features/types";

const RecentRoomBookings = ({ roomBookings }: { roomBookings: RoomBooking[] }) => {
  const router = useRouter();
  return (
    <section className={styles.panel}>
      <Flex direction="column">
        <div className={styles.panelHeader}><span className={styles.panelIcon}><ClipboardList size={19} aria-hidden="true" /></span><div><h2>Réservations récentes</h2><p>Les dernières réservations enregistrées</p></div></div>
        <div className={styles.tableScroll}>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              {recentRoomBookingsColumns.map((column) => (
                <Table.ColumnHeaderCell key={column.label}>
                  {column.label}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {roomBookings.map((booking, index) => (
              <Table.Row key={booking.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{booking?.customer?.fullName}</Table.Cell>
                <Table.Cell>
                  <Badge>
                    <Text
                      as="p"
                      size="2"
                      className="lowercase first-letter:uppercase"
                    >
                      {booking.hotel?.name}
                    </Text>
                  </Badge>
                </Table.Cell>
                <Table.Cell className="truncate max-w-75">
                  {booking.status && <OrderStatusBadge status={booking.status} />}
                </Table.Cell>
                <Table.Cell>
                  <IconButton
                    aria-label="Voir les détails"
                    variant="ghost"
                    ml="4"
                    onClick={() => router.push(`/booking/${booking.id}`)}
                  >
                    <GoEye size={18} aria-hidden="true" />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        </div>
        {roomBookings.length === 0 && <div className={styles.empty}><Inbox size={30} aria-hidden="true" /><p>Aucune activité récente à afficher.</p></div>}
      </Flex>
    </section>
  );
};

export const recentRoomBookingsColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Client" },
  { label: "Entréprise" },
  { label: "Status" },
  { label: "Action" },
];

export default RecentRoomBookings;
