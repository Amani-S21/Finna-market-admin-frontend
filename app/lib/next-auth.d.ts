declare module "next-auth" {
  interface Session {
    data: {
      id: string;
      fullName: string;
      phone: string;
      role: string;
      emailAddress: string;
      shopAffectations: {
        shopId: string;
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

declare module "next-auth/jwt" {
  interface JWT {
    data: {
      id: string;
      fullName: string;
      phone: string;
      role: string;
      emailAddress: string;
      shopAffectations: {
        shopId: string;
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
      shopId: string;
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
