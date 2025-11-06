import { ErrorMessage, Spinner } from "@/app/_components";
import ProductImage from "@/app/_components/ProductImage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Switch, TextArea, TextField } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";
import { useCreateRoomCategories } from "../_features/hooks";
import { RoomCategoriesSchema, RoomCategoryType } from "../_features/types";
import { roomCategoriesSchema } from "../_features/validationSchemas";
import classNames from "classnames";

type Props = {
  roomCategoryTypes: RoomCategoryType[];
  setSelectedType: (val: RoomCategoryType) => void;
  selectedType: RoomCategoryType | undefined;
};

const RoomCategoriesForm = ({
  roomCategoryTypes,
  setSelectedType,
  selectedType,
}: Props) => {
  const axios = useAxiosAuth();
  const { data: session, status } = useSession();
  const router = useRouter();

  const productImageFiles = useRef<File[]>([]);

  const queryClient = useQueryClient();

  const [isPublished, setIsPublished] = useState(true);

  // Images
  const [image1, setImage1] = useState<string | undefined>();
  const [image2, setImage2] = useState<string | undefined>();
  const [image3, setImage3] = useState<string | undefined>();

  const pushFileToList = (
    indexFileToRemove: number | undefined,
    fileToAdd: File
  ) => {
    // Remove a given file
    switch (indexFileToRemove) {
      case 0:
        productImageFiles.current.splice(0, 1, fileToAdd);
        break;
      case 1:
        productImageFiles.current.splice(1, 1, fileToAdd);
        break;
      default:
      case 2:
        productImageFiles.current.splice(2, 1, fileToAdd);
        break;
    }
  };

  const testImageSelection = () => {
    if (!image1 || !image2 || !image3) {
      return false;
    }
    return true;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoomCategoriesSchema>({
    resolver: zodResolver(roomCategoriesSchema),
  });

  const { mutateAsync: create } = useCreateRoomCategories({
    axios,
  });

  const onSubmit = async (data: RoomCategoriesSchema) => {
    await create(
      {
        description: data.description,
        createdById: `${session?.data.id}`,
        pictures: [],
        visible: isPublished,
        capacity: parseInt(`${data.capacity}`),
        hotelId: "d80f5fed-6aba-45fe-bfb7-03f8f88d6329",
        roomCategoryTypeId: `${selectedType?.id}`,
        totalRooms: parseInt(`${data.totalRooms}`),
        pricePerNight: parseInt(`${data.pricePerNight}`),
      },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: ["room-categories"] });
          queryClient.invalidateQueries({ queryKey: ["room-category"] });
          toast.success(`Catégorie de chambre crééee avec avec succèes`);
          router.back();
        },
      }
    );
  };

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Type de chambre</p>
          <div className="flex flex-wrap gap-4 mt-2 mb-4">
            {roomCategoryTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedType(type)}
                className={classNames({
                  " font-bold border bg-blue-700 text-white":
                    selectedType?.id === type.id,
                  " rounded-full px-4 py-1 border border-gray-400 hover:cursor-default":
                    true,
                })}
              >
                {type.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Capacité</p>
          <TextField.Root
            {...register("capacity")}
            // defaultValue={category?.name}
            placeholder="Capacité de la chambre"
          />
          <ErrorMessage>{errors.capacity?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Prix par nuit</p>
          <TextField.Root
            {...register("pricePerNight")}
            // defaultValue={category?.name}
            placeholder="Prix par nuit"
          />
          <ErrorMessage>{errors.pricePerNight?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Nombre des chambres</p>
          <TextField.Root
            {...register("totalRooms")}
            // defaultValue={category?.name}
            placeholder="Nombre des chambres"
          />
          <ErrorMessage>{errors.totalRooms?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Déscription</p>
          <TextArea
            {...register("description")}
            // defaultValue={product?.description}
            rows={3}
            placeholder="Veuillez saisir déscription de l'hotel"
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-6 mb-6">
          <p className="text-sm font-bold">Publié</p>
          <Switch
            defaultChecked
            onCheckedChange={(value) => {
              setIsPublished(value);
            }}
          />
        </div>

        <div className="flex flex-col space-y-2 mt-4 mb-2">
          <Flex justify="between">
            <p className="text-sm font-bold">Photos</p>
            <Flex
              align="center"
              onClick={() => {
                productImageFiles.current = [];
                setImage1(undefined);
                setImage2(undefined);
                setImage3(undefined);
              }}
            >
              <CiTrash size={16} />
              <p className="text-sm underline hover:cursor-default">
                Réinitialiser
              </p>
            </Flex>
          </Flex>
          <Flex gap="4">
            <ProductImage
              image={image1!}
              setImage={setImage1}
              setFile={(fileToAdd) => {
                pushFileToList(0, fileToAdd);
              }}
            />
            <ProductImage
              image={image2!}
              setImage={setImage2}
              setFile={(fileToAdd) => {
                pushFileToList(1, fileToAdd);
              }}
            />
            <ProductImage
              image={image3!}
              setImage={setImage3}
              setFile={(fileToAdd) => {
                pushFileToList(2, fileToAdd);
              }}
            />
          </Flex>
        </div>
        {testImageSelection() === false && (
          <ErrorMessage>Veuillez séléctionner des photos</ErrorMessage>
        )}

        <Button disabled={isSubmitting} mt="4">
          {"Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default RoomCategoriesForm;
