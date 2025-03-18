import { Category, Product } from "@/types";
import { ProductGrid } from "./product-grid";
import { SectionHeader } from "../ui/section-header";

interface MenuSectionProps {
  category: Category;
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function MenuSection({
  category,
  products,
  onProductClick,
}: MenuSectionProps) {
  return (
    <div className="space-y-4 pt-4">
      <SectionHeader title={category.name} />
      <ProductGrid products={products} onProductClick={onProductClick} />
    </div>
  );
}
