import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Collections",
  description: "Browse V&V Capital LLC collections for home, kitchen, travel, and everyday life.",
};

export default function CategoriesPage() {
  return (
    <Container className="py-12 md:py-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">The house, by room</p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight md:text-5xl">Collections</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        A concise map of the store — home, table, desk, travel, and the smaller goods that keep a week in order.
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                <h2 className="font-serif text-3xl">{category.name}</h2>
                <p className="mt-1 text-sm text-primary-foreground/80">{category.description}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-primary-foreground/60">
                  {category.productCount} pieces
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
