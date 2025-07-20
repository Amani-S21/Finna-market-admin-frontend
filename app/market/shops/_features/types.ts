export type ExpeditionRegion = {
  id: string;
  name: string;
  createdAt: string; // Use `Date` if you parse it
  updatedAt: string; // Use `Date` if you parse it
};

export type ExpeditionRegionsResponse = {
  data: ExpeditionRegion[];
};
