import { Flex, Text } from "@radix-ui/themes";
import { TbCategoryMinus } from "react-icons/tb";

const RoomBookingToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <TbCategoryMinus />
          <span className="font-bold">Réservations</span>
        </div>
        <Text as="p" size="2">
          Toutes les réservations disponibles
        </Text>
      </div>

    </Flex>
  );
};

export default RoomBookingToolBar;
