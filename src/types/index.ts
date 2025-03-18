export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: {
    medium: number;
    large: number | null;
  };
  category: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type ProductSize = "medium" | "large";
export type Temperature = "hot" | "iced";

export interface ProductOption {
  size: ProductSize;
  temperature: Temperature;
}
