"use client";

import { Badge, IconButton, Table, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { RoomBookingResponse } from "../../dashboard/_features/types";
import { roomBookingColumns } from "../list/loading";
import { OrderStatusBadge } from "@/app/market/orders/_components";
import { formattedDate } from "@/app/lib/tools";

const RoomBookingTable = ({
  roomBookingResponse,
}: {
  roomBookingResponse: RoomBookingResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {roomBookingColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {roomBookingResponse?.data.map((roomBooking, index) => (
          <Table.Row key={roomBooking.id} align="center">
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <p className="first-letter:uppercase">
                {roomBooking.customer.fullName}
              </p>
            </Table.Cell>
            <Table.Cell>
              {roomBooking.roomCategory.roomCategoryType.name}
            </Table.Cell>
             <Table.Cell>
              {roomBooking.hotel.name}
            </Table.Cell>
            <Table.Cell className="truncate max-w-75">
              {roomBooking.status && (
                <OrderStatusBadge status={roomBooking.status} />
              )}
            </Table.Cell>
            <Table.Cell>
              <p className="first-letter:uppercase">
                {formattedDate(roomBooking.startDate)}
              </p>
            </Table.Cell>
            <Table.Cell>
              <p className="first-letter:uppercase">
                {formattedDate(roomBooking.endDate)}
              </p>
            </Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/booking/hotels/${roomBooking.id}`)}
              >
                <IoIosMore size={20} color="black" />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default RoomBookingTable;
