type ShopsListResponse = {
  count: number;
  data: Shop[];
};

type Shop = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};
