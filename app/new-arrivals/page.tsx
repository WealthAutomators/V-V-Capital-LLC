import { getNewArrivals } from "@/data/products";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";

export const metadata = {
  title: "New Arrivals",
};

export default function NewArrivalsPage() {
  const products = getNewArrivals();

  return (
    <Container className="py-8 md:py-12">
      <h1 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">New Arrivals</h1>
      <p className="mt-2 text-muted-foreground">Recently added to the house.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
