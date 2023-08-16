export interface Buyer {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface CreateBuyerPayload {
  name: string | null;
  surname: string | null;
  email: string | null;
}
