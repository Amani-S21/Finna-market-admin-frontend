"use client";

import { Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import ActionIconButton from "@/app/_components/ActionIconButton";
import { formattedDate } from "@/app/lib/tools";
import { PlacesResponse } from "../_features/types";
import { placesColumns } from "../list/loading";

const PlacesTable = ({
  placesResponse,
}: {
  placesResponse: PlacesResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {placesColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {placesResponse?.data.map((place, index) => (
          <Table.Row align="center" key={place.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{formattedDate(place.createdAt)}</Table.Cell>
            <Table.Cell>{place.name}</Table.Cell>
            <Table.Cell>{place.city}</Table.Cell>
            <Table.Cell>
              <ActionIconButton action="edit"
                variant="ghost"
                ml="4"
                onClick={() =>
                  router.push(`/transport/places/edit/${place.id}`)
                }
               />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default PlacesTable;
