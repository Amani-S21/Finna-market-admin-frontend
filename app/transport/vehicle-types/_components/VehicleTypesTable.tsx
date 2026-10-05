"use client";

import { Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import ActionIconButton from "@/app/_components/ActionIconButton";
import { VehicleTypeResponse } from "../../vehicle-types/_features/types";
import { vehicleColumns } from "../../vehicle-types/list/loading";
import { formattedDate } from "@/app/lib/tools";

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
            <Table.Cell>{formattedDate(vehicleType.createdAt)}</Table.Cell>
            <Table.Cell>{vehicleType.name}</Table.Cell>
            <Table.Cell>
              <ActionIconButton action="edit"
                variant="ghost"
                ml="4"
                onClick={() =>
                  router.push(`/transport/vehicle-types/edit/${vehicleType.id}`)
                }
               />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default VehicleTypesTable;
