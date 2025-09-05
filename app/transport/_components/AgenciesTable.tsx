"use client";

import { Badge, IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { TransportAgencyResponse } from "../agencies/_features/type";
import { agenciesColumns } from "../agencies/list/loading";

const AgenciesTable = ({
  agenciesResponse,
}: {
  agenciesResponse: TransportAgencyResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {agenciesColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {agenciesResponse?.data.map((agency, index) => (
          <Table.Row align="center" key={agency.id}>
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
            <Table.Cell>{agency.name}</Table.Cell>
            <Table.Cell>{agency.phone}</Table.Cell>
            <Table.Cell>
              {agency.visible ? <Badge>Visible</Badge> : <Badge>Caché</Badge>}
            </Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/transport/agencies/edit/${agency.id}`)}
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

export default AgenciesTable;
