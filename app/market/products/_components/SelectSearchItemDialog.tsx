"use client";

import { Button, Dialog, Flex, IconButton, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

type Props = {
  defaultFieldText: string;
  onSave: () => void;
};

const SelectSearchItemDialog = ({ defaultFieldText, onSave }: Props) => {
  const [fieldValue, setFieldValue] = useState(defaultFieldText ?? "");

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton variant="ghost" ml="2">
          <MdOutlineEdit />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title size="4">Modifier la valeur</Dialog.Title>
        <Dialog.Description size="1">
          Vous pouvez saisir une valeur
        </Dialog.Description>

        <TextField.Root
          value={fieldValue}
          placeholder="Ce champs est obligatoire"
          onChange={(e) => setFieldValue(e.target.value)}
          mt="6"
        />

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="surface" color="gray">
              Annuler
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={onSave}>Enregistrer</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SelectSearchItemDialog;
