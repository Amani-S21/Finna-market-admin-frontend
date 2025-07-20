"use client";

import { formattedDate } from "@/app/lib/tools";
import { ShopsListResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { shopsColumns } from "../list/loading";

const ShopsTable = ({
  shopsResponse,
}: {
  shopsResponse: ShopsListResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {shopsColumns.map((column) => (
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
            <Table.Cell>{shop.nationalId}</Table.Cell>
            <Table.Cell>{shop.rccm}</Table.Cell>
            <Table.Cell className="truncate max-w-[300px]">
              {shop.shopCode}
            </Table.Cell>
            <Table.Cell>{formattedDate(shop.createdAt)}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/market/shops/${shop.id}`)}
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

export default ShopsTable;
