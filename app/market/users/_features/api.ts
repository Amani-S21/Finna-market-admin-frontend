import { Roles, User } from "@/app/lib/types";
import { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const searchUser = async (
  axios: AxiosInstance,
  term: string,
  role?: Roles
) => {
  try {
    const res = role
      ? await axios.get(`/users/search?term=${term}&role=${role}`)
      : await axios.get(`/users/search?term=${term}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchUsers = async (
  axios: AxiosInstance,
  page: string,
  role?: Roles
) => {
  try {
    const query = role
      ? `role=${role}&page=${page}&limit=10`
      : `page=${page}&limit=10`;
    const res = await axios.get(`/users?${query}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchUser = async (axios: AxiosInstance, userId: string) => {
  try {
    const res = await axios.get(`/users/${userId}`);
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const fetchUsersByShop = async (
  axios: AxiosInstance,
  shopId: string,
  page: string
) => {
  try {
    const res = await axios.get(
      `/users/by-shop/${shopId}?page=${page}&limit=10`
    );
    return res.data;
  } catch (error: any) {
    toast.error(JSON.stringify(error));
  }
};

export const updateUser = async (axios: AxiosInstance, data: User) => {
  try {
    const res = await axios.patch(`/users`, data);
    return res.data;
  } catch (error: any) {
    const statusCode = error?.response?.status;
    let message = "An unexpected error occurred";

    if (statusCode === 202) {
      message = "Informations du compte modifiées avec succèes";
    }

    const customError = new Error(message);
    throw customError;
  }
};
