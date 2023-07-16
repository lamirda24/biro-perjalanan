export interface ProductResponse {
  limit: number;
  total: number;
  products: ProductData[];
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
}
