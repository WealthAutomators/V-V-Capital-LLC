"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroSlides } from "@/data/homepage";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const slide = heroSlides[0];

  return (
    <section className="relative min-h-[calc(100svh-9.5rem)] w-full overflow-hidden bg-stone">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={slide.image}
          alt={slide.headline}
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-primary/10" />
      <div className="relative mx-auto flex min-h-[calc(100svh-9.5rem)] max-w-[1440px] flex-col justify-end px-4 pb-10 sm:px-6 md:pb-12 lg:px-8">
        <motion.div
          className="max-w-2xl text-primary-foreground"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary-foreground/75">
            V&amp;V Capital LLC
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            {slide.headline}
          </h1>
          <p className="mt-5 max-w-md text-base text-primary-foreground/85 sm:text-lg">{slide.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-ivory text-primary hover:bg-cream">
              <Link href={slide.ctaLink}>{slide.ctaText}</Link>
            </Button>
            {slide.secondaryCtaText && slide.secondaryCtaLink && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
