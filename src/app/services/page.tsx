import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import { Pill, MessageCircle, Truck, HeartPulse, Headphones, ArrowRight } from "lucide-react";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

const heroServices = "/hero-services.jpg";

const services = [
  { icon: Pill, title: "Quality Medications", description: "We provide a wide range of high-quality prescription and over-the-counter medications to meet your health needs. Our inventory includes both brand-name and generic options to suit every budget." },
  { icon: Truck, title: "Convenient Service", description: "Enjoy fast and reliable delivery services, ensuring you receive your medications promptly and safely. We offer same-day delivery within Lagos and next-day delivery nationwide." },
  { icon: MessageCircle, title: "Expert Advice", description: "Our knowledgeable pharmacists are available to offer personalized advice and answer any questions you may have about your medications, dosages, and potential interactions." },
  { icon: Headphones, title: "Customer Support", description: "Our dedicated support team is here to assist you with any inquiries or concerns, ensuring a smooth and satisfactory experience from order to delivery." },
  { icon: HeartPulse, title: "Health Solutions", description: "We offer various health and wellness products to support your overall well-being, including vitamins, supplements, personal care products, and health monitoring devices." },
];

export default function Services() {
  return (
    <>
      <PageHero
        image={heroServices}
        badge="Our Offerings"
        title="Services"
        subtitle="We are dedicated to delivering top-tier pharmaceutical and healthcare solutions tailored to meet the diverse needs of our clients."
      />

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">What We Offer</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
                Comprehensive <span className="gradient-text">Pharmacy</span> Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                From prescription fulfillment to wellness consultations, we provide a full spectrum of pharmaceutical services designed around your needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 gradient-subtle-bg">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Simple Process</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
                How It <span className="gradient-text">Works</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Place Your Order", desc: "Reach out via phone, email, or visit us to place your order for medications or health products." },
              { step: "02", title: "Expert Processing", desc: "Our licensed pharmacists review and process your order, ensuring accuracy and safety." },
              { step: "03", title: "Fast Delivery", desc: "Receive your medications promptly through our reliable delivery service or pick them up in store." },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.15}>
                <div className="text-center relative">
                  <ClientMotionDiv
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-5"
                  >
                    <span className="text-primary-foreground font-heading font-bold text-xl">{item.step}</span>
                  </ClientMotionDiv>
                  <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="relative rounded-3xl gradient-hero-bg p-10 md:p-16 text-center overflow-hidden">
              <ClientMotionDiv
                className="absolute top-8 left-12 w-28 h-28 rounded-full border border-primary-foreground/10"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              />
              <ClientMotionDiv
                className="absolute bottom-8 right-16 w-16 h-16 rounded-full bg-accent/10"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
                  Need Help With Your Health?
                </h2>
                <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8 text-lg">
                  Our team of experts is ready to assist you. Get in touch today and let us help you find the right solutions.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-all hover:gap-3"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
