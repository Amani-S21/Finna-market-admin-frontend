import { boolean } from "zod";

declare module "next-auth" {
  interface Session {
    data: {
      id: string;
      fullName: string;
      phone: string;
      role: string;
      emailAddress: string;
      shopAffectations: {
        role: string;
        userId: string;
        shopId: string;
        isActive: boolean;
      }[];
    };
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    data: {
      id: string;
      fullName: string;
      phone: string;
      role: string;
      emailAddress: string;
      shopAffectations: {
        role: string;
        shop: {
          id: string;
          name: string;
          address: string;
          creatorId: string;
          createdAt: string;
          updatedAt: string;
        };
      }[];
    };
    accessToken: string;
    refreshToken: string;
  }
}

export interface User {
  data: {
    id: string;
    fullName: string;
    phone: string;
    role: string;
    emailAddress: string;
    shopAffectations: {
      role: string;
      shop: {
        id: string;
        name: string;
        address: string;
        creatorId: string;
        createdAt: string;
        updatedAt: string;
      };
    }[];
  };
  accessToken: string;
  refreshToken: string;
}
