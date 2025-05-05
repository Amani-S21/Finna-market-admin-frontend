import { SubmitUpdatePassword } from "@/app/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { updatePassword } from "./api";

export const useUpdatePassword = ({ axios }: { axios: AxiosInstance }) => {
  return useMutation({
    mutationFn: (data: SubmitUpdatePassword) => updatePassword(axios, data),
  });
};
