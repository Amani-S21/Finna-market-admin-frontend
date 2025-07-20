import { Roles, User, UserSchema, UsersResponse } from "@/app/lib/types";
import { userSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useForm } from "react-hook-form";
import { fetchUser, fetchUsers, searchUser, updateUser } from "./api";

type UseSearchUser = {
  axios: AxiosInstance;
  term: string;
  role?: Roles;
  enabled: boolean;
};

export const useSearchUser = ({
  axios,
  term,
  role,
  enabled,
}: UseSearchUser) => {
  return useQuery<User[]>({
    queryKey: ["searched-users", term, role],
    queryFn: () => searchUser(axios, term, role),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseFetchUsers = {
  axios: AxiosInstance;
  enabled: boolean;
  page: string;
  role?: Roles;
};

export const useFetchUsers = ({
  axios,
  page,
  role,
  enabled,
}: UseFetchUsers) => {
  return useQuery<UsersResponse>({
    queryKey: ["users", page, role],
    queryFn: () => fetchUsers(axios, page, role),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

type UseFetchUser = {
  axios: AxiosInstance;
  enabled: boolean;
  userId: string;
};

export const useFetchUser = ({ axios, userId, enabled }: UseFetchUser) => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(axios, userId),
    staleTime: 60 * 1000 * 5,
    retry: 3,
    enabled,
  });
};

export const useUserForm = () => {
  return useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });
};

export const useUpdateUser = ({ axios }: { axios: AxiosInstance }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: User) => updateUser(axios, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
