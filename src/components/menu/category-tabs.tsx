"use client";

import { Category } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <Tabs
      value={activeCategory}
      onValueChange={onCategoryChange}
      className="w-full"
    >
      <TabsList className="flex w-full h-auto p-1 bg-muted/50 overflow-x-auto gap-1 no-scrollbar">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="flex-shrink-0 h-10 px-4 data-[state=active]:bg-primary data-[state=active]:text-white rounded-full"
          >
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium"
            >
              {category.name}
            </motion.span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
