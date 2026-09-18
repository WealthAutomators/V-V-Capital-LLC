"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/data/products";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchResults = searchQuery.length > 0 ? searchProducts(searchQuery).slice(0, 6) : [];

  useEffect(() => {
    if (open) {
      setSearchQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <button className="absolute inset-0 bg-primary/40" aria-label="Close search" onClick={onClose} />
      <div className="relative mx-auto mt-0 max-w-2xl border-b border-border bg-ivory p-5 shadow-lg sm:mt-16 sm:border sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Search the edit</p>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Close search">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <Search className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Home, kitchen, travel, gifts…"
              className="h-12 rounded-none border-0 border-b border-border bg-transparent pl-8 pr-4 text-base shadow-none focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        {searchQuery.trim().length > 0 && (
          <div className="mt-4">
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.slug}`}
                      className="flex items-center gap-4 py-3 transition-colors hover:bg-muted/60"
                      onClick={onClose}
                    >
                      <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-stone">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <p className="font-serif text-lg leading-tight">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{formatPrice(product.salePrice ?? product.price)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="w-full py-3 text-left text-xs font-medium uppercase tracking-[0.16em] text-primary"
                    onClick={() => {
                      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                      onClose();
                    }}
                  >
                    View all results
                  </button>
                </li>
              </ul>
            ) : (
              <p className="py-6 text-sm text-muted-foreground">No products found for “{searchQuery}”.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function SearchBar() {
  return null;
}
