import { request } from "../config";

export interface ProductResponse {
  limit: number;
  total: number;
  products: ProductData[];
  skip: number;
}

export interface ProductRequest {
  limit?: number;
  skip?: number;
  q?: string;
}

export interface ProductData {
  id: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  price: number;
  rating: number;
  thumbnail: string;
  title: string;
  images: string[];
  stock: number;
}

export const fetchProduct = async ({ limit, skip, q }: ProductRequest): Promise<ProductResponse> => {
  const res = await request.get(`/products${q ? `/search?q=${q}&` : "?"}limit=${limit}&skip=${skip}`);
  return res?.data;
};
