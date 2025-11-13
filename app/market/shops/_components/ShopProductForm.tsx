"use client";

import React, { useState } from "react";
import ShopProductSelect from "../../products/_components/ShopProductSelect";
import { Shop } from "@/app/lib/types";
import { Button, Spinner, TextField } from "@radix-ui/themes";
import { ErrorMessage } from "@/app/_components";

const ShopProductForm = () => {
  const [selectedShop, setSelectedShop] = useState<Shop>();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="max-w-xl">
      <form>
        <ShopProductSelect
          setSelectedShop={setSelectedShop}
          selectedShop={selectedShop}
          open={openDialog}
          setOpen={setOpenDialog}
        />

        <ShopProductSelect
          setSelectedShop={setSelectedShop}
          selectedShop={selectedShop}
          open={openDialog}
          setOpen={setOpenDialog}
        />

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Coût</p>
          <TextField.Root
            // {...register("cost")}
            type="number"
            placeholder="Saisissez le prix d'achat"
            // defaultValue={product?.cost}
          />
          {/* <ErrorMessage>{errors.cost?.message}</ErrorMessage> */}
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Prix</p>
          <TextField.Root
            // {...register("price")}
            type="number"
            // defaultValue={product?.price}
            placeholder="Veuillez saisir l'ancien prix"
          />
          {/* <ErrorMessage>{errors.price?.message}</ErrorMessage> */}
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Prix de réduction</p>
          <TextField.Root
            // {...register("discountPrice")}
            type="number"
            // defaultValue={product?.discountPrice}
            placeholder="Veuillez saisir l'ancien prix"
          />
          {/* <ErrorMessage>{errors.price?.message}</ErrorMessage> */}
        </div>
        <Button
          //   disabled={isSubmitting || isUploading || isPendingSendingLinks}
          mt="6"
        >
          Enregistrer
          {/* {product ? "Modifier" : "Enregistrer"}{" "}
          {(isSubmitting || isUploading || isPendingSendingLinks) && (
            <Spinner />
          )} */}
        </Button>
      </form>
    </div>
  );
};

export default ShopProductForm;
