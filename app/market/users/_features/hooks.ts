import { Roles, User } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { searchUser } from "./api";

type UseSearchUser = {
  axios: AxiosInstance;
  term: string;
  role: Roles;
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
