import { Spinner } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";
import { ProductImage } from "../../products/_components";
import { uploadUrl } from "../../products/_features/api";
import { useUpdateSubCategories, useCreateSubCategories } from "../../sub-categories/_features/hooks";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const NewSubCategoryDialog = ({ setOpen, open }: Props) => {
  const axios = useAxiosAuth();
  const [image, setImage] = useState<string | undefined>();
  const subCategoryFile = useRef<File | null>(null);
  const subCategoryUrl = useRef<string>("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadPicture = async (): Promise<string> => {
    const data = await uploadSubCategoryPicture({
      axios,
      file: subCategoryFile.current!,
    });
    subCategoryUrl.current = `${data?.imgName}`;
    return `${data?.imgName}`;
  };

  const { mutateAsync: uploadSubCategoryPicture } = useMutation({
    mutationFn: ({ axios, file }: { axios: AxiosInstance; file: File }) =>
      uploadUrl(axios, file),
    retry: 0,
  });

  const { mutateAsync: update } = useUpdateSubCategories({
    axios,
  });

  const { mutateAsync: create } = useCreateSubCategories({
    axios,
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    await create(
      { name },
      {
        onSuccess: async (subCategory) => {
          if (!subCategoryFile.current) return;

          // ✅ Wait for upload to finish
          const imageUrl = await uploadPicture();

          // ✅ Update with the uploaded image URL
          await update({
            id: subCategory.id,
            icon: imageUrl,
          });

          toast.success("Sous catégorie créée avec succès");

          setOpen(false);
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
                subCategoryFile.current = null;
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
              subCategoryFile.current = fileToAdd;
            }}
          />
        </div>
        <Flex gap="4" mt="8">
          {/* {isPending ? <Text size="1">Chargement...</Text> : <p></p>} */}
          <Dialog.Close>
            <Button type="button" variant="surface" color="gray">
              Annuler
            </Button>
          </Dialog.Close>
          <Button disabled={isSubmitting} onClick={() => onSubmit()}>
            {isSubmitting ? (
              <Flex gap="2">
                <Spinner />
                <p>Chargement</p>
              </Flex>
            ) : (
              <Text>Sauvegarder</Text>
            )}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewSubCategoryDialog;
