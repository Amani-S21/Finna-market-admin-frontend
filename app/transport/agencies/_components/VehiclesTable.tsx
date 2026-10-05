"use client";

import { Badge, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import ActionIconButton from "@/app/_components/ActionIconButton";
import { VehiclesResponse } from "../_features/type";
import { vehiclesColumns } from "../[id]/loading";

const VehiclesTable = ({
  vehiclesResponse,
}: {
  vehiclesResponse: VehiclesResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {vehiclesColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {vehiclesResponse?.data.map((vehicle, index) => (
          <Table.Row align="center" key={vehicle.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{vehicle.model}</Table.Cell>
            <Table.Cell>{vehicle.plateNumber}</Table.Cell>

            <Table.Cell>
              {vehicle.visible ? <Badge>Visible</Badge> : <Badge>Caché</Badge>}
            </Table.Cell>
            <Table.Cell>
              <ActionIconButton action="view"
                variant="ghost"
                ml="4"
                onClick={() =>
                  router.push(`/transport/vehicles/${vehicle.id}`)
                }
               />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default VehiclesTable;
