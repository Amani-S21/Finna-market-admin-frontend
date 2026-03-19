"use client";

import { formattedDate } from "@/app/lib/tools";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { HotelResponse } from "../_features/types";
import { hotelsColumns } from "../list/loading";
import Image from "next/image";
import { MEDIAS_UPLOAD_BASE_URL } from "@/app/lib/axios";

const HotelsTable = ({ hotelResponse }: { hotelResponse: HotelResponse }) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {hotelsColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {hotelResponse?.data.map((hotel, index) => (
          <Table.Row key={hotel.id} align="center">
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <div className="h-12.5 w-12.5 flex justify-center items-center rounded-md bg-gray-100 relative">
                {hotel.pictures.length > 0 ? (
                  <Image
                    height={50}
                    width={60}
                    alt="product image"
                    src={`${MEDIAS_UPLOAD_BASE_URL}/images/${hotel.pictures[0].url}`}
                    className="object-cover rounded-md"
                  />
                ) : (
                  <></>
                )}
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className="first-letter:uppercase">{hotel.name}</p>
            </Table.Cell>
            <Table.Cell>{formattedDate(hotel.createdAt)}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/booking/hotels/${hotel.id}`)}
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

export default HotelsTable;
