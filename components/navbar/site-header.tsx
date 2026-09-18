"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { company } from "@/data/company";
import { navigationLinks } from "@/data/navigation";
import { utilityBarMessage } from "@/data/homepage";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SearchOverlay } from "@/components/navbar/search-bar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount, openCart } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="sticky top-0 z-50">
      <div
        className={cn(
          "overflow-hidden border-b border-primary/10 bg-primary text-primary-foreground transition-all duration-300",
          scrolled ? "max-h-0 border-transparent py-0" : "max-h-10"
        )}
      >
        <p className="px-4 py-1.5 text-center text-[11px] font-medium tracking-[0.14em] uppercase">
          {utilityBarMessage}
        </p>
      </div>

      <header
        className={cn(
          "border-b border-border/80 transition-all duration-300",
          scrolled ? "bg-ivory/92 shadow-[0_1px_0_rgba(28,27,25,0.06)] backdrop-blur-md" : "bg-ivory"
        )}
      >
        <Container>
          <div className={cn("flex items-center gap-6 transition-all duration-300", scrolled ? "h-14" : "h-16 lg:h-[4.5rem]")}>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" className="flex shrink-0 items-center" aria-label={company.name}>
              <Image
                src="/logo/logo.svg"
                alt={company.name}
                width={200}
                height={44}
                priority
                className={cn("w-auto transition-all", scrolled ? "h-8" : "h-9 sm:h-10")}
              />
            </Link>

            <nav className="hidden flex-1 justify-center lg:flex" aria-label="Primary">
              <ul className="flex items-center gap-0.5">
                {navigationLinks.map((link) => (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className="inline-flex items-center px-3 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                    {link.children && activeDropdown === link.label && (
                      <div className="absolute left-0 top-full z-50 min-w-[220px] border border-border bg-card py-3 shadow-[0_12px_40px_rgba(28,27,25,0.08)]">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setSearchOpen(true)} aria-label="Search">
                <Search className="h-[18px] w-[18px]" />
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-10 w-10">
                <Link href="/profile" aria-label="Account">
                  <User className="h-[18px] w-[18px]" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="relative h-10 w-10">
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart className="h-[18px] w-[18px]" />
                  {wishlist.length > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative h-10 w-10" onClick={openCart} aria-label="Cart">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            className="absolute inset-0 bg-primary/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,22rem)] flex-col bg-ivory shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-serif text-2xl">Menu</p>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
              <ul className="space-y-1">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-2.5 font-serif text-2xl text-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <ul className="mb-4 ml-1 space-y-1 border-l border-border pl-4">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
                <Link href="/profile" className="block py-2" onClick={() => setMobileOpen(false)}>
                  Account
                </Link>
                <Link href="/wishlist" className="block py-2" onClick={() => setMobileOpen(false)}>
                  Wishlist
                </Link>
                <Link href="/contact" className="block py-2" onClick={() => setMobileOpen(false)}>
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </div>
  );
}
