"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Category, CategorySchema } from "@/app/lib/types";
import {
  addSubCategories,
  removeSubCategory,
} from "@/redux/features/categorySlice";
import { RootState } from "@/redux/store";
import { Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useCreateAgency, useUpdateAgency } from "../agencies/_features/hooks";
import { NewAgencySchema, TransportAgency } from "../agencies/_features/type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newAgencySchema } from "../agencies/_features/validations";
import { ProductImage } from "@/app/market/products/_components";

const AgencyForm = ({ agency }: { agency?: TransportAgency }) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [image, setImage] = useState<string | undefined>();
  const categoryFile = useRef<File | null>(null);
  const categoryUrl = useRef<string>("");

  // const { mutateAsync: uploadCategoryPicture } = useMutation({
  //   mutationFn: ({ axios, file }: { axios: AxiosInstance; file: File }) =>
  //     uploadUrl(axios, file),
  //   retry: 0,
  // });

  // const uploadPicture = async (): Promise<string> => {
  //   const data = await uploadCategoryPicture({
  //     axios,
  //     file: categoryFile.current!,
  //   });
  //   categoryUrl.current = `${data?.imgName}`;
  //   return `${data?.imgName}`;
  // };

  // useEffect(() => {
  //   if (agency) {
  //     dispatch(
  //       addSubCategories([
  //         ...category.subCategories.map((v, index) => ({
  //           id: v.id,
  //           index: index,
  //           name: v.name,
  //         })),
  //       ])
  //     );
  //   }
  // }, [category, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewAgencySchema>({
    resolver: zodResolver(newAgencySchema),
  });

  const { mutateAsync: createAgency, error: createError } = useCreateAgency({
    axios,
  });

  // const { mutateAsync: updateCategoryIcon } = useUpdateCategoryIcon({
  //   axios,
  // });

  const {
    mutateAsync: updateAgency,
    error: updateError,
    isSuccess: isUpdateSuccess,
  } = useUpdateAgency({ axios, id: `${agency?.id}` });

  const onSubmit = async (data: NewAgencySchema) => {
    if (agency) {
      try {
        await updateAgency(agency, {
          onSuccess: async (agency) => {
            // if (!categoryFile.current) return;

            // // ✅ Wait for upload to finish
            // const imageUrl = await uploadPicture();

            // // ✅ Update with the uploaded image URL
            // await updateCategoryIcon({
            //   id: `${category?.createdCategory.id}`,
            //   icon: imageUrl,
            // });

            queryClient.invalidateQueries({ queryKey: ["agencies"] });
            queryClient.invalidateQueries({ queryKey: ["agency"] });
            toast.success(`Agence crééee avec avec succèes`);
            router.back();
          },
        });
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    } else {
      try {
        await createAgency(
          {
            name: data.name,
            address: data.address ?? "",
            email: data.email,
            phone: data.phone ?? "",
            documents: "",
            photo: "",
          },
          {
            onSuccess: async (agency) => {
              // if (!categoryFile.current) return;

              // // ✅ Wait for upload to finish
              // const imageUrl = await uploadPicture();

              // // ✅ Update with the uploaded image URL
              // await updateCategoryIcon({
              //   id: `${category?.createdCategory.id}`,
              //   icon: imageUrl,
              // });

              queryClient.invalidateQueries({ queryKey: ["agencies"] });
              queryClient.invalidateQueries({ queryKey: ["agency"] });
              toast.success(`Agence crééee avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

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
            defaultValue={agency?.name}
            placeholder="Entrer le nom"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Email</p>
          <TextField.Root
            {...register("email")}
            defaultValue={agency?.email ?? ""}
            placeholder="Saisissez l'addresse mail"
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Phone</p>
          <TextField.Root
            {...register("phone")}
            defaultValue={agency?.phone ?? ""}
            placeholder="Saisissez le numero de téléphone"
          />
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        </div>


        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Documents</p>
          <TextField.Root placeholder="Entrer les documents" />
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        </div>

        <div className="flex flex-col space-y-2 mt-4 mb-2">
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
        </div>

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

        <Button disabled={isSubmitting} mt="4">
          {agency ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default AgencyForm;
