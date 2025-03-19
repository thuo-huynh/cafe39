"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Product, ProductSize, Temperature } from "@/types";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface ProductDetailProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function ProductDetail({ product, open, onClose }: ProductDetailProps) {
  const t = useTranslations("products");
  const tDetail = useTranslations("productsDetail");
  const [temperature, setTemperature] = useState<Temperature>("hot");
  const [size, setSize] = useState<ProductSize>("medium");

  if (!product) return null;

  const formatPrice = (price: number | null) => {
    if (price === null) return "Không có";
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const sizeLabels: Record<string, string> = {
    medium: "Size M",
    large: "Size L",
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0 bg-white">
        <div className="flex items-center p-4 border-b">
          <button onClick={onClose} className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <SheetTitle className="text-base flex-1 ml-2">
            {tDetail("productDetail")}
          </SheetTitle>
        </div>

        <div className="px-5 py-4">
          <div className="mb-5 flex justify-center">
            <Image
              src={product.image}
              alt={product.title}
              width={220}
              height={220}
              className="object-contain rounded-lg"
            />
          </div>

          <h2 className="text-xl font-semibold mb-2">{t(product.title)}</h2>
          <p className="text-sm text-gray-600 mb-4">{t(product.description)}</p>

          <div className="mb-6">
            <span className="font-medium">
              {formatPrice(product.price.medium)}
            </span>
            {product.price.large !== null && (
              <span className="ml-1 font-medium">
                - {formatPrice(product.price.large)}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {/* Temperature Selection */}
            <div className="space-y-2">
              <h3 className="text-base font-medium">{tDetail("type")}</h3>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`flex items-center justify-center py-3 rounded-md cursor-pointer ${
                    temperature === "hot"
                      ? "bg-gray-200 font-medium"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setTemperature("hot")}
                >
                  <label className="text-sm cursor-pointer">
                    {tDetail("hot")}
                  </label>
                </div>
                <div
                  className={`flex items-center justify-center py-3 rounded-md cursor-pointer ${
                    temperature === "iced"
                      ? "bg-gray-200 font-medium"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setTemperature("iced")}
                >
                  <label className="text-sm cursor-pointer">
                    {tDetail("iced")}
                  </label>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            {product.price.large !== null && (
              <div className="space-y-2">
                <h3 className="text-base font-medium">{tDetail("size")}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["medium", "large"].map((sizeOption) => (
                    <div key={sizeOption} className="relative">
                      <div
                        className={`
                          flex flex-col items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer
                          h-full w-full
                          ${
                            size === sizeOption
                              ? "bg-gray-200 font-medium"
                              : "bg-gray-100"
                          }
                        `}
                        onClick={() => setSize(sizeOption as ProductSize)}
                      >
                        <Image
                          src={`/images/sizes/size-${
                            sizeOption === "medium" ? "m" : "l"
                          }.png`}
                          alt={sizeLabels[sizeOption] || sizeOption}
                          width={40}
                          height={48}
                          className="mb-2"
                        />
                        <span className="text-xs font-medium">
                          {sizeLabels[sizeOption]}
                        </span>
                        <span className="text-xs">
                          {sizeOption === "medium"
                            ? formatPrice(product.price.medium)
                            : formatPrice(product.price.large)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
