import { Category } from "@/types";
import { products } from "./products";

function count(slug: string) {
  return products.filter((p) => p.categorySlug === slug).length;
}

export const categories: Category[] = [
  {
    id: "1",
    slug: "home",
    name: "Home",
    image: "/collections/at-home.jpg",
    description: "Furniture, lighting, textiles, and objects for rooms that are actually lived in.",
    productCount: count("home"),
  },
  {
    id: "2",
    slug: "kitchen-dining",
    name: "Kitchen & Dining",
    image: "/collections/gather-kitchen.jpg",
    description: "Cookware, tableware, and the tools of a considered meal.",
    productCount: count("kitchen-dining"),
  },
  {
    id: "3",
    slug: "workspace",
    name: "Workspace",
    image: "/collections/workspace-desk.jpg",
    description: "Desk objects, stationery, and light for a quieter working day.",
    productCount: count("workspace"),
  },
  {
    id: "4",
    slug: "travel",
    name: "Travel",
    image: "/collections/away-flatlay.jpg",
    description: "Bags, carry pieces, and the few things worth packing.",
    productCount: count("travel"),
  },
  {
    id: "5",
    slug: "apparel",
    name: "Apparel",
    image: "/collections/apparel.jpg",
    description: "Knits, shirts, and layers cut for everyday wear.",
    productCount: count("apparel"),
  },
  {
    id: "6",
    slug: "personal",
    name: "Personal",
    image: "/collections/personal-bath.jpg",
    description: "Wallets, watches, grooming, and small goods that earn a pocket.",
    productCount: count("personal"),
  },
  {
    id: "7",
    slug: "wellness",
    name: "Wellness",
    image: "/collections/wellness.jpg",
    description: "Mats, recovery, and the quiet tools of a daily practice.",
    productCount: count("wellness"),
  },
  {
    id: "8",
    slug: "outdoor",
    name: "Outdoor Living",
    image: "/collections/outdoor.jpg",
    description: "Garden, terrace, and the milder hours spent outside.",
    productCount: count("outdoor"),
  },
  {
    id: "9",
    slug: "everyday",
    name: "Everyday",
    image: "/collections/everyday-kitchen.jpg",
    description: "Organization and utility for the rhythms of a house.",
    productCount: count("everyday"),
  },
  {
    id: "10",
    slug: "gifts",
    name: "Gifts",
    image: "/collections/gifts-kraft.jpg",
    description: "Objects chosen because they last longer than the wrapping.",
    productCount: count("gifts"),
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
