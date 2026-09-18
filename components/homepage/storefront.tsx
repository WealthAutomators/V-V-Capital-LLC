"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  brandIntro,
  brandPhilosophy,
  curatedCollections,
  homepageEditorial,
  homepageEdit,
  homepageEverydayAway,
  homepageFeaturedSlugs,
  homepageHomeEntertaining,
  homepageNewArrivalSlugs,
  homepageBestsellerSlugs,
  newsletter,
  promotionalStrip,
  secondaryCampaign,
} from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { Carousel } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function BrandIntro() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <Container>
        <motion.div className="mx-auto max-w-3xl text-center" {...fade}>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {brandIntro.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight md:text-5xl">{brandIntro.title}</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{brandIntro.body}</p>
        </motion.div>
      </Container>
    </section>
  );
}

export function CuratedCollections() {
  return (
    <section className="bg-cream/60 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title="An edit of rooms and rituals."
          subtitle="Six ways into the house — photographed as they are lived, not labeled."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {curatedCollections.map((collection, index) => (
            <motion.div key={collection.slug} {...fade} transition={{ ...fade.transition, delay: index * 0.05 }}>
              <Link href={collection.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                    <p className="font-serif text-3xl">{collection.name}</p>
                    <p className="mt-1 max-w-xs text-sm text-primary-foreground/80">{collection.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FeaturedCollection() {
  const products = getProductsBySlugs(homepageFeaturedSlugs);
  const [first, second, ...rest] = products;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="In the House"
          title="A curated group, not a catalog."
          subtitle="Different scales, the same standard — objects that hold a room without filling it."
          viewMoreLink="/shop"
        />
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          {first && (
            <div className="md:col-span-7">
              <ProductCard product={first} size="large" />
            </div>
          )}
          {second && (
            <div className="md:col-span-5 md:pt-16">
              <ProductCard product={second} />
            </div>
          )}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {rest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function EditorialStory() {
  const products = getProductsBySlugs(homepageEditorial.productSlugs);

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div className="relative aspect-[4/5] overflow-hidden bg-stone lg:col-span-7" {...fade}>
            <Image
              src={homepageEditorial.image}
              alt={homepageEditorial.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </motion.div>
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              {homepageEditorial.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">{homepageEditorial.title}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{homepageEditorial.body}</p>
            <Button asChild className="mt-8" size="lg">
              <Link href={homepageEditorial.ctaLink}>{homepageEditorial.ctaText}</Link>
            </Button>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function NewArrivals() {
  const products = getProductsBySlugs(homepageNewArrivalSlugs);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Just In"
          title="New arrivals"
          subtitle="A short list of pieces newly added to the house."
          viewMoreLink="/new-arrivals"
        />
        <Carousel slidesToShow={4} className="px-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export function TheVVEdit() {
  const products = getProductsBySlugs(homepageEdit.productSlugs);

  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary-foreground/60">
            {homepageEdit.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">{homepageEdit.title}</h2>
          <p className="mt-5 text-primary-foreground/75 leading-relaxed">{homepageEdit.body}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homepageEdit.principles.map((item) => (
            <div key={item.label} className="border-t border-primary-foreground/20 pt-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground/55">{item.label}</p>
              <p className="mt-2 font-serif text-2xl">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <div key={product.id} className="bg-ivory p-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeEntertaining() {
  const products = getProductsBySlugs(homepageHomeEntertaining.productSlugs);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionHeading
              className="mb-0"
              eyebrow={homepageHomeEntertaining.eyebrow}
              title={homepageHomeEntertaining.title}
              subtitle={homepageHomeEntertaining.body}
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {homepageHomeEntertaining.rooms.map((room) => (
                <Link
                  key={room.label}
                  href={room.href}
                  className="border border-border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {room.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-stone">
            <Image
              src={homepageHomeEntertaining.image}
              alt="Home and entertaining"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href={homepageHomeEntertaining.ctaLink}>{homepageHomeEntertaining.ctaText}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function EverydayAway() {
  const products = getProductsBySlugs(homepageEverydayAway.productSlugs);

  return (
    <section className="bg-cream/50 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={homepageEverydayAway.eyebrow}
          title={homepageEverydayAway.title}
          subtitle={homepageEverydayAway.body}
          viewMoreLink="/categories/travel"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product, i) => (
            <div key={product.id} className={cn(i === 0 && "md:col-span-2 md:row-span-2")}>
              <ProductCard product={product} size={i === 0 ? "large" : "default"} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function BestSellers() {
  const products = getProductsBySlugs(homepageBestsellerSlugs);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow="Often Chosen" title="Best sellers" viewMoreLink="/best-sellers" />
        <Carousel slidesToShow={4} className="px-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export function SecondaryCampaign() {
  const products = getProductsBySlugs(secondaryCampaign.productSlugs);

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[560px] md:min-h-[640px]">
        <Image
          src={secondaryCampaign.image}
          alt={secondaryCampaign.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/45" />
        <Container className="relative flex min-h-[560px] flex-col justify-center py-16 md:min-h-[640px] md:py-24">
          <div className="max-w-xl text-primary-foreground">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary-foreground/70">
              {secondaryCampaign.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-5xl md:text-6xl">{secondaryCampaign.title}</h2>
            <p className="mt-5 text-lg text-primary-foreground/85">{secondaryCampaign.body}</p>
            <Button asChild size="lg" className="mt-8 bg-ivory text-primary hover:bg-cream">
              <Link href={secondaryCampaign.ctaLink}>{secondaryCampaign.ctaText}</Link>
            </Button>
          </div>
          <div className="mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="border border-primary-foreground/20 bg-ivory/95 p-3 backdrop-blur-sm">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

export function PromoStrip() {
  return (
    <section className="border-y border-border bg-muted/40 py-12 md:py-16">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl">{promotionalStrip.title}</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">{promotionalStrip.description}</p>
        </div>
        <Button asChild size="lg">
          <Link href={promotionalStrip.buttonLink}>{promotionalStrip.buttonText}</Link>
        </Button>
      </Container>
    </section>
  );
}

export function BrandPhilosophy() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
            <Image
              src="/editorial/philosophy.jpg"
              alt="V&V Capital LLC philosophy"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              {brandPhilosophy.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">{brandPhilosophy.title}</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{brandPhilosophy.body}</p>
            <ul className="mt-8 space-y-3">
              {brandPhilosophy.points.map((point) => (
                <li key={point} className="border-l-2 border-olive pl-4 text-sm">
                  {point}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-10">
              <Link href="/about">Our story</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">Correspondence</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">{newsletter.title}</h2>
          <p className="mt-4 text-muted-foreground">{newsletter.description}</p>
          {submitted ? (
            <p className="mt-8 text-sm font-medium text-accent">Thank you. We’ll write when there’s something worth saying.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder={newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-[2px] border-border bg-card"
              />
              <Button type="submit" size="lg">
                {newsletter.buttonText}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
