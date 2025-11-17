"use client";

import { ShopProductWithDetails } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { shopProductsColumns } from "../list/loading";

type Props = {
  products: ShopProductWithDetails[];
};

const ShopsProductsTable = ({ products }: Props) => {
  return (
    <Table.Root>
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
        {products.map((product) => (
          <Table.Row key={product.id} align="center">
            <Table.Cell>
              <div className="flex gap-4">
                <div className="h-[50px] w-[50px] flex justify-center items-center rounded-md bg-white relative">
                  <Image
                    height={50}
                    width={60}
                    alt="product image"
                    src={`https://medias.finna-entreprise.com/v1/uploads/images/${product.product.pictures[0]}`}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="lowercase first-letter:uppercase">
                    {product?.product?.subCategory.category?.name}{" "}
                  </p>
                  <p className="text-sm font-medium lowercase first-letter:uppercase">
                    {product.product.name}
                  </p>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>{product.cost}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell className="truncate max-w-[300px]">
              {product.discountPrice}
            </Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                // onClick={() => router.push(`/market/shops/{shop.id}`)}
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
