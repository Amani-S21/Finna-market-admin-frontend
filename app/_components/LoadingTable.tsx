import { Skeleton, Table } from "@radix-ui/themes";
import React from "react";

type Props = {
  columns: {
    label: string;
  }[];
};

const LoadingTable = ({ columns }: Props) => {
  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell key={col.label}>
                {col.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {columns.map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className="flex gap-4">
        <Skeleton className="mt-4 w-[100px]" />
        <Skeleton className="mt-4 w-[100px]" />
      </div>
    </>
  );
};

export default LoadingTable;
