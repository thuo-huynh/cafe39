"use client";

import Image from "next/image";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  isNew?: boolean;
}

export function ProductCard({
  product,
  onClick,
  isNew = false,
}: ProductCardProps) {
  const formatPrice = (price: number | null) => {
    if (price === null) return "";
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card
        className="overflow-hidden cursor-pointer h-full shadow-sm hover:shadow-md transition-shadow flex flex-col rounded-xl gap-2 py-2"
        onClick={() => onClick(product)}
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover p-3 rounded-2xl"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {isNew && (
            <div className="absolute top-0 left-1 bg-green-100 text-xs font-bold flex items-center justify-center w-8 h-8 rounded-full">
              MỚI!
            </div>
          )}
        </div>
        <CardContent className="p-3 pt-2">
          <h3 className="font-medium text-sm mb-1 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-primary text-sm font-semibold">
            {formatPrice(product.price.medium)}
            {product.price.large !== null && (
              <span className="text-primary text-sm font-semibold ml-1">
                - {formatPrice(product.price.large)}
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
