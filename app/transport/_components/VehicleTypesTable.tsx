"use client";

import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { VehicleTypeResponse } from "../vehicle-types/_features/types";
import { vehicleColumns } from "../vehicle-types/list/loading";

const VehicleTypesTable = ({
  vehicleTypeResponse,
}: {
  vehicleTypeResponse: VehicleTypeResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {vehicleColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {vehicleTypeResponse?.data.map((vehicleType, index) => (
          <Table.Row align="center" key={vehicleType.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{vehicleType.name}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() =>
                  router.push(`/transport/vehicle-types/${vehicleType.id}`)
                }
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

export default VehicleTypesTable;
