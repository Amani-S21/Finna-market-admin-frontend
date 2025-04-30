"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Category, CategorySchema, FeatureSchema } from "@/app/lib/types";
import {
  addSubCategories,
  addSubCategory,
  removeSubCategory,
  updateSubCategory,
} from "@/redux/features/categorySlice";
import { RootState } from "@/redux/store";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { SelectSearchItem } from "../../products/_components";
import { useCategoryForm, useCreateCategories } from "../_features/hooks";

const CategoryForm = ({ category }: { category?: Category }) => {
  const axios = useAxiosAuth();
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state: RootState) => state.category);

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
  }, [category]);

  const {
    register,
    resetField,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useCategoryForm();

  const { mutateAsync: createCategory } = useCreateCategories({ axios });

  //   const { mutateAsync: updateFeature } = usOeUpdateFeatures({ axios });

  const onSubmit = async (data: CategorySchema) => {
    // if (feature) {
    //   await updateFeature({
    //     id: feature.id,
    //     name: data.name,
    //     featureValues:
    //       featureValues?.map((v) => ({
    //         id: v.id,
    //         value: v.value,
    //       })) ?? [],
    //   });
    // } else {
    await createCategory({
      name: data.name,
      subCategories:
        subCategories?.map((v) => ({
          name: v.name,
        })) ?? [],
    });
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
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
  );
};

export default CategoryForm;
