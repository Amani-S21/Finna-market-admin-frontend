"use client";

import { formattedDate } from "@/app/lib/tools";
import { ProductResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/router";
import React from "react";
import { IoIosMore } from "react-icons/io";

const ProductsTable = ({
  productsResponse,
}: {
  productsResponse: ProductResponse;
}) => {
  const router = useRouter();
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
        {productsResponse?.data.map((product, index) => (
          <Table.Row key={product.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell className="truncate max-w-[300px]">
              {product.description}
            </Table.Cell>
            <Table.Cell>{formattedDate(product.createdAt)}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/market/shops/${product.id}`)}
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

export default ProductsTable;
