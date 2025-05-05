import { SubmitUpdatePassword } from "@/app/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { updatePassword } from "./api";

export const useUpdatePassword = ({ axios }: { axios: AxiosInstance }) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SubmitUpdatePassword) => updatePassword(axios, data),
    onSuccess: () => {
      router.back();
    },
  });
};
