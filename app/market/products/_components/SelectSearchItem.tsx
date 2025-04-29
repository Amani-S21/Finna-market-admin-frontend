"use client";

import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import { TiInputCheckedOutline } from "react-icons/ti";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateFeatureValue } from "@/redux/features/featureSlice";

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
}: Props) => {
  const [price, setPrice] = useState(0);
  const [featureValue, setFeatureValue] = useState(title ?? "");
  const dispatch = useDispatch();

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
            <Dialog.Root>
              <Dialog.Trigger>
                <IconButton variant="ghost" ml="2">
                  <MdOutlineEdit />
                </IconButton>
              </Dialog.Trigger>

              <Dialog.Content maxWidth="450px">
                <Dialog.Title size="4">Modifier la valeur</Dialog.Title>
                <Dialog.Description size="1">
                  Vous pouvez saisir un nouveau nom pour la valeur
                </Dialog.Description>

                <TextField.Root
                  value={featureValue}
                  placeholder="Enter un nouveau nom pour la valeur"
                  onChange={(e) => setFeatureValue(e.target.value)}
                  mt="6"
                />

                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="surface" color="gray">
                      Annuler
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button
                      onClick={() => {
                        dispatch(
                          updateFeatureValue({
                            id,
                            index,
                            value: featureValue,
                          })
                        );
                      }}
                    >
                      Enregistrer
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
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
