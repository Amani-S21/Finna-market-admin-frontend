"use client";

import { formattedDate } from "@/app/lib/tools";
import { ProductsListResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosMore } from "react-icons/io";
import { productColumns } from "../list/loading";
import Image from "next/image";

const ProductsTable = ({
  productsResponse,
}: {
  productsResponse: ProductsListResponse;
}) => {
  const router = useRouter();
  return (
    <Table.Root mt="6" mb="4" variant="surface">
      <Table.Header>
        <Table.Row>
          {productColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {productsResponse?.data.map((product, index) => (
          <Table.Row align="center" key={product.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <div className="h-[50px] w-[50px] flex justify-center items-center rounded-md bg-white relative">
                <Image
                  height={50}
                  width={60}
                  alt="product image"
                  src={`https://medias.finna-entreprise.com/v1/uploads/images/${product.pictures[0]}`}
                  className="object-cover rounded-md"
                />
              </div>
            </Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell className="truncate max-w-[300px]">
              {product.description}
            </Table.Cell>
            <Table.Cell>{formattedDate(product.createdAt)}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/market/products/${product.id}`)}
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
