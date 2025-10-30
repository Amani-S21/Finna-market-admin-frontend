"use client";

import { formattedDate } from "@/app/lib/tools";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { RoomCategoriesResponse } from "../_features/types";
import { roomCategoriesColumns } from "../list/loading";

const RoomCategoriesTable = ({ roomCategoriesResponse }: { roomCategoriesResponse: RoomCategoriesResponse }) => {
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
              <div className="h-[50px] w-[50px] flex justify-center items-center rounded-md bg-gray-100 relative">
                {/* <Image
                  height={50}
                  width={60}
                  alt="product image"
                  src={`https://finna-media.buy-one-store.com/v1/uploads/images/${hotel.icon}`}
                  className="object-cover rounded-md"
                /> */}
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className="first-letter:uppercase">{category.name}</p>
            </Table.Cell>
            <Table.Cell>{category.totalRooms}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/booking/room-categories/${category.id}`)}
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
