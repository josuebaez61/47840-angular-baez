import { Buyer } from '../../buyers/models';
import { Product } from '../../products/models';

export interface Sale {
  id: number;
  productId: number;
  buyerId: number;
}

export interface SaleWithProductAndBuyer extends Sale {
  product: Product;
  buyer: Buyer;
}

export interface CreateSalePayload {
  productId: number | null;
  buyerId: number | null;
}
