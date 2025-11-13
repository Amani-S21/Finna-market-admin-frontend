"use client";

import { formattedDate } from "@/app/lib/tools";
import { ShopsListResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { shopProductsColumns, shopsColumns } from "../list/loading";
import Image from "next/image";

const ShopsProductsTable = ({}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {shopProductsColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {[...Array(3)].map((_, index) => (
          <Table.Row key={index} align="center">
            <Table.Cell >
              <div className="flex gap-4">
                <div className="h-[50px] w-[50px] flex justify-center items-center rounded-md bg-white relative">
                  <Image
                    height={50}
                    width={60}
                    alt="product image"
                    src={`https://medias.finna-entreprise.com/v1/uploads/images/1762978554361.jpg`}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p>Aliment </p>
                  <p className="text-sm font-medium">Pain coupé </p>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>5</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell className="truncate max-w-[300px]">6</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/market/shops/{shop.id}`)}
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

export default ShopsProductsTable;
