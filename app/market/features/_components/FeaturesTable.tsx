"use client"

import { formattedDate } from "@/app/lib/tools";
import { FeaturesResponse, ShopsListResponse } from "@/app/lib/types";
import { IconButton, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { SelectSearchItem } from "../../products/_components";
import { featuresColumns } from "../list/loading";


const FeaturesTable = ({
  featuresResponse,
}: {
  featuresResponse: FeaturesResponse;
}) => {
  const router = useRouter();
 

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {featuresColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {featuresResponse?.data.map((feature, index) => (
          <Table.Row key={feature.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{feature.name}</Table.Cell>
            <Table.Cell>{formattedDate(feature.createdAt)}</Table.Cell>
            <Table.Cell>
              <div className="flex flex-wrap gap-2">
                {feature.featuresHasFeatureValues.map((value) => (
                  <SelectSearchItem
                    key={value.featureValueId}
                    title={value.featureValues.value}
                  />
                ))}
              </div>
            </Table.Cell>
            <Table.Cell>
              <IconButton
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/market/features/${feature.id}`)}
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

export default FeaturesTable;
