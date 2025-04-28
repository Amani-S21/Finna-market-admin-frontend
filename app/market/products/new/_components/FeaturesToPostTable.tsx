import { FeatureWithValues } from "@/app/lib/types";
import { removeFeature } from "@/redux/features/featureSlice";
import { Table } from "@radix-ui/themes";
import { RiDeleteBin4Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { SelectSearchItem } from "../../_components";

const FeaturesToPostTable = ({
  features,
}: {
  features: FeatureWithValues[];
}) => {
  const dispatch = useDispatch();
  const columns: {
    label: string;
  }[] = [
    { label: "N" },
    { label: "Caractéristique" },
    { label: "Valeurs" },
    { label: "Supprimer" },
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
            <Table.Cell>
              <RiDeleteBin4Line
                size={20}
                className="ml-auto"
                onClick={() => {
                  dispatch(
                    removeFeature({
                      featureId: feature.featureId,
                    })
                  );
                }}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default FeaturesToPostTable;
