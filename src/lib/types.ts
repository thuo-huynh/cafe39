export type Category = {
  id: string;
  name: string;
  image?: string;
};

export type Product = {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  image: string;
  prices: {
    small: number;
    medium: number;
    large: number;
  };
  isNew?: boolean;
};

export type CustomizationOption = "hot" | "iced";
export type SizeOption = "small" | "medium" | "large";

export type Customization = {
  temperature: CustomizationOption;
  size: SizeOption;
  extras: {
    whippedCream: boolean;
    syrup: boolean;
  };
};
