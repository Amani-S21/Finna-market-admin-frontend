"use client";

import { Badge, IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { VehiclesResponse } from "../_features/type";
import { vehiclesColumns } from "../[id]/loading";

const VehiclesTable = ({
  vehiclesResponse,
}: {
  vehiclesResponse: VehiclesResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {vehiclesColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {vehiclesResponse?.data.map((vehicle, index) => (
          <Table.Row align="center" key={vehicle.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <div className="h-[50px] w-[50px] flex justify-center items-center rounded-md bg-gray-200 relative">
                {/* <Image
                  height={50}
                  width={60}
                  alt="product image"
                  src={`https://fr.asiastarbuses.com/uploads/202024954/js6600g12554343632.jpg`}
                  className="object-cover rounded-md"
                /> */}
              </div>
            </Table.Cell>
            <Table.Cell>{vehicle.plateNumber}</Table.Cell>

            <Table.Cell>
              {vehicle.visible ? <Badge>Visible</Badge> : <Badge>Caché</Badge>}
            </Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                // onClick={() => router.push(`/transport/agencies/${agency.id}`)}
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

export default VehiclesTable;
