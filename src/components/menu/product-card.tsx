"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

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
  const t = useTranslations("products");
  const locale = useLocale();

  // Special function to get the Vietnamese translation of a product title
  const getVietnameseTitle = () => {
    // For the demo, we'll access the Vietnamese translation directly
    // This simulates accessing the Vietnamese title
    const idParts = product.title.split(".");
    const id = idParts.length > 1 ? idParts[0] : product.title;

    // Mapping of English product IDs to Vietnamese titles
    // In a real implementation, you would fetch this from a translation file
    const vietnameseTitles: Record<string, string> = {
      "coffee-1": "Cà phê đen Sài Gòn",
      "coffee-2": "Cà phê sữa Sài Gòn",
      "coffee-3": "Cà phê muối",
      "coffee-4": "Cà phê dừa",
      "coffee-5": "Cà phê bơ",
      "coffee-6": "Bạc xỉu",
      "coffee-7": "Cacao",
      "milk-tea-1": "Trà sữa truyền thống",
      "milk-tea-2": "Trà sữa thái xanh",
      "milk-tea-3": "Trà sữa thái đỏ",
      "milk-tea-4": "Trà sữa khoai môn",
      "milk-tea-5": "Trà sữa gạo rang",
      "milk-tea-6": "Trà sữa matcha",
      "milk-tea-7": "Trà sữa chocolate",
      "milk-tea-8": "Trà sữa dâu",
      "milk-tea-9": "Trà sữa nhài",
      "must-try-1": "Sinh tố bơ",
      "must-try-2": "Sinh tố xoài",
      "must-try-3": "Milo đầm đá",
      "must-try-4": "Đá me hạt đác",
      "must-try-5": "Nha đam hạt chia",
      "must-try-6": "Matcha Latte",
      "juices-1": "Nước ép dứa",
      "juices-2": "Nước ép cam",
      "juices-3": "Nước ép dưa hấu",
      "juices-4": "Nước ép rau cần",
      "juices-5": "Nước ép rau má đậu xanh",
      "juices-6": "Nước chanh dây",
      "juices-7": "Nước chanh",
      "yogurt-1": "Sữa chua trái cây",
      "yogurt-2": "Sữa chua việt quất",
      "yogurt-3": "Sữa chua dâu",
      "yogurt-4": "Sữa chua đào",
      "yogurt-5": "Sữa chua mít",
      "yogurt-6": "Kem plan",
      "yogurt-7": "Panna cotta nhiều vị",
      "tea-1": "Trà gừng",
      "tea-2": "Trà tắc",
      "tea-3": "Trà chanh",
      "tea-4": "Trà trái cây",
      "tea-5": "Trà mãng cầu gai",
      "tea-6": "Trà đào xí muội cam sả",
      "tea-7": "Trà vải",
    };

    return vietnameseTitles[id] || id;
  };

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
        </div>
        <CardContent className="p-3 pt-2">
          {locale === "en" || locale === "kr" || locale === "jp" ? (
            <>
              <h3 className="font-bold text-sm mb-0.5 line-clamp-1">
                {t(product.title)}
              </h3>
              <p className="font-bold text-xs text-muted-foreground mb-1 line-clamp-1">
                {getVietnameseTitle()}
              </p>
            </>
          ) : (
            <h3 className="font-medium text-sm mb-1 line-clamp-1">
              {t(product.title)}
            </h3>
          )}
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
