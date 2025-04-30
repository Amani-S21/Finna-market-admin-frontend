import LoadingTable from "@/app/_components/LoadingTable";
import { FeaturesToolBar } from "../_components";
import { featuresColumns } from "../_components/FeaturesTable";

const LoadingFeatures = () => {
  return (
    <>
      <FeaturesToolBar />
      <LoadingTable columns={featuresColumns} />
    </>
  );
};

export default LoadingFeatures;
