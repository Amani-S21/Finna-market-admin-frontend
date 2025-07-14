"use client";

import { formattedDate } from "@/app/lib/tools";
import { TaxesResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import { IoIosMore } from "react-icons/io";
import { taxesColumns } from "../list/loading";
import { GoEye } from "react-icons/go";

const TaxesTable = ({ taxesResponse }: { taxesResponse: TaxesResponse }) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {taxesColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {taxesResponse?.data.map((taxe, index) => (
          <Table.Row key={taxe.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{taxe.name}</Table.Cell>
            <Table.Cell>{formattedDate(taxe.createdAt)}</Table.Cell>
            <Table.Cell>
              <IconButton variant="ghost" ml="4">
                <GoEye size={18} color="black" />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TaxesTable;
