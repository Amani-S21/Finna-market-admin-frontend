"use client";

import { Flex, IconButton, Text } from "@radix-ui/themes";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TiInputCheckedOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import SelectSearchItemDialog from "./SelectSearchItemDialog";

type Props = {
  isSelected?: boolean | undefined;
  editable?: boolean | undefined;
  id?: string;
  title: string;
  index?: string;
  valuePrice?: number;
  currency?: string;
  onClick?: (price: number) => void;
  onDeleteClick?: () => void;
  onDialogSave?: (textValue: string) => void;
};
const SelectSearchItem = ({
  id,
  title,
  index,
  isSelected,
  valuePrice,
  onDeleteClick,
  currency,
  editable = false,
  onClick,
  onDialogSave,
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
          <Flex gap="4">
            {onDialogSave && (
              <SelectSearchItemDialog
                defaultFieldText={title}
                onSave={onDialogSave}
              />
            )}
            <IconButton variant="ghost" onClick={onDeleteClick}>
              <IoIosCloseCircleOutline />
            </IconButton>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default SelectSearchItem;
