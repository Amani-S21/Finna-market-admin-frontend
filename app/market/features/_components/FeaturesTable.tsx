"use client"

import { formattedDate } from "@/app/lib/tools";
import { FeaturesResponse } from "@/app/lib/types";
import { Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import ActionIconButton from "@/app/_components/ActionIconButton";
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
              <ActionIconButton action="view"
                variant="ghost"
                ml="4"
                onClick={() => router.push(`/market/features/${feature.id}`)}
               />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default FeaturesTable;
