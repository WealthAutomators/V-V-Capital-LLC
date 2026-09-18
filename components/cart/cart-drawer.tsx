"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { getEffectivePrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartDrawer() {
  const { items, itemCount, subtotal, shipping, total, isCartOpen, closeCart, updateQuantity, removeFromCart } =
    useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button className="absolute inset-0 bg-primary/40" aria-label="Close cart" onClick={closeCart} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="font-serif text-2xl">Your Bag</p>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart} aria-label="Close cart">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl">The bag is empty.</p>
              <p className="mt-2 text-sm text-muted-foreground">A few considered things tend to be enough.</p>
              <Button asChild className="mt-6" onClick={closeCart}>
                <Link href="/shop">Continue shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <Link href={`/product/${item.product.slug}`} onClick={closeCart} className="relative h-24 w-20 shrink-0 overflow-hidden bg-stone">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/product/${item.product.slug}`} onClick={closeCart} className="font-serif text-lg leading-tight hover:text-accent">
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-1 text-sm">{formatPrice(getEffectivePrice(item.product))}</p>
                    <div className="mt-3">
                      <QuantitySelector
                        quantity={item.quantity}
                        onChange={(qty) => updateQuantity(item.product.id, qty)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <p className="mb-4 text-xs text-muted-foreground">
              {remaining > 0
                ? `${formatPrice(remaining)} more for complimentary shipping.`
                : "Complimentary shipping applied."}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button asChild size="lg" className="mt-5 w-full" onClick={closeCart}>
              <Link href="/checkout">Checkout</Link>
            </Button>
            <Button asChild variant="secondary" className="mt-2 w-full" onClick={closeCart}>
              <Link href="/cart">View bag</Link>
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}
