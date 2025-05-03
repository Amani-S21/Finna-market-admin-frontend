import LoadingTable from "@/app/_components/LoadingTable";
import { FeaturesToolBar } from "../_components";
import { Flex } from "@radix-ui/themes";

const LoadingFeatures = () => {
  return (
    <Flex direction="column" gap="4">
      <FeaturesToolBar />
      <LoadingTable columns={featuresColumns} />
    </Flex>
  );
};

export  const featuresColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Nom" },
  { label: "Date" },
  { label: "Valeurs" },
  { label: "Action" },
];

export default LoadingFeatures;
