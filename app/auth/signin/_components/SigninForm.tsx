"use client";

import ErrorMessage from "@/app/_components/ErrorMessage";
import Spinner from "@/app/_components/Spinner";
import { signinSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Phone } from "lucide-react";
import { useState } from "react";
import styles from "../signin.module.css";
import { SigninSchema } from "@/app/lib/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchema>({ resolver: zodResolver(signinSchema) });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: SigninSchema) => {
    const result = await signIn("credentials", {
      phone: data.phone,
      password: data.password,
      redirect: false,
    });

    if (result?.status === 200) {
      toast.success("Connecté avec succèes");
      router.replace("/");
    } else if (result?.error) {
      if (result.error === "401") {
        toast.error("Veuillez vérifier vos informations");
      }
      toast.error("Echec de connection, veuillez verifier vos cooordonées");
    } else {
      toast.error("An unknown error occurred");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="signin-phone" className={styles.label}>Numéro de téléphone</label>
        <TextField.Root
          {...register("phone")}
          id="signin-phone"
          className={styles.input}
          defaultValue="+243835102434"
          type="tel"
          autoComplete="username"
          placeholder="Numéro de téléphone"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "signin-phone-error" : undefined}
          data-invalid={!!errors.phone}
        >
          <TextField.Slot><Phone size={17} aria-hidden="true" /></TextField.Slot>
        </TextField.Root>
        {errors.phone && <div id="signin-phone-error"><ErrorMessage>{errors.phone.message}</ErrorMessage></div>}
      </div>
      <div className={styles.field}>
        <label htmlFor="signin-password" className={styles.label}>Mot de passe</label>
        <TextField.Root
          {...register("password")}
          id="signin-password"
          className={styles.input}
          defaultValue="12345"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Mot de passe"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "signin-password-error" : undefined}
          data-invalid={!!errors.password}
        >
          <TextField.Slot><LockKeyhole size={17} aria-hidden="true" /></TextField.Slot>
          <TextField.Slot side="right">
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              aria-controls="signin-password"
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
            </button>
          </TextField.Slot>
        </TextField.Root>
        {errors.password && <div id="signin-password-error"><ErrorMessage>{errors.password.message}</ErrorMessage></div>}
      </div>
      <button type="submit" className={styles.submit} disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        {isSubmitting ? <Spinner /> : <ArrowRight size={17} aria-hidden="true" />}
      </button>
    </form>
  );
};

export default SigninForm;
