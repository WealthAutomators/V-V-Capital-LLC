import { company } from "@/data/company";
import { testimonials } from "@/data/testimonials";
import { PageHero, PageSection } from "@/components/ui/page-layout";
import { Container } from "@/components/ui/container";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${company.name}`}
        description={company.description}
        breadcrumbs={[{ label: "About Us" }]}
      />

      <Container className="pb-20">
        <div className="grid items-center gap-12 py-12 md:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
            <Image src="/editorial/philosophy.jpg" alt={`About ${company.name}`} fill className="object-cover" sizes="50vw" />
          </div>
          <PageSection title="Our Story">
            <p>
              V&amp;V Capital LLC began as a private edit — objects chosen for a house in
              Southampton, Pennsylvania, and for the people who live the way we do: with
              attention, and without excess.
            </p>
            <p className="mt-4">
              We are not a marketplace of everything. We select goods for home, work, travel,
              and everyday life when they meet a simple standard: useful, well made, and quiet
              enough to keep. The name Capital is a measure of confidence, not a financial
              product.
            </p>
            <p className="mt-4">
              From {company.address.street}, {company.address.city}, we ship a concise
              assortment nationwide. The rooms we have in mind are contemporary American —
              the sort of houses found along the Main Line and in Bucks County — without the
              costume of either.
            </p>
          </PageSection>
        </div>

        <div className="grid gap-8 border-t border-border py-16 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Design", desc: "Form that does not shout. Line, material, and proportion first." },
            { title: "Utility", desc: "Made to be used daily, not reserved for a photograph." },
            { title: "Quality", desc: "Materials that last, and often improve, with ordinary wear." },
            { title: "Relevance", desc: "Objects for modern routines — home, desk, travel, the rest of the week." },
          ].map(({ title, desc }) => (
            <div key={title} className="border-t-2 border-olive pt-5">
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <PageSection title="From the house" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.id} className="border border-border bg-card p-6">
                <StarRating rating={t.rating} showCount={false} size="md" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/shop">Shop the edit</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
