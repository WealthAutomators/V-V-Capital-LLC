import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";
import { footerLinks, paymentMethods } from "@/data/navigation";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-primary text-primary-foreground">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Image src="/logo/logo.svg" alt={company.name} width={200} height={44} className="mb-5 h-10 w-auto brightness-0 invert" />
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">{company.description}</p>
            <address className="mt-6 text-sm not-italic leading-relaxed text-primary-foreground/70">
              {company.name}
              <br />
              {company.address.street}
              <br />
              {company.address.city}, {company.address.state} {company.address.zip}
              <br />
              <a href={`mailto:${company.email}`} className="mt-2 inline-block transition-colors hover:text-primary-foreground">
                {company.email}
              </a>
            </address>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em]">Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em]">Collections</h3>
            <ul className="space-y-2.5">
              {footerLinks.collections.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em]">Customer</h3>
            <ul className="space-y-2.5">
              {footerLinks.customerCare.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-8 text-[11px] font-medium uppercase tracking-[0.2em]">Account</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/profile" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em]">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-8 text-[11px] font-medium uppercase tracking-[0.2em]">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-4 text-sm text-primary-foreground/70">
              <a href={company.social.instagram} aria-label="Instagram" className="hover:text-primary-foreground">
                Instagram
              </a>
              <a href={company.social.pinterest} aria-label="Pinterest" className="hover:text-primary-foreground">
                Pinterest
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Separator className="bg-primary-foreground/10" />

      <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <p className="text-xs text-primary-foreground/55">{company.copyright}</p>
        <div className="flex items-center gap-2">
          {paymentMethods.map((method) => (
            <Image
              key={method.name}
              src={method.icon}
              alt={method.name}
              width={40}
              height={28}
              className="opacity-80 brightness-0 invert"
            />
          ))}
        </div>
      </Container>
    </footer>
  );
}
