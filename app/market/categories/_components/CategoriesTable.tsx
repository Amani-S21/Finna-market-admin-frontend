"use client";

import { formattedDate } from "@/app/lib/tools";
import { CategoriesResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { SelectSearchItem } from "../../products/_components";
import { categoriesColumns } from "../list/loading";
import Image from "next/image";
import { MEDIAS_UPLOAD_BASE_URL } from "@/app/lib/axios";

const CategoriesTable = ({
  categoriesResponse,
}: {
  categoriesResponse: CategoriesResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {categoriesColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {categoriesResponse?.data.map((category, index) => (
          <Table.Row key={category.id} align="center">
            <Table.Cell>{index + 1}</Table.Cell>
            {/* <Table.Cell>
              <div className="h-12.5 w-12.5 flex justify-center items-center rounded-md bg-white relative">
                <Image
                  height={50}
                  width={60}
                  alt="product image"
                  src={`${MEDIAS_UPLOAD_BASE_URL}/images/${category.icon}`}
                  className="object-cover rounded-md"
                />
              </div>
            </Table.Cell> */}
            <Table.Cell>{category.name}</Table.Cell>
            <Table.Cell>{formattedDate(category.createdAt)}</Table.Cell>
            <Table.Cell>
              <div className="flex flex-wrap gap-2">
                {category.subCategories.map((value) => (
                  <SelectSearchItem key={value.id} title={`${value.name}`} />
                ))}
              </div>
            </Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/market/categories/${category.id}`)}
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

export default CategoriesTable;
