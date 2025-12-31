"use client";

import { Category, Product } from "@/types";
import { ProductGrid } from "./product-grid";
import { SectionHeader } from "../ui/section-header";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("categories");

  return (
    <div className="space-y-4 pt-4">
      <div id={`category-${category.id}`} className="scroll-mt-[100px]">
        <SectionHeader title={t(`${category.id}.name`)} />
      </div>
      <ProductGrid products={products} onProductClick={onProductClick} />
    </div>
  );
}
