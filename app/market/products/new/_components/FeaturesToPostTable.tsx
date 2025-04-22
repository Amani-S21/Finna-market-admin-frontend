import { Table, Text } from "@radix-ui/themes";
import { SelectSearchItem } from "../../_components";
import { FeatureWithValues } from "@/app/lib/types";

const FeaturesToPostTable = ({
  features,
}: {
  features: FeatureWithValues[];
}) => {
  const columns: {
    label: string;
  }[] = [{ label: "N" }, { label: "Caractéristique" }, { label: "Valeurs" }];

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {features.map((feature, index) => (
          <Table.Row key={feature.featureId}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell className="lowercase first-letter:uppercase">
              <p>{feature.name}</p>
            </Table.Cell>
            <Table.Cell>
              <div className="flex flex-wrap gap-2">
                {feature.featureValues.map((value) => (
                  <SelectSearchItem
                    key={value.featureValueId}
                    title={value.name}
                    valuePrice={value.price}
                    currency="Usd"
                  />
                ))}
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default FeaturesToPostTable;
