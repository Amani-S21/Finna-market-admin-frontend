"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Category, CategorySchema } from "@/app/lib/types";
import {
  addSubCategories,
  addSubCategory,
  removeSubCategory,
  updateSubCategory,
} from "@/redux/features/categorySlice";
import { RootState } from "@/redux/store";
import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { SelectSearchItem } from "../../products/_components";
import {
  useCategoryForm,
  useCreateCategories,
  useUpdateCategories,
} from "../_features/hooks";
import { useQueryClient } from "@tanstack/react-query";

const CategoryForm = ({ category }: { category?: Category }) => {
  const axios = useAxiosAuth();
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state: RootState) => state.category);
  const router = useRouter();
  const queryClient = useQueryClient();

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
    resetField,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useCategoryForm();

  const {
    mutateAsync: createCategory,
    error: createError,
    isSuccess: isCreateSuccess,
  } = useCreateCategories({
    axios,
  });

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
        await createCategory({
          name: data.name,
          subCategories:
            subCategories?.map((v) => ({
              name: v.name,
            })) ?? [],
        });
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  useEffect(() => {
    if (isCreateSuccess) {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category-by-id"] });
      toast.success(`Catégorie crééee avec avec succèes`);
      router.back();
    }
  }, [queryClient, isCreateSuccess, router]);

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
        <div className="flex flex-col space-y-2 mt-4">
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
        </div>

        {(subCategories ?? []).length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {subCategories?.map((v, index) => (
              <SelectSearchItem
                key={v.name + index}
                id={v.id}
                title={v.name}
                index={`${index}`}
                onDeleteClick={() => {
                  dispatch(removeSubCategory({ category: v.name }));
                }}
                onDialogSave={(textValue) => {
                  dispatch(
                    updateSubCategory({
                      id: v.id,
                      index: v.index,
                      name: textValue,
                    })
                  );
                }}
              />
            ))}
          </div>
        )}

        <Button disabled={isSubmitting} mt="4">
          {category ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
