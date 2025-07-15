"use client";

import { formattedDate } from "@/app/lib/tools";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { GoEye } from "react-icons/go";
import { TaxePriceResponse } from "../_features/types";
import { taxePriceColumns } from "../list/loading";

const TaxesPriceTable = ({
  taxesResponse,
}: {
  taxesResponse: TaxePriceResponse;
}) => {
  const router = useRouter();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {taxePriceColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {taxesResponse?.data.map((taxe, index) => (
          <Table.Row key={taxe.taxeId + taxe.shopId + index}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{taxe.taxe.name}</Table.Cell>
            <Table.Cell>{taxe.price}</Table.Cell>
            <Table.Cell>{formattedDate(taxe.createdAt)}</Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() =>
                  router.push(
                    `/market/shop-taxes/${taxe.shopId}/${taxe.taxeId}`
                  )
                }
              >
                <GoEye size={18} color="black" />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TaxesPriceTable;
