import { ErrorMessage } from "@/app/_components";
import { ProductSchema } from "@/app/lib/types";
import { productSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Switch, TextArea, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import FeaturesToPostTable from "./FeaturesToPostTable";
import { TiInputCheckedOutline } from "react-icons/ti";

const ProductForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductSchema) => {
    console.log(JSON.stringify(data));
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
        <p className="text-sm font-bold">Ancien prix</p>
        <TextField.Root
          {...register("oldPrice")}
          placeholder="Veuillez saisir l'ancien prix"
        />
        <ErrorMessage>{errors.oldPrice?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Prix courant</p>
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
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
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
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Catégorie</p>
        <TextField.Root
          {...register("category")}
          placeholder="Veuillez entrer la catégorie du produit"
        />
        <ErrorMessage>{errors.category?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Sous catégorie</p>
        <TextField.Root
          {...register("subCategory")}
          placeholder="Veuillez entrer la sous-catégorie du produit"
        />
        <ErrorMessage>{errors.subCategory?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Photos</p>
        <Flex gap="4">
          <div className="h-[80px]  w-[100px] flex justify-center items-center rounded-md bg-white relative">
            <IoIosAdd size={20} />
          </div>
          <div className="h-[80px]  w-[100px] flex justify-center items-center rounded-md bg-white relative">
            <IoIosAdd size={20} />
          </div>
          <div className="h-[80px]  w-[100px] flex justify-center items-center rounded-md bg-white relative">
            <IoIosAdd size={20} />
          </div>
        </Flex>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <Flex justify="between">
          <p className="text-sm font-bold">Caractéristiques</p>
          <Flex align="center">
            <IoIosAdd size={20} />
            <p className="text-sm underline hover:cursor-default">
              Ajoutrer a la liste
            </p>
          </Flex>
        </Flex>
        <TextField.Root placeholder="Veuillez saisir une caractéristique" />
        <div className="flex flex-wrap gap-2 mt-2 text-sm mb-4">
          {[...Array(5)].map((feature, index) => (
            <div
              key={index}
              style={{
                borderColor: index !== 0 && index !== 2 ? "blue" : "gray",
              }}
              className="border border-dotted rounded-md px-4 py-1 flex items-center"
            >
              <p className="mr-1">10Gb</p>
              <TextField.Root className="w-[50px] h-[20px] border-gray-50" />
              <p className="ml-1 mr-2">Usd</p>
              {index !== 0 && index !== 2 && (
                <TiInputCheckedOutline color="blue" size={30} />
              )}
            </div>
          ))}
        </div>
        <FeaturesToPostTable />
      </div>
      <Button mt="6">Enregistrer</Button>
    </form>
  );
};

export default ProductForm;
