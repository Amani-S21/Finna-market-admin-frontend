import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { CiTrash } from "react-icons/ci";
import { ProductImage } from "../../products/_components";
import { useState } from "react";

const NewSubCategoryDialog = () => {
  const [image, setImage] = useState<string | undefined>();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton>
          <Plus />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" className="bg-green-500">
        <Dialog.Title size="4">Ajouter une sous catégorie</Dialog.Title>
        <Dialog.Description size="2">
          Sélectionner des sous catégories après recherche
        </Dialog.Description>

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Nom</p>
          <TextField.Root
            // {...register("name")}
            // defaultValue={category?.name}
            placeholder="Nom sous catégorie"
          />
          {/* <ErrorMessage>{errors.name?.message}</ErrorMessage> */}
        </div>
        <div className="flex flex-col space-y-2 mt-4 mb-2">
          <Flex justify="between" align="start">
            <Flex direction="column" gap="2" mb="2">
              <p className="text-sm font-bold">Photo</p>
              <Text as="p" className="text-sm">
                Cliquez sur le bouton si dessous pour ajouter une photo de la
                sous catégorie
              </Text>
            </Flex>
            <Flex
              align="center"
              onClick={() => {
                // productImageFiles.current = [];
                setImage(undefined);
              }}
            >
              <CiTrash size={16} />
              <p className="text-sm underline hover:cursor-default">
                Réinitialiser
              </p>
            </Flex>
          </Flex>
          <ProductImage
            image={image!}
            setImage={setImage}
            setFile={(fileToAdd) => {
              // pushFileToList(0, fileToAdd);
            }}
          />
        </div>

        <Flex gap="4" mt="8">
          {/* {isPending ? <Text size="1">Chargement...</Text> : <p></p>} */}
          <Dialog.Close>
            <Button variant="surface" color="gray">
              Annuler
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>
              Sauvegarder
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewSubCategoryDialog;
