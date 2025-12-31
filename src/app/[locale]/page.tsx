"use client";

import { NavigationFooter } from "@/components/menu";
import { CategoryTabs } from "@/components/menu/category-tabs";
import { ProductDetail } from "@/components/menu/product-detail";
import { MenuSection } from "@/components/menu/menu-section";
import { LanguageSwitcher } from "@/components/menu/language-switcher";
import { categories, products } from "@/data/menu";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("home");
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const isScrollingProgrammatically = useRef(false);
  const scrollEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleScrollStart = () => {
    if (scrollEndTimeoutRef.current) {
      clearTimeout(scrollEndTimeoutRef.current);
    }

    isScrollingProgrammatically.current = true;

    scrollEndTimeoutRef.current = setTimeout(() => {
      isScrollingProgrammatically.current = false;
      scrollEndTimeoutRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    const getStickyHeight = (): number => {
      const container = document.querySelector(
        '.container[class*="max-w-6xl"]'
      ) as HTMLElement;
      const stickyContainer = container?.querySelector(
        '[class*="sticky"]'
      ) as HTMLElement;
      return stickyContainer ? stickyContainer.offsetHeight + 8 : 100;
    };

    const handleScroll = () => {
      if (isScrollingProgrammatically.current) {
        return;
      }

      const stickyHeight = getStickyHeight();
      const scrollPosition = window.scrollY + stickyHeight;

      for (let i = categories.length - 1; i >= 0; i--) {
        const category = categories[i];
        const element = document.getElementById(`category-${category.id}`);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveCategory((prev) => {
              if (prev !== category.id) {
                return category.id;
              }
              return prev;
            });
            break;
          }
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          {t("menu")}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl font-bold mb-4 text-center text-primary"
        >
          {t("language")}
        </motion.h1>

        <LanguageSwitcher currentLocale={locale} />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6 mt-4 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-2 pt-2 pointer-events-auto">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            onScrollStart={handleScrollStart}
          />
        </div>

        <main className="pb-20">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category.id
            );
            return (
              <MenuSection
                key={category.id}
                category={category}
                products={categoryProducts}
                onProductClick={handleProductClick}
              />
            );
          })}
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
