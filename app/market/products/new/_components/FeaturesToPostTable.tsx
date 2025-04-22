import { Table, Text } from "@radix-ui/themes";
import { SelectSearchItem } from "../../_components";

const FeaturesToPostTable = () => {
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
        {[...Array(2)].map((feature, index) => (
          <Table.Row key={index}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell className="lowercase first-letter:uppercase">
              <p>Capacités</p>
            </Table.Cell>
            <Table.Cell>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((value, index) => (
                  <SelectSearchItem key={index} title="10Gb 50 Usd"/>
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
