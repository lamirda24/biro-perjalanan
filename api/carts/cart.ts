import { request } from "../config";

export interface CartResponse {
  limit: number;
  total: number;
  carts: CartData[];
  skip: number;
}

export interface CartRequest {
  limit?: number;
  skip?: number;
  q?: string;
}

export interface CartData {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
export interface CartProduct {
  id: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}
export const fetchCart = async ({ limit, skip, q }: CartRequest): Promise<CartResponse> => {
  const res = await request.get(`/products${q ? `/search?q=${q}&` : "?"}limit=${limit}&skip=${skip}`);
  return res?.data;
};
