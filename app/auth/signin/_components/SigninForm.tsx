import { SigninSchema } from "@/app/types";
import { signinSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

const SigninForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchema>({ resolver: zodResolver(signinSchema) });

  const onSubmit = async (data: SigninSchema) => {
    await signIn("credentials", {
      phone: data.phone,
      password: data.password,
      redirect: true,
      callbackUrl: "/departments",
    });
  };

  return (
    <form
      className="flex flex-col mt-6 w-full max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col space-y-2 mt-5">
        <p className="text-sm font-bold">Numero de téléphone</p>
        <TextField.Root
          {...register("phone")}
          placeholder="Numero de téléphone"
        />
        {errors.phone && (
          <Text color="red" size="1" as="p">
            {errors.phone.message}
          </Text>
        )}
      </div>
      <div className="flex flex-col space-y-2 mt-5">
        <p className="text-sm font-bold">Mot de passe</p>
        <TextField.Root
          {...register("password")}
          type="password"
          placeholder="Mot de passe"
        />
        {errors.password && (
          <Text color="red" size="1" as="p">
            {errors.password.message}
          </Text>
        )}
      </div>
      <Button mt="5">Enregistrer</Button>
    </form>
  );
};

export default SigninForm;
