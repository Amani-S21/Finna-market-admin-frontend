import LoadingTable from "@/app/_components/LoadingTable";
import { FeaturesToolBar } from "../_components";


export  const featuresColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Nom" },
  { label: "Date" },
  { label: "Valeurs" },
  { label: "Action" },
];

const LoadingFeatures = () => {
  return (
    <>
      <FeaturesToolBar />
      <LoadingTable columns={featuresColumns} />
    </>
  );
};

export default LoadingFeatures;
