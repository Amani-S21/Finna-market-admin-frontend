import { Flex, Text } from "@radix-ui/themes";
import { TiInputCheckedOutline } from "react-icons/ti";

type Props = {
  isSelected?: boolean | undefined;
  editable?: boolean | undefined;
  title: string;
};
const SelectSearchItem = ({ title, isSelected, editable = false }: Props) => {
  return (
    <div
      style={{
        borderColor: isSelected ? "blue" : "#D1D5DB",
      }}
      className="flex items-center gap-1 border border-gray-300 rounded-full px-4"
    >
      {title.startsWith("#") ? (
        <div
          style={{ backgroundColor: title }}
          className="h-[20px] w-[50px] rounded-sm border border-gray-300 mr-1"
        />
      ) : (
        <p className="mr-1">{title}</p>
      )}
      {isSelected && (
        <Flex align="center">
          {editable && (
            <>
              <input
                className="w-[40px] border-b border-gray-300 text-center"
                type="numbe"
                defaultValue="0"
              />
              <Text>Usd</Text>
            </>
          )}

          <TiInputCheckedOutline color="blue" size={25} />
        </Flex>
      )}
    </div>
  );
};

export default SelectSearchItem;
