"use client";

import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { seatsColumns } from "../../vehicles/[id]/loading";
import { SeatsResponse } from "../_features/types";

const SeatsTable = ({ seatsResponse }: { seatsResponse: SeatsResponse }) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {seatsColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {seatsResponse?.data.map((seat, index) => (
          <Table.Row align="center" key={seat.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{seat.seatNumber}</Table.Cell>
            <Table.Cell>{seat.type}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => {
                  router.push(`/transport/seats/edit/${seat.id}`);
                }}
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

export default SeatsTable;
