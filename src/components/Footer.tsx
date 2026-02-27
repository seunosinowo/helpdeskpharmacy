"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const logo = "/logo.png";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Image src={logo} alt="Helpdesk Pharmacy" width={140} height={40} className="h-10 w-auto mb-4 brightness-200" />
            <p className="text-primary-foreground/60 text-sm max-w-xs">
              Your trusted partner in healthcare and wellness, dedicated to providing high-quality pharmaceutical products.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm tracking-wider uppercase text-primary-foreground/80">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm tracking-wider uppercase text-primary-foreground/80">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/60">
              <span>8, Dr Chimezie street, Chevy view estate</span>
              <span>Chevron Drive Off Lekki</span>
              <span>+2347082272277</span>
              <span>chioma.ugwoke@helpdeskpharmacy.com</span>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/40">
          © {year || "2024"}, Helpdesk Pharmacy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
