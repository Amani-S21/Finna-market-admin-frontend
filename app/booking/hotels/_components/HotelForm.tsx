"use client";

import { ErrorMessage, Spinner } from "@/app/_components";
import ProductImage from "@/app/_components/ProductImage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Switch, TextArea, TextField } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosMedias } from "@/app/lib/axios";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";
import { useCreateHotel, useSendHotelLinks } from "../_features/hooks";
import { Country, Hotel, HotelSchema } from "../_features/types";
import { hotelSchema } from "../_features/validationSchemas";
import HotelCitiesSelect from "./HotelCitiesSelect";
import HotelCountriesSelect from "./HotelCountriesSelect";
import { AxiosInstance } from "axios";
import { uploadImgFile } from "@/app/market/products/_features/api";

const HotelForm = ({ hotel }: { hotel?: Hotel }) => {
  const axios = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();

  const hotelImageUrls = useRef<string[]>([]);
  const productImageFiles = useRef<File[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [openCountryDialog, setOpenCountryDialog] = useState(false);

  const queryClient = useQueryClient();

  const [selectedCity, setSelectedCity] = useState<string>();
  const [openCityDialog, setOpenCityDialog] = useState(false);

  const [isPublished, setIsPublished] = useState(true);

  // Images
  const [image1, setImage1] = useState<string | undefined>();
  const [image2, setImage2] = useState<string | undefined>();
  const [image3, setImage3] = useState<string | undefined>();
  const [isUploading, setIsUploading] = useState(false);

  const {
    mutateAsync: sendHotelsLinks,
  } = useSendHotelLinks({ axios });

  const { mutateAsync: createHotel } = useCreateHotel({
    axios,
  });

  const pushFileToList = (
    indexFileToRemove: number | undefined,
    fileToAdd: File,
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

  const { mutateAsync: uploadItemPictures } = useMutation({
    mutationFn: ({ file }: { axios: AxiosInstance; file: File }) =>
      uploadImgFile(axiosMedias, file),
    retry: 0,
  });

  // upload pictures
  const uploadPictures = useCallback(
    async (hotelId: string) => {
      try {
        setIsUploading(true);
        if (hotelImageUrls.current.length < 3)
          for (let i = 0; i < productImageFiles.current.length; i++) {
            const data = await uploadItemPictures({
              axios,
              file: productImageFiles.current[i],
            });
            hotelImageUrls.current.push(`${data?.imgName}`);
          }

        // Now we can send the uploaded pictures and update the product
        await sendHotelsLinks({
          hotelId: `${hotelId}`,
          pictures: hotelImageUrls.current.map((url) => ({ url })),
        });
      } finally {
        setIsUploading(false);
      }
    },
    [
      uploadItemPictures,
      sendHotelsLinks,
      axios,
      productImageFiles,
      hotelImageUrls,
    ],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HotelSchema>({
    resolver: zodResolver(hotelSchema),
  });

  const onSubmit = async (data: HotelSchema) => {
    await createHotel(
      {
        name: data.name,
        country: selectedCountry?.name,
        city: selectedCity,
        description: data.description,
        address: `${data.address}`,
        createdById: `${session?.data.id}`,
        pictures: [],
        visible: isPublished,
      },
      {
        onSuccess: async (data) => {
          
          // Upload picture only when everything regarding the hotel creation is Ok
          await uploadPictures(data.id);

          queryClient.invalidateQueries({ queryKey: ["hotels"] });
          queryClient.invalidateQueries({ queryKey: ["hotel"] });
          toast.success(`Hotel crééee avec avec succèes`);
          router.back();
        },
      },
    );
  };

  return (
    <div className="max-w-xl">
      {/* {createError && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{createError?.message}</Callout.Text>
        </Callout.Root>
      )}
      {updateError && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{updateError?.message}</Callout.Text>
        </Callout.Root>
      )} */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Nom</p>
          <TextField.Root
            {...register("name")}
            // defaultValue={category?.name}
            placeholder="Nom de l'hotel"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <HotelCountriesSelect
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          open={openCountryDialog}
          setOpen={setOpenCountryDialog}
        />
        <HotelCitiesSelect
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          open={openCityDialog}
          setOpen={setOpenCityDialog}
          selectedCountry={selectedCountry}
        />
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Addrèsse</p>
          <TextField.Root
            {...register("address")}
            // defaultValue={category?.name}
            placeholder="Addrèsse de l'hotel"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
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

        <Button disabled={isSubmitting || isUploading} mt="4">
          {hotel ? "Modifier" : "Enregistrer"}{" "}
          {(isSubmitting || isUploading) && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default HotelForm;
