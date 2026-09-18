import { Suspense } from "react";
import { ShopContent } from "@/components/shop/shop-content";

export const metadata = {
  title: "Shop",
  description: "Browse the V&V Capital LLC edit — home, kitchen, travel, and everyday pieces.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
