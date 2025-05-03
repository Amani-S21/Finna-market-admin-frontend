import { Flex, Text } from "@radix-ui/themes";
import { AiOutlineOrderedList } from "react-icons/ai";
import OrderStatusFilter from "./OrderStatusFilter";

const OrdersToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <AiOutlineOrderedList />
          <span className="font-bold">Commandes</span>
        </div>
        <Text as="p" size="2">
          Toutes les commandes disponibles dans l'entreprise
        </Text>
      </div>
      <OrderStatusFilter />
    </Flex>
  );
};

export default OrdersToolBar;
