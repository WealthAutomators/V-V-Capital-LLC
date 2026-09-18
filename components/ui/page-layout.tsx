import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title?: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({ title, description, breadcrumbs }: PageHeroProps) {
  return (
    <div className="border-b border-border bg-muted/30">
      <Container className="py-6 md:py-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="flex items-center gap-1 transition-colors hover:text-primary">
                <Home className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Home</span>
              </Link>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                {item.href ? (
                  <Link href={item.href} className="transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {title && <h1 className="font-serif text-3xl font-medium tracking-tight md:text-5xl">{title}</h1>}
        {description && (
          <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">{description}</p>
        )}
      </Container>
    </div>
  );
}

interface PageSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageSection({ title, children, className }: PageSectionProps) {
  return (
    <section className={cn("py-8 md:py-10", className)}>
      {title && <h2 className="mb-4 text-xl font-semibold md:text-2xl">{title}</h2>}
      <div className="prose-store text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

interface PolicyListProps {
  items: string[];
}

export function PolicyList({ items }: PolicyListProps) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm md:text-base">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}
