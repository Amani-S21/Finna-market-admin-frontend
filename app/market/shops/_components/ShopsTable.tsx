import { ShopsListResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import React from "react";
import { GrMoreVertical } from "react-icons/gr";

const ShopsTable = ({
  shopsResponse,
}: {
  shopsResponse: ShopsListResponse;
}) => {
  const columns: {
    label: string;
  }[] = [
    { label: "N" },
    { label: "Boutique" },
    { label: "Addrèsse" },
    { label: "Date" },
    { label: "Action" },
  ];

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {shopsResponse?.data.map((shop, index) => (
          <Table.Row key={shop.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{shop.name}</Table.Cell>
            <Table.Cell>{shop.address}</Table.Cell>
            <Table.Cell>{shop.createdAt}</Table.Cell>
            <Table.Cell>
              <IconButton variant="ghost" ml="4">
                <GrMoreVertical color="black" />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ShopsTable;
