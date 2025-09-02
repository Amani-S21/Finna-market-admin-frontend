export type PlacesResponse = {
  count: number;
  data: PlaceType[];
};

export type PlaceType = {
  id: string;
  name: string;
  city: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type PlaceTypePayload = {
  name: string;
  city: string;
};
