"use client";

import { NavigationFooter } from "@/components/menu";
import { CategoryTabs } from "@/components/menu/category-tabs";
import { ProductDetail } from "@/components/menu/product-detail";
import { ProductGrid } from "@/components/menu/product-grid";
import { categories, products } from "@/data/menu";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const t = useTranslations("home");
  // Filter products by active category
  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pb-2">
        <div className="container mx-auto max-w-6xl px-4 pt-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-4"
          >
            {t("menu")}
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6 mt-4">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <main className="pb-20">
          <ProductGrid
            products={filteredProducts}
            onProductClick={handleProductClick}
          />
        </main>

        <ProductDetail
          product={selectedProduct}
          open={detailOpen}
          onClose={handleCloseDetail}
        />
      </div>
      <NavigationFooter />
    </div>
  );
}
