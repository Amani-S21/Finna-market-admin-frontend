"use client";

import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { RoomCategoriesResponse } from "../_features/types";
import { roomCategoriesColumns } from "../list/loading";
import Image from "next/image";
import { MEDIAS_UPLOAD_BASE_URL } from "@/app/lib/axios";

const RoomCategoriesTable = ({
  roomCategoriesResponse,
}: {
  roomCategoriesResponse: RoomCategoriesResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {roomCategoriesColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {roomCategoriesResponse?.data.map((category, index) => (
          <Table.Row key={category.id} align="center">
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <div className="h-12.5 w-12.5 flex justify-center items-center rounded-md bg-gray-100 relative overflow-hidden">
                <Image
                  height={20}
                  width={60}
                  alt="product image"
                  src={`${MEDIAS_UPLOAD_BASE_URL}/images/${category.pictures[0]?.url}`}
                  className="object-cover rounded-md"
                />
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className="first-letter:uppercase">
                {category.roomCategoryType?.name}
                {/* {JSON.stringify(category.pictures[0]?.url)} */}
              </p>
            </Table.Cell>
            <Table.Cell>
              <p className="first-letter:uppercase">{category.pricePerNight}</p>
            </Table.Cell>
            <Table.Cell>{category.totalRooms}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() =>
                  router.push(`/booking/room-categories/${category.id}`)
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

export default RoomCategoriesTable;
