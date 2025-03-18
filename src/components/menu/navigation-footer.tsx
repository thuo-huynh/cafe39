"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export function NavigationFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around h-16">
        <OrderButton />
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <button
      className={`flex flex-col items-center justify-center h-full w-16 space-y-1 ${
        active ? "text-primary" : "text-gray-500"
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}

function OrderButton() {
  return (
    <div className="relative -top-5">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative flex flex-col items-center justify-center w-14 h-14 rounded-full bg-primary text-white">
          <Coffee size={30} className="mb-1" />
        </div>
      </motion.div>
    </div>
  );
}
