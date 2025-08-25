"use client";

import { formattedDate } from "@/app/lib/tools";
import { SubCategoriesResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { subCategoriesColumns } from "../list/loading";

const SubCategoriesTable = ({
  subCategoriesResponse,
}: {
  subCategoriesResponse: SubCategoriesResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {subCategoriesColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {subCategoriesResponse?.data.map((subCategory, index) => (
          <Table.Row key={subCategory.id} align="center">
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <div className="h-[50px] w-[50px] flex justify-center items-center rounded-md bg-white relative">
                <Image
                  height={50}
                  width={60}
                  alt="product image"
                  src={`https://finna-media.buy-one-store.com/v1/uploads/images/${subCategory.icon}`}
                  className="object-cover rounded-md"
                />
              </div>
            </Table.Cell>
            <Table.Cell>{subCategory.name}</Table.Cell>
            <Table.Cell>{formattedDate(`${subCategory.createdAt}`)}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() =>
                  router.push(`/market/sub-categories/${subCategory.id}`)
                }
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

export default SubCategoriesTable;
