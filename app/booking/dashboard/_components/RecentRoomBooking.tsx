"use client"

import {
  Badge,
  Card,
  Flex,
  Heading,
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
    <Card className="min-h-full">
      <Flex direction="column">
        <Heading size="4">Réservations récentes</Heading>
        <Text as="p" size="2" mb="4">
          La liste des réservations les plus récentes
        </Text>
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
                    variant="ghost"
                    ml="4"
                    onClick={() => router.push(`/booking/${booking.id}`)}
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
