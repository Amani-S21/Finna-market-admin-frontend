export type ShopType = {
  id: string;
  name: string;
  createdAt: string; // or `Date` if you plan to parse it
  updatedAt: string; // or `Date` if you plan to parse it
};

export type ShopTypesResponse = {
  data: ShopType[];
};
