"use client";

import { formattedDate } from "@/app/lib/tools";
import { UsersResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { usersColumns } from "../list/loading";
import UserRoleBadge from "./UserRoleBadge";

const UsersTable = ({
  usersResponse,
}: {
  usersResponse: UsersResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {usersColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {usersResponse?.data.map((user, index) => (
          <Table.Row key={user.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{user.fullName}</Table.Cell>
            <Table.Cell><UserRoleBadge role={user.role!}/></Table.Cell>
            <Table.Cell className="truncate max-w-[300px]">
              {user.phone}
            </Table.Cell>
            <Table.Cell>{formattedDate(`${user?.createdAt}`)}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/market/users/${user.id}`)}
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

export default UsersTable;
