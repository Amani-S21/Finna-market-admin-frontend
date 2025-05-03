import { Text } from "@radix-ui/themes";
import { AiOutlineOrderedList } from "react-icons/ai";

const OrdersToolBar = () => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <AiOutlineOrderedList />
        <span className="font-bold">Commandes</span>
      </div>
      <Text as="p" size="2">
        Toutes les commandes disponibles dans l'entreprise
      </Text>
    </div>
  );
};

export default OrdersToolBar;
