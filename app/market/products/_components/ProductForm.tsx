"use client";

import { ErrorMessage, Spinner } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Feature, Product, ProductSchema, SubCategory } from "@/app/lib/types";
import {
  addAndRemoveFeaturePrices,
  addFeature,
  addFeatures,
  resetList,
} from "@/redux/features/featureSlice";
import { RootState } from "@/redux/store";
import {
  Button,
  Callout,
  Flex,
  Switch,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { CiTrash } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductImage,
  SearchFeatureField,
  SelectSearchItem,
} from "../_components";
import SearchCategoryTextField from "../_components/SearchCategoryField";
import {
  useCreateProduct,
  useFetchCategories,
  useProductForm,
  useUpdateProduct
} from "../_features/hooks";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFetchFeaturesByValue } from "../../features/_features/hooks";
import FeaturesToPostTable from "../new/_components/FeaturesToPostTable";

const ProductForm = ({ product }: { product?: Product }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const router = useRouter();

  const { featureValuePrices } = useSelector(
    (state: RootState) => state.feature
  );
  const { features } = useSelector((state: RootState) => state.feature);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Product images urls
  const productImageUrls = useRef<string[]>([]);
  const productImageFiles = useRef<File[]>([]);

  // Images
  const [image1, setImage1] = useState<string | undefined>();
  const [image2, setImage2] = useState<string | undefined>();
  const [image3, setImage3] = useState<string | undefined>();

  const [isPublished, setIsPublished] = useState(true);

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
  } = useProductForm({ product });

  // const { mutateAsync: uploadProductPicture } = useMutation({
  //   mutationFn: ({ axios, file }: { axios: AxiosInstance; file: File }) =>
  //     uploadUrl(axios, file),
  //   retry: 0,
  // });

  useEffect(() => {
    if (product) {
      // Category relating
      setSelectedCategoryId(`${product?.subCategory?.category?.id}`);
      setSelectedSubCategory(product.subCategory);

      // Images
      productImageUrls.current = [];
      productImageUrls.current.push(...product.pictures);

      // Features
      dispatch(
        addFeatures(
          product.featuresAffectations.map((feat) => ({
            featureId: feat.feature.id,
            name: feat.feature.name,
            featureValues: feat.featuresAffectationsHasValues.map((val) => ({
              featureValueId: val.featureValue.id!,
              name: val.featureValue.value,
              price: val.price,
            })),
          }))
        )
      );
    }
  }, [product, dispatch]);

  const { data: categoriesResponse } = useFetchCategories({
    axios,
    selectedCategoryId,
  });

  const { data: featuresByValueResponse } = useFetchFeaturesByValue({
    axios,
    selectedFeatureId: selectedFeature?.id,
  });

  const featurePriceExist = (featureValueId: string) => {
    return featureValuePrices?.some(
      (item) => item.featureValueId === featureValueId
    );
  };

  const testImageSelection = () => {
    if (!image1 || !image2 || !image3) {
      return false;
    }
    return true;
  };

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

  const {
    mutateAsync: createProductMutation,
    error: createError,
    isSuccess: isCreateSuccess,
    data: createdProductData,
  } = useCreateProduct({ axios });

  const {
    mutateAsync: patchProductMutation,
    error: updateError,
    isSuccess: isUpdateSuccess,
  } = useUpdateProduct({ axios });

  // const {
  //   mutateAsync: sendProductLinks,
  //   isSuccess: sendProductLinksSuccess,
  //   isPending: isPendingSendingLinks,
  // } = useSendProductsLinks({ axios });

  const onSubmit = async (data: ProductSchema) => {
    // Post product
    const { name, purchasedPrice, oldPrice, currentPrice, description } = data;
    const productSubmit = {
      name,
      purchasedPrice: Number(purchasedPrice),
      oldPrice: Number(oldPrice),
      currentPrice: Number(currentPrice),
      description,
      userId: `${session?.data.id}`,
      categoryId: selectedCategoryId,
      shopId: session?.data.shopAffectations[0].shop.id,
      subCategoryId: `${selectedSubCategory?.id}`,
      published: isPublished,
      features: (features ?? []).map((feature) => ({
        featureId: feature.featureId,
        featureValues: feature.featureValues.map((fv) => ({
          featureValueId: fv.featureValueId,
          price: fv.price,
        })),
      })),
    };
    if (product) {
      try {
        await patchProductMutation({
          id: product?.id,
          ...productSubmit,
        });
      } catch (error: any) {
        toast.error(error);
      }
    } else {
      try {
        await createProductMutation(productSubmit);
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  // upload pictures
  // const uploadPictures = async () => {
  //   if (productImageUrls.current.length < 3)
  //     for (let i = 0; i < productImageFiles.current.length; i++) {
  //       const data = await uploadProductPicture({
  //         axios,
  //         file: productImageFiles.current[i],
  //       });
  //       productImageUrls.current.push(`${data?.url}`);
  //     }

  //   // Now we can send the uploaded pictures and update the product
  //   await sendProductLinks({
  //     id: `${createdProductData?.id}`,
  //     pictures: [...productImageUrls.current],
  //   });
  // };

  useEffect(() => {
    if (isCreateSuccess) {
      (async () => {
        // await uploadPictures();
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["products-by-id"] });

        router.back();
      })();
    } else if (createError) {
      toast.error(``);
    }
  }, [isCreateSuccess, createdProductData, router, createError, queryClient]);

  // useEffect(() => {
  //   if (isCreateSuccess) {
  //     (async () => {
  //       await uploadPictures(); // Wait for uploads
  //     })();
  //   }
  // }, [isCreateSuccess]);

  // useEffect(() => {
  //   if (sendProductLinksSuccess) {
  //     (async () => {
  //       queryClient.invalidateQueries({ queryKey: ["products"] });
  //       queryClient.invalidateQueries({ queryKey: ["products-by-id"] });
  //       toast.success(`Produit créé avec succès`);
  //       router.back(); // Only navigate after everything finishes
  //     })();
  //   }
  // }, [isCreateSuccess, createdProductData, router]);

  useEffect(() => {
    if (isUpdateSuccess) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-by-id"] });
      toast.success(`Produit modifié avec avec succèes`);
      router.back();
    }
  }, [isUpdateSuccess, queryClient, router]);

  return (
    <div>
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
            placeholder="Nom du produit"
            defaultValue={product?.name}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Prix d'achat</p>
          <TextField.Root
            {...register("purchasedPrice")}
            placeholder="Saisissez le prix d'achat"
            defaultValue={product?.purchasedPrice}
          />
          <ErrorMessage>{errors.purchasedPrice?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Ancien prix de vente</p>
          <TextField.Root
            {...register("oldPrice")}
            defaultValue={product?.oldPrice}
            placeholder="Veuillez saisir l'ancien prix"
          />
          <ErrorMessage>{errors.oldPrice?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Prix de vente courant</p>
          <TextField.Root
            {...register("currentPrice")}
            defaultValue={product?.currentPrice}
            placeholder="Veuillez saisir le prix courant du produit"
          />
          <ErrorMessage>{errors.currentPrice?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Déscription</p>
          <TextArea
            {...register("description")}
            defaultValue={product?.description}
            rows={6}
            placeholder="Veuillez saisir déscription du produit"
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Publié</p>
          <Switch
            defaultChecked
            onCheckedChange={(value) => {
              setIsPublished(value);
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
                  value={field.value || ""}
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
          {features && features?.length > 0 && (
            <FeaturesToPostTable features={features!} />
          )}
          {features && features?.length < 1 && (
            <ErrorMessage>
              Les caractéristiques du produit sont obligatoires
            </ErrorMessage>
          )}
        </div>

        <Button
          disabled={
            isSubmitting
            // || isPendingSendingLinks
          }
          mt="6"
        >
          {product ? "Modifier" : "Enregistrer"}{" "}
          {isSubmitting && (
            // || isPendingSendingLinks
            <Spinner />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
