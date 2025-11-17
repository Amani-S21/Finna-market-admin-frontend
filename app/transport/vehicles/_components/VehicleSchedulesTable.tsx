"use client";

import {  IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { SchedulesResponse } from "../../schedules/_features/types";
import { vehicleSchedulesColumns } from "../[id]/loading";

const VehicleSchedulesTable = ({
  schedulesResponse,
}: {
  schedulesResponse: SchedulesResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {vehicleSchedulesColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {schedulesResponse?.data.map((schedule, index) => (
          <Table.Row align="center" key={schedule.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{schedule.from.name}</Table.Cell>
            <Table.Cell>{schedule.to.name}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => {
                  router.push(`/transport/schedules/${schedule.id}`);
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

export default VehicleSchedulesTable;
