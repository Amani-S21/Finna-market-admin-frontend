"use client";

import { ErrorMessage } from "@/app/_components";
import ProductImage from "@/app/_components/ProductImage";
import { Button, Flex, Switch, TextArea, TextField } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { Hotel } from "../_features/types";
import HotelCitiesSelect from "./HotelCitiesSelect";
import HotelCountriesSelect from "./HotelCountriesSelect";

const HotelForm = ({ hotel }: { hotel?: Hotel }) => {
  const productImageFiles = useRef<File[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<String>();
  const [openCountryDialog, setOpenCountryDialog] = useState(false);

  const [selectedCity, setSelectedCity] = useState<String>();
  const [openCityDialog, setOpenCityDialog] = useState(false);

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

  const onSubmit = () => {};

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

      <form
      // onSubmit={handleSubmi(onSubmit)}
      >
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Nom</p>
          <TextField.Root
            // {...register("name")}
            // defaultValue={category?.name}
            placeholder="Nom de l'hotel"
          />
          {/* <ErrorMessage>{errors.name?.message}</ErrorMessage> */}
        </div>
        <HotelCountriesSelect
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          open={openCountryDialog}
          setOpen={setOpenCountryDialog}
        />
        <HotelCitiesSelect
          setSelectedCity={setSelectedCity}
          selectedCity={selectedCity}
          open={openCityDialog}
          setOpen={setOpenCityDialog}
        />
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

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Addrèsse</p>
          <TextField.Root
            // {...register("name")}
            // defaultValue={category?.name}
            placeholder="Addrèsse de l'hotel"
          />
          {/* <ErrorMessage>{errors.name?.message}</ErrorMessage> */}
        </div>

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Déscription</p>
          <TextArea
            // {...register("description")}
            // defaultValue={product?.description}
            rows={3}
            placeholder="Veuillez saisir déscription de l'hotel"
          />
          {/* <ErrorMessage>{errors.description?.message}</ErrorMessage> */}
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

        <Button mt="4">Enregistrer</Button>
      </form>
    </div>
  );
};

export default HotelForm;
