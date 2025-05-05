import { BackButton } from "@/app/_components";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { Key } from "lucide-react";
import React from "react";

const EditPasswordPage = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 h-[80px] mb-8">
          <Flex
            justify="between"
            gap="4"
            className="col-span-2 w-full max-w-3xl mx-auto"
          >
            <Flex align="center" gap="4">
              <Key size={15} />
              <Flex direction="column">
                <Text as="p" className="font-bold">
                  Modifier le mot de passe
                </Text>
                <Text as="p" size="1">
                  Completez les champs ci-dessous pour modifier le mot de passe
                </Text>
              </Flex>
            </Flex>

            <BackButton />
          </Flex>
        </div>
        <div className="min-w-3xl mx-auto">
          <div className="max-w-xl">
            <Flex direction="column" gap="2">
              <p className="text-sm font-bold">Ancien mot de passe</p>
              <TextField.Root
                // {...register("purchasedPrice")}

                placeholder="Saisissez l'ancien mot de passe"
                type="password"
              />
              {/* <ErrorMessage>{errors.purchasedPrice?.message}</ErrorMessage> */}
            </Flex>
            <Flex direction="column" gap="2" mt="4">
              <p className="text-sm font-bold">Nouveau mot de passe</p>
              <TextField.Root
                // {...register("purchasedPrice")}
                placeholder="Saisissez le nouveau mot de passe"
                type="password"
              />
              {/* <ErrorMessage>{errors.purchasedPrice?.message}</ErrorMessage> */}
            </Flex>
            <Flex direction="column" gap="2" mt="4">
              <p className="text-sm font-bold">Confirmer le mot de passe</p>
              <TextField.Root
                // {...register("purchasedPrice")}
                placeholder="Saisissez encore le mot de passe"
                type="password"
              />
              {/* <ErrorMessage>{errors.purchasedPrice?.message}</ErrorMessage> */}
            </Flex>
            <Button mt="5">Modifier</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordPage;
