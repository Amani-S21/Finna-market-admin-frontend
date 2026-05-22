"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Category, CategorySchema, SubCategory } from "@/app/lib/types";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateSubCategories,
  useSubCategoryForm,
  useUpdateSubCategories,
} from "../_features/hooks";
import SubCategorySelect from "./CategorySelect";

const SubCategoryForm = ({ subCategory }: { subCategory?: SubCategory }) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  // const [image, setImage] = useState<string | undefined>();
  // const subCategoryFile = useRef<File | null>(null);
  // const categoryUrl = useRef<string>("");

  // const [selectedCategory, setSelectedCategory] = useState<Category>();
  // const [openDialog, setOpenDialog] = useState(false);

  // const { mutateAsync: uploadCategoryPicture, isPending: isUploading } =
  //   useMutation({
  //     mutationFn: ({ axios, file }: { axios: AxiosInstance; file: File }) =>
  //       uploadUrl(axios, file),
  //     retry: 0,
  //   });

  // const { mutateAsync: updateSubCategoryIcon } = useUpdateSubCategoryIcon({
  //   axios,
  // });

  // const uploadPicture = async (): Promise<string | undefined> => {
  //   if (!subCategoryFile.current) return;

  //   const data = await uploadCategoryPicture({
  //     axios: axiosMedias,
  //     file: subCategoryFile.current!,
  //   });
  //   categoryUrl.current = `${data?.imgName}`;
  //   return `${data?.imgName}`;
  // };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useSubCategoryForm();

  const { mutateAsync: createSubCategory, error: createError } =
    useCreateSubCategories({
      axios,
    });

  const { mutateAsync: updateSubCategory, error: updateError } =
    useUpdateSubCategories({ axios });

  const onSubmit = async (data: CategorySchema) => {
    if (subCategory) {
      try {
        await updateSubCategory(
          {
            id: subCategory.id,
            name: data.name,
            // categoryId: selectedCategory?.id,
          },
          {
            onSuccess: async () => {
              queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
              queryClient.invalidateQueries({ queryKey: ["sub-category"] });
              toast.success(`Sous catégorie modifiée avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    } else {
      try {
        await createSubCategory(
          {
            name: data.name,
            // categoryId: selectedCategory?.id,
          },
          {
            onSuccess: async () =>
              // subCategory
              {
                // if (!subCategoryFile.current) return;

                // const imageUrl = await uploadPicture();

                // if (!imageUrl) return;

                // await updateSubCategoryIcon({
                //   id: `${subCategory?.id}`,
                //   icon: imageUrl,
                // });

                queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
                queryClient.invalidateQueries({ queryKey: ["sub-category"] });
                toast.success(`Sous catégorie crééee avec avec succè`);
                router.back();
              },
          }
        );
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  // useEffect(() => {
  //   if (subCategory) {
  //     setSelectedCategory(subCategory.category);
  //   }
  // }, [subCategory]);

  return (
    <div className="max-w-xl">
      {createError && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{createError?.message}</Callout.Text>
        </Callout.Root>
      )}
      {updateError && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{updateError?.message}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Nom</p>
          <TextField.Root
            {...register("name")}
            defaultValue={subCategory?.name}
            placeholder="Nom de la sous catégorie"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        {/* <SubCategorySelect
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          open={openDialog}
          setOpen={setOpenDialog}
        /> */}
        {/* <div className="flex flex-col space-y-2 mt-4 mb-2">
          <Flex justify="between" align="start">
            <Flex direction="column" gap="2" mb="2">
              <p className="text-sm font-bold">Photos</p>
              <Text as="p" className="text-sm">
                Cliquez sur le bouton si dessous pour ajouter une photo de la
                catégorie
              </Text>
            </Flex>
            <Flex
              align="center"
              onClick={() => {
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
            setFile={(filefToAdd) => {
              subCategoryFile.current = filefToAdd;
            }}
          />
        </div> */}

        <Button
          disabled={
            isSubmitting // || isUploading
          }
          mt="4"
        >
          {subCategory ? "Modifier" : "Enregistrer"}{" "}
          {isSubmitting && ( // || isUploading
            <Spinner />
          )}
        </Button>
      </form>
    </div>
  );
};

export default SubCategoryForm;
