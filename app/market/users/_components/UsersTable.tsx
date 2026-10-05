"use client";

import { formattedDate } from "@/app/lib/tools";
import { UsersResponse } from "@/app/lib/types";
import { Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import ActionIconButton from "@/app/_components/ActionIconButton";
import { usersColumns } from "../list/loading";
import UserRoleBadge from "./UserRoleBadge";

const UsersTable = ({
  usersResponse,
}: {
  usersResponse: UsersResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root mt="6" mb="4" variant="surface" >
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
            <Table.Cell className="truncate max-w-75">
              {user.phone}
            </Table.Cell>
            <Table.Cell>{formattedDate(`${user?.createdAt}`)}</Table.Cell>
            <Table.Cell>
              <ActionIconButton action="view"
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/market/users/${user.id}`)}
               />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default UsersTable;
