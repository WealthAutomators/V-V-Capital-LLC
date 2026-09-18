"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products as allProducts } from "@/data/products";
import { sortOptions } from "@/data/homepage";
import { Product } from "@/types";
import { getEffectivePrice } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { ShopSidebar } from "@/components/shop/shop-sidebar";
import { SlidersHorizontal } from "lucide-react";

const ITEMS_PER_PAGE = 12;

function sortProducts(items: Product[], sort: string): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
    case "price-desc":
      return sorted.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
    case "newest":
      return sorted.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export function ShopContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSale = searchParams.get("sale") === "true";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(initialSale);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categorySlug));
    }

    result = result.filter((p) => {
      const price = getEffectivePrice(p);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    if (saleOnly) {
      result = result.filter((p) => p.salePrice);
    }

    return sortProducts(result, sort);
  }, [search, selectedCategories, priceRange, inStockOnly, saleOnly, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setPage(1);
  };

  const sidebarProps = {
    search,
    onSearchChange: (value: string) => {
      setSearch(value);
      setPage(1);
    },
    selectedCategories,
    onToggleCategory: toggleCategory,
    priceRange,
    onPriceRangeChange: setPriceRange,
    inStockOnly,
    onInStockChange: setInStockOnly,
    saleOnly,
    onSaleChange: setSaleOnly,
  };

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">Shop</h1>
        <p className="mt-2 text-muted-foreground">{filteredProducts.length} pieces</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <ShopSidebar {...sidebarProps} />
        </aside>

        <div className="flex-1 min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="secondary"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            <Select value={sort} onValueChange={(v) => { setSort(v); setPage(1); }}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {sidebarOpen && (
            <div className="mb-6 rounded-lg border border-border p-6 lg:hidden">
              <ShopSidebar {...sidebarProps} />
            </div>
          )}

          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">No products found matching your filters.</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => {
                  setSearch("");
                  setSelectedCategories([]);
                  setPriceRange([0, 150]);
                  setInStockOnly(false);
                  setSaleOnly(false);
                  setPage(1);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="secondary"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
