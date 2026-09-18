"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  size?: "default" | "large" | "compact";
}

export const ProductCard = memo(function ProductCard({ product, className, size = "default" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount ? calculateDiscount(product.price, product.salePrice!) : 0;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <motion.div
        className={cn("group relative flex flex-col", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "relative overflow-hidden border border-border/80 bg-stone shadow-[0_1px_0_rgba(28,27,25,0.04)]",
            size === "large" ? "aspect-[4/5] md:aspect-[5/6]" : "aspect-[4/5]"
          )}
        >
          <Link href={`/product/${product.slug}`} className="block h-full w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              loading="lazy"
              className={cn(
                "object-cover transition-all duration-700 ease-out",
                isHovered && product.images[1] ? "opacity-0 scale-[1.03]" : "opacity-100"
              )}
              sizes={size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                fill
                loading="lazy"
                className={cn(
                  "object-cover transition-all duration-700 ease-out",
                  isHovered ? "opacity-100 scale-[1.03]" : "opacity-0"
                )}
                sizes={size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />
            )}
          </Link>

          {hasDiscount && (
            <Badge variant="sale" className="absolute left-3 top-3">
              −{discountPercent}%
            </Badge>
          )}
          {product.badge && !hasDiscount && (
            <Badge variant="outline" className="absolute left-3 top-3 bg-card/90 backdrop-blur-sm">
              {product.badge}
            </Badge>
          )}
          {product.newArrival && !hasDiscount && !product.badge && (
            <Badge variant="outline" className="absolute left-3 top-3 bg-card/90 backdrop-blur-sm">
              New
            </Badge>
          )}

          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-sm:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-[2px] bg-card/95 shadow-sm"
              onClick={() => toggleWishlist(product.id)}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-accent text-accent")} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-[2px] bg-card/95 shadow-sm"
              onClick={() => setQuickViewOpen(true)}
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0 max-sm:translate-y-0">
            <Button className="w-full" size="sm" onClick={handleAddToCart}>
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col gap-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {product.category}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-lg font-medium leading-snug text-foreground transition-colors hover:text-accent line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <StarRating rating={product.rating} reviews={product.reviews} />
          <div className="mt-auto flex items-baseline gap-2 pt-1">
            {hasDiscount ? (
              <>
                <span className="text-sm font-medium text-accent">{formatPrice(product.salePrice!)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-foreground">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </motion.div>

      <QuickViewModal product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </>
  );
});
