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
  onScrollStart?: () => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  onScrollStart,
}: CategoryTabsProps) {
  const t = useTranslations("categories");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);

  const scrollToActiveTab = () => {
    const viewport = scrollContainerRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;
    const activeTab = tabsListRef.current?.querySelector(
      `[data-state="active"]`
    ) as HTMLElement;

    if (!viewport || !activeTab) return;

    const viewportRect = viewport.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    const scrollLeft = viewport.scrollLeft;

    // Check if tab is outside viewport
    if (tabRect.left < viewportRect.left) {
      // Tab is to the left, scroll to show it
      const targetScroll = scrollLeft - (viewportRect.left - tabRect.left) - 16;
      viewport.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    } else if (tabRect.right > viewportRect.right) {
      // Tab is to the right, scroll to show it
      const targetScroll =
        scrollLeft + (tabRect.right - viewportRect.right) + 16;
      viewport.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Auto-scroll to active tab when activeCategory changes
    const timer = setTimeout(() => {
      scrollToActiveTab();
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleCategoryClick = (categoryId: string) => {
    onScrollStart?.();
    onCategoryChange(categoryId);

    setTimeout(() => {
      const element = document.getElementById(`category-${categoryId}`);
      if (element) {
        const stickyContainer = element
          .closest(".container")
          ?.querySelector('[class*="sticky"]') as HTMLElement;
        const stickyHeight = stickyContainer
          ? stickyContainer.offsetHeight + 8
          : 100;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const targetScroll = elementTop - stickyHeight;

        window.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: "smooth",
        });
      }
    }, 10);
  };

  return (
    <Tabs
      value={activeCategory}
      onValueChange={handleCategoryClick}
      className="w-full"
    >
      <div className="relative">
        <div ref={scrollContainerRef} className="relative">
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
                    {t(`${category.id}.name`)}
                  </motion.span>
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
      </div>
    </Tabs>
  );
}
