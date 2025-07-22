import { OrderDetail, User } from "@/app/lib/types";

export type ShopType = {
  id: string;
  name: string;
  createdAt: string; // or `Date` if you plan to parse it
  updatedAt: string; // or `Date` if you plan to parse it
};

export type ShopTypesResponse = {
  data: ShopType[];
};

export type OrderResponse = {
  data: {
    id: string;
    orderNumber: string;
    code: string;
    status: string;
    customerId: string;
    delivererId: string | null;
    orderTypeId: string;
    createdAt: string;
    updatedAt: string;
    customer: {
      id: string;
      fullName: string;
      role: string;
      idCardCopy: string | null;
      idCardNumber: string | null;
      emailAddress: string | null;
      phone: string;
      password: string;
      refreshToken: string;
      createdAt: string;
      updatedAt: string;
    };
    deliverer?: User;
    orderType: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    ordersDetails: OrderDetail[];
  };
};
