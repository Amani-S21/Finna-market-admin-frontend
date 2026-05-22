"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
// import { axiosMedias } from "@/app/lib/axios";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Category, CategorySchema } from "@/app/lib/types";
import {
  addSubCategories,
  removeSubCategory,
} from "@/redux/features/categorySlice";
import { RootState } from "@/redux/store";
import { Button, Callout, TextField } from "@radix-ui/themes";
import {  useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SelectSearchItem } from "../../products/_components";

import {
  useCategoryForm,
  useCreateCategories,
  useUpdateCategories,
} from "../_features/hooks";
import SubCategorySelect from "./SubCategorySelect";
// import { uploadImgFile } from "../../products/_features/api";

const CategoryForm = ({ category }: { category?: Category }) => {
  const axios = useAxiosAuth();

  const dispatch = useDispatch();
  const { subCategories } = useSelector((state: RootState) => state.category);
  const router = useRouter();
  const queryClient = useQueryClient();
  // const [image, setImage] = useState<string | undefined>();
  // const categoryFile = useRef<File | null>(null);
  // const categoryUrl = useRef<string>("");

  // const { mutateAsync: uploadCategoryPicture } = useMutation({
  //   mutationFn: ({ axios, file }: { axios: AxiosInstance; file: File }) =>
  //     uploadImgFile(axios, file),
  //   retry: 0,
  // });

  // const uploadPicture = async (): Promise<string> => {
  //   const data = await uploadCategoryPicture({
  //     axios: axiosMedias,
  //     file: categoryFile.current!,
  //   });
  //   categoryUrl.current = `${data?.imgName}`;
  //   return `${data?.imgName}`;
  // };

  useEffect(() => {
    if (category) {
      dispatch(
        addSubCategories([
          ...category.subCategories.map((v, index) => ({
            id: v.id,
            index: index,
            name: v.name,
          })),
        ])
      );
    }
  }, [category, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useCategoryForm();

  const { mutateAsync: createCategory, error: createError } =
    useCreateCategories({
      axios,
    });

  // const { mutateAsync: updateCategoryIcon } = useUpdateCategoryIcon({
  //   axios,
  // });

  const {
    mutateAsync: updateCategory,
    error: updateError,
    isSuccess: isUpdateSuccess,
  } = useUpdateCategories({ axios });

  const onSubmit = async (data: CategorySchema) => {
    if (category) {
      try {
        await updateCategory({
          id: category.id,
          name: data.name,
          subCategories:
            subCategories?.map((v) => ({
              id: v.id,
              name: v.name,
            })) ?? [],
        });
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    } else {
      try {
        await createCategory(
          {
            name: data.name,
            subCategories:
              subCategories?.map((v) => ({
                id: v.id,
              })) ?? [],
          },
          {
            onSuccess: async () => {
              // if (!categoryFile.current) return;

              // ✅ Wait for upload to finish
              // const imageUrl = await uploadPicture();

              // ✅ Update with the uploaded image URL
              // await updateCategoryIcon({
              //   id: `${category?.createdCategory.id}`,
              //   icon: imageUrl,
              // });

              queryClient.invalidateQueries({ queryKey: ["categories"] });
              queryClient.invalidateQueries({ queryKey: ["category-by-id"] });
              toast.success(`Catégorie crééee avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category-by-id"] });
      toast.success(`Catégorie modifiée avec avec succèes`);
      router.back();
    }
  }, [queryClient, isUpdateSuccess, router]);

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
            defaultValue={category?.name}
            placeholder="Nom de la caractéristique"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <SubCategorySelect />
        {(subCategories ?? []).length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {subCategories?.map((v, index) => (
              <SelectSearchItem
                key={(v.name || "") + index}
                id={v.id}
                title={v.name || ""}
                index={`${index}`}
                onDeleteClick={() => {
                  dispatch(removeSubCategory({ category: `${v.name}` }));
                }}
              />
            ))}
          </div>
        )}

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
              categoryFile.current = filefToAdd;
            }}
          />
        </div> */}

        {/* <div className="flex flex-col space-y-2 mt-6">
          <Flex justify="between">
            <p className="text-sm font-bold">Sous catégorie</p>
            <Flex
              align="center"
              onClick={() => {
                dispatch(
                  addSubCategory({
                    index: subCategories?.length,
                    name: watch("subCategory") ?? "",
                  })
                );

                resetField("subCategory");
              }}
            >
              <IoIosAdd size={20} />
              <p className="text-sm underline hover:cursor-default">
                Ajoutrer à la liste
              </p>
            </Flex>
          </Flex>
          <TextField.Root
            {...register("subCategory")}
            placeholder="Type de la caractéristique"
          />
        </div> */}

        <Button disabled={isSubmitting} mt="6">
          {category ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
