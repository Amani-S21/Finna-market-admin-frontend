"use client";

import { Flex, IconButton, Text } from "@radix-ui/themes";
import { useState } from "react";
import { TiInputCheckedOutline } from "react-icons/ti";
import { IoIosCloseCircleOutline } from "react-icons/io";

type Props = {
  isSelected?: boolean | undefined;
  editable?: boolean | undefined;

  title: string;
  valuePrice?: number;
  currency?: string;
  onClick?: (price: number) => void;
  onDeleteClick?: () => void;
};
const SelectSearchItem = ({
  title,
  isSelected,
  valuePrice,
  onDeleteClick,
  currency,
  editable = false,
  onClick,
}: Props) => {
  const [price, setPrice] = useState(0);

  const handleClick = () => {
    if (onClick) {
      onClick(price);
    }
  };

  return (
    <div
      style={{
        borderColor: isSelected ? "blue" : "#D1D5DB",
      }}
      className="flex items-center border border-gray-300 rounded-full px-4 hover:cursor-default"
      onClick={handleClick}
    >
      {title.startsWith("#") ? (
        <>
          <div
            style={{ backgroundColor: title }}
            className="h-[20px] w-[50px]  rounded-sm border border-gray-300"
          />
          {valuePrice && <p className="mx-1">{valuePrice}</p>}
        </>
      ) : (
        <p className="mr-1">{title}</p>
      )}

      <Flex align="center">
        {editable && (
          <>
            <input
              className="w-[40px] border-b border-gray-300 text-center"
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
            />
          </>
        )}
        {currency && <Text>{currency}</Text>}
        {isSelected && <TiInputCheckedOutline color="blue" size={25} />}
        {onDeleteClick && (
          <IconButton variant="ghost" ml="2" onClick={onDeleteClick}>
            <IoIosCloseCircleOutline />
          </IconButton>
        )}
      </Flex>
    </div>
  );
};

export default SelectSearchItem;
