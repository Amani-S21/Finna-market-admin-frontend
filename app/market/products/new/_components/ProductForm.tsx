"use client";

import { ErrorMessage, Spinner } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import {
  Feature,
  FeatureValuesByFeatureResponse,
  ProductSchema,
  SubCategoriesResponse,
  SubCategory,
  UploadFileResponse,
} from "@/app/lib/types";
import { productSchema } from "@/app/lib/validationSchemas";
import {
  addAndRemoveFeaturePrices,
  addFeature,
  resetList,
} from "@/redux/features/productSlice";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Switch, TextArea, TextField } from "@radix-ui/themes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiTrash } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductImage,
  SearchFeatureField,
  SelectSearchItem,
} from "../../_components";
import SearchCategoryTextField from "../../_components/SearchCategoryField";
import FeaturesToPostTable from "./FeaturesToPostTable";

const ProductForm = () => {
  const axios = useAxiosAuth();
  const { featureValuePrices } = useSelector(
    (state: RootState) => state.product
  );
  const { features } = useSelector((state: RootState) => state.product);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Product images urls
  const productImageUrls: string[] = [];

  // Images
  const [file1, setFile1] = useState<File | undefined>();
  const [file2, setFile2] = useState<File | undefined>();
  const [file3, setFile3] = useState<File | undefined>();

  const [selectedFeature, setSelectedFeature] = useState<Feature | undefined>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    SubCategory | undefined
  >();
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: "",
      feature: "",
    },
  });

  const uploadUrl = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const res = await axios.post<UploadFileResponse>(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {}
  };

  const { mutateAsync: uploadProductPicture } = useMutation({
    mutationFn: uploadUrl,
    // onSuccess: () => {},
  });

  const { data: categoriesResponse } = useQuery<SubCategoriesResponse>({
    queryKey: ["sub-categories", selectedCategoryId],
    queryFn: () =>
      axios
        .get(
          `/sub-categories/by-category/${selectedCategoryId}?page=1&limit=20`
        )
        .then((res) => res.data),
    staleTime: 60 * 1000,
  });

  const { data: featuresByValueResponse } =
    useQuery<FeatureValuesByFeatureResponse>({
      queryKey: ["features-values-by-feauture", selectedFeature],
      queryFn: () =>
        axios
          .get(
            `/feature-values/by-feature/${selectedFeature?.id}?page=1&limit=20`
          )
          .then((res) => res.data),
      staleTime: 60 * 1000,
    });

  const featurePriceExist = (featureValueId: string) => {
    return featureValuePrices?.some(
      (item) => item.featureValueId === featureValueId
    );
  };

  const testImageSelection = () => {
    if (!file1 || !file2 || !file3) {
      return false;
    }
    return true;
  };

  // const onSubmit = async (data: ProductSchema) => {
  const onSubmit = async () => {
    const imageFiles: File[] = [file1!, file2!, file3!];
    for (let i = 0; i < imageFiles.length; i++) {
      const data = await uploadProductPicture(imageFiles[i]);
      productImageUrls.push(`${data?.url}`);
      if (productImageUrls.length === 3) return;
    }

    console.log(JSON.stringify(productImageUrls));
    // console.log(JSON.stringify({ ...data, features }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Nom</p>
        <TextField.Root {...register("name")} placeholder="Nom du produit" />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Prix d'achat</p>
        <TextField.Root
          {...register("purchasedPrice")}
          placeholder="Saisissez le prix d'achat"
        />
        <ErrorMessage>{errors.purchasedPrice?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Ancien prix de vente</p>
        <TextField.Root
          {...register("oldPrice")}
          placeholder="Veuillez saisir l'ancien prix"
        />
        <ErrorMessage>{errors.oldPrice?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Prix de vente courant</p>
        <TextField.Root
          {...register("currentPrice")}
          placeholder="Veuillez saisir le prix courant du produit"
        />
        <ErrorMessage>{errors.currentPrice?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Déscription</p>
        <TextArea
          {...register("description")}
          placeholder="Veuillez saisir déscription du produit"
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Publié</p>
        <Switch
          defaultChecked
          onCheckedChange={(value) => {
            // console.log(value);
          }}
        />
      </div>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <div className="flex flex-col space-y-2 mt-6">
            <p className="text-sm font-bold">Catégorie</p>
            <SearchCategoryTextField
              {...field}
              setSelectedCategoryId={setSelectedCategoryId}
            />

            <ErrorMessage>{errors.category?.message}</ErrorMessage>
          </div>
        )}
      />
      {categoriesResponse?.data && (
        <>
          <p className="text-sm font-bold mt-4 mb-2">Sous catégories</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {categoriesResponse?.data.map((value) => (
              <SelectSearchItem
                key={value.id}
                isSelected={value.id === selectedSubCategory?.id}
                editable={false}
                title={value.name}
                onClick={() => {
                  setSelectedSubCategory(value);
                }}
              />
            ))}
          </div>
          {!selectedSubCategory && (
            <ErrorMessage>
              Veuillez séléctionner une sous catégorie
            </ErrorMessage>
          )}
        </>
      )}

      <div className="flex flex-col space-y-2 mt-4 mb-2">
        <Flex justify="between">
          <p className="text-sm font-bold">Photos</p>
          <Flex
            align="center"
            onClick={() => {
              setFile1(undefined);
              setFile2(undefined);
              setFile3(undefined);
            }}
          >
            <CiTrash size={16} />
            <p className="text-sm underline hover:cursor-default">
              Réinitialiser
            </p>
          </Flex>
        </Flex>
        <Flex gap="4">
          <ProductImage setFile={setFile1} />
          <ProductImage setFile={setFile2} />
          <ProductImage setFile={setFile3} />
        </Flex>
      </div>
      {testImageSelection() === false && (
        <ErrorMessage>Veuillez séléctionner des photos</ErrorMessage>
      )}
      <div className="flex flex-col  mt-4">
        <Flex
          justify="between"
          onClick={() => {
            dispatch(
              addFeature({
                featureId: `${selectedFeature?.id}`,
                name: `${selectedFeature?.name}`,
                featureValues: featureValuePrices!,
              })
            );

            // restore features values list
            dispatch(resetList());
          }}
        >
          <p className="text-sm font-bold ">Caractéristiques</p>
          <Flex align="center">
            <IoIosAdd size={20} />
            <p className="text-sm underline hover:cursor-default">
              Ajoutrer a la liste
            </p>
          </Flex>
        </Flex>
        <Controller
          control={control}
          name="feature"
          render={({ field }) => (
            <div className="flex flex-col space-y-2 mt-2">
              <SearchFeatureField
                {...field}
                setSelectedFeature={setSelectedFeature}
              />
              <ErrorMessage>{errors.feature?.message}</ErrorMessage>
            </div>
          )}
        />
        {selectedFeature && (
          <>
            <p className="text-sm font-bold mt-4">
              Valeurs des caractéristiques
            </p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm mb-2">
              {featuresByValueResponse?.data.map((feature) => (
                <SelectSearchItem
                  key={feature.featureValueId}
                  title={feature.featureValues.value}
                  editable={true}
                  isSelected={featurePriceExist(feature.featureValueId)}
                  currency="Usd"
                  onClick={(price) => {
                    dispatch(
                      addAndRemoveFeaturePrices({
                        featureValueId: feature.featureValueId,
                        name: feature.featureValues.value,
                        price: price,
                      })
                    );
                  }}
                />
              ))}
            </div>
          </>
        )}
        {features?.length! > 0 && <FeaturesToPostTable features={features!} />}
        {features?.length! < 1 && (
          <ErrorMessage>
            Les caractéristiques du produit sont obligatoires
          </ErrorMessage>
        )}
      </div>
      <Button onClick={onSubmit}>Click here</Button>
      {/* <Button disabled={isSubmitting} mt="6">
        Enregistrer {isSubmitting && <Spinner />}
      </Button> */}
    </form>
  );
};

export default ProductForm;
