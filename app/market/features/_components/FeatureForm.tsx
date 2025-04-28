"use client";

import ErrorMessage from "@/app/_components/ErrorMessage";
import { Feature, FeatureSchema } from "@/app/lib/types";
import { featureSchema } from "@/app/lib/validationSchemas";
import { addFeatureValue } from "@/redux/features/featureSlice";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Spinner, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { SelectSearchItem } from "../../products/_components";

const FeatureForm = ({ feature }: { feature?: Feature }) => {
  const dispatch = useDispatch();
  const { featureValues } = useSelector((state: RootState) => state.feature);
  const {
    register,
    resetField,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeatureSchema>({
    resolver: zodResolver(featureSchema),
  });

  const onSubmit = (data: FeatureSchema) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Nom</p>
        <TextField.Root
          {...register("name")}
          placeholder="Nom de la caractéristique"
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <Flex justify="between">
          <p className="text-sm font-bold">Valeur caractéristique</p>
          <Flex
            align="center"
            onClick={() => {
              dispatch(
                addFeatureValue({
                  value: watch("type") ?? "",
                })
              );

              resetField("type");
            }}
          >
            <IoIosAdd size={20} />
            <p className="text-sm underline hover:cursor-default">
              Ajoutrer à la liste
            </p>
          </Flex>
        </Flex>
        <TextField.Root
          {...register("type")}
          placeholder="Type de la caractéristique"
        />
      </div>

      {(featureValues ?? []).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {featureValues?.map((v, index) => (
            <SelectSearchItem key={v.value + index} title={v.value} />
          ))}
        </div>
      )}
      <Button disabled={isSubmitting} mt="4">
        {feature ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default FeatureForm;
