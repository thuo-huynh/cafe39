"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Category } from "@/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

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
  const t = useTranslations("categories");
  const tabsListRef = useRef<HTMLDivElement>(null);

  return (
    <Tabs
      value={activeCategory}
      onValueChange={onCategoryChange}
      className="w-full"
    >
      <div className="">
        <ScrollArea className="w-full">
          <TabsList
            ref={tabsListRef}
            className="inline-flex w-max min-w-full h-auto p-1 bg-muted/50 gap-2"
          >
            {categories.map((category, index) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex-shrink-0 h-10 px-4 data-[state=active]:bg-primary data-[state=active]:text-white rounded-full hover:bg-secondary hover:text-white"
                style={index === 0 ? { marginLeft: 0 } : undefined}
              >
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {t(category.name)}
                </motion.span>
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </Tabs>
  );
}
