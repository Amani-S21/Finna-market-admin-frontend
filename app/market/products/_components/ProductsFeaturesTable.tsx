import { formattedDate } from "@/app/lib/tools";
import { FeatureAffectation } from "@/app/lib/types";
import { Table } from "@radix-ui/themes";
import SelectSearchItem from "./SelectSearchItem";

const ProductsFeaturesTable = ({
  featureAffectations,
}: {
  featureAffectations: FeatureAffectation[];
}) => {
  const columns: {
    label: string;
  }[] = [
    { label: "N" },
    { label: "Caractéristique" },
    { label: "Date" },
    { label: "Valeurs" },
  ];

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
        {featureAffectations?.map((feature, index) => (
          <Table.Row key={feature.featureId}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell className="lowercase first-letter:uppercase">
              {feature.feature.name}
            </Table.Cell>
            <Table.Cell>{formattedDate(feature.createdAt)}</Table.Cell>
            <Table.Cell>
              <div className="flex flex-wrap gap-2">
                {feature.featuresAffectationsHasValues.map((value) => (
                  <SelectSearchItem
                    key={value.featureValueId}
                    title={value.featureValue.value}
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

export default ProductsFeaturesTable;
