"use client";

import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-muted-foreground">Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr"
    >
      {products.map((product) => (
        <div key={product.id} className="h-full">
          <ProductCard
            product={product}
            onClick={onProductClick}
            isNew={
              product.id === "coffee-1" ||
              product.id === "milk-tea-1" ||
              product.id === "must-try-1"
            }
          />
        </div>
      ))}
    </motion.div>
  );
}
