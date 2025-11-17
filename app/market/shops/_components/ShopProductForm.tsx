"use client";

import { Product, Shop, ShopProductSchema } from "@/app/lib/types";
import { Button, TextField } from "@radix-ui/themes";

import { useState } from "react";
import ProductSelect from "../../products/_components/productSelect";
import ShopProductSelect from "../../products/_components/ShopProductSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { shopProductSchema } from "@/app/lib/validationSchemas";
import { ErrorMessage, Spinner } from "@/app/_components";
import { ShopProductSubmit } from "../../products/_features/types";
import { useAffectProductToShop } from "../_features/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";

const ShopProductForm = ({ product }: { product?: Product }) => {
  const queryClient = useQueryClient();
  const axios = useAxiosAuth();
  const router = useRouter();
  const [selectedShop, setSelectedShop] = useState<Shop>();
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [openProductDialog, setOpenProductDialog] = useState(false);

  const {
    register,
  
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShopProductSchema>({
    resolver: zodResolver(shopProductSchema),
  });

  const { mutateAsync: createProductShop } = useAffectProductToShop({ axios });

  const onSubmit = async (data: ShopProductSchema) => {
    const { cost, discountPrice, price } = data;

    const productSubmit: ShopProductSubmit = {
      cost,
      price,
      discountPrice,
      deliveryFees: data.deliveryFees,
      productId: `${selectedProduct?.id}`,
      shopId: `${selectedShop?.id}`,
      published: true,
    };

    // Remove keys that are null, undefined, or empty strings
    // const cleanedPayload = Object.fromEntries(
    //   Object.entries(productSubmit).filter(([_, v]) => v != null && v !== "")
    // );

    await createProductShop(productSubmit, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["shop-products"] });
        toast.success("Produit créé avec succèes");
        router.back();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ShopProductSelect
          setSelectedShop={setSelectedShop}
          selectedShop={selectedShop}
          open={openDialog}
          setOpen={setOpenDialog}
        />

        <ProductSelect
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          open={openProductDialog}
          setOpen={setOpenProductDialog}
        />

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Coût</p>
          <TextField.Root
            {...register("cost")}
            type="number"
            placeholder="Saisissez le prix d'achat"
            defaultValue={product?.cost}
          />
          <ErrorMessage>{errors.cost?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Prix</p>
          <TextField.Root
            {...register("price")}
            type="number"
            defaultValue={product?.price}
            placeholder="Veuillez saisir l'ancien prix"
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Prix de réduction</p>
          <TextField.Root
            {...register("discountPrice")}
            type="number"
            defaultValue={product?.discountPrice}
            placeholder="Veuillez saisir l'ancien prix"
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Frais de livraison</p>
          <TextField.Root
            {...register("deliveryFees")}
            type="number"
            defaultValue={product?.discountPrice}
            placeholder="Veuillez saisir les frais de livraison"
          />
          <ErrorMessage>{errors.deliveryFees?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting} mt="4">
          {product ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ShopProductForm;
