import { Select } from "@radix-ui/themes";

const AsigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assigner livreur" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Livreurs</Select.Label>
          <Select.Item value="kalala">Kalala</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AsigneeSelect;
