export interface TransportAgencyResponse {
  count: number;
  data: TransportAgency[];
}

export interface TransportAgency {
  id: string;
  name: string;
  photo: string | null;
  email: string | null;
  phone: string | null;
  visible: boolean;
  address: string | null;
  documents: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
