import { Table } from "@radix-ui/themes";

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
                  <div
                    className="flex border border-gray-300 rounded-full px-4 py-1"
                    key={index}
                  >
                    <p>10Gb</p>
                  </div>
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
