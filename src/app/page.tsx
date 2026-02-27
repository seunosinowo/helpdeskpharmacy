import ScrollReveal from "@/components/ScrollReveal";
import StaggerText from "@/components/StaggerText";
import ServiceCard from "@/components/ServiceCard";
import Marquee from "@/components/Marquee";
import ParallaxImage from "@/components/ParallaxImage";
import AnimatedCounter from "@/components/AnimatedCounter";
import Link from "next/link";
import { Pill, MessageCircle, Truck, HeartPulse, Headphones, ArrowRight, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

const heroImage = "/hero-pharmacy.jpg";
const aboutTeam = "/about-team.jpg";
const wellnessProducts = "/wellness-products.jpg";

const services = [
  { icon: Pill, title: "Quality Medications", description: "We provide a wide range of high-quality prescription and over-the-counter medications to meet your health needs. Our inventory includes both brand-name and generic options to suit every budget." },
  { icon: Truck, title: "Convenient Service", description: "Enjoy fast and reliable delivery services, ensuring you receive your medications promptly and safely. We offer same-day delivery within Lagos and next-day delivery nationwide." },
  { icon: MessageCircle, title: "Expert Advice", description: "Our knowledgeable pharmacists are available to offer personalized advice and answer any questions you may have about your medications, dosages, and potential interactions." },
  { icon: Headphones, title: "Customer Support", description: "Our dedicated support team is here to assist you with any inquiries or concerns, ensuring a smooth and satisfactory experience from order to delivery." },
  { icon: HeartPulse, title: "Health Solutions", description: "We offer various health and wellness products to support your overall well-being, including vitamins, supplements, personal care products, and health monitoring devices." },
];

const whyChooseUs = [
  { icon: Clock, text: "24/7 Emergency Support - Always available for your urgent needs" },
  { icon: ShieldCheck, text: "Licensed Professionals - Expert care from certified pharmacists" },
  { icon: Truck, text: "Swift Same-Day Delivery - Get your meds when you need them" },
  { icon: CheckCircle2, text: "100% Genuine Products - Quality assured from trusted suppliers" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-start overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <ClientMotionDiv
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={heroImage}
              alt="Pharmaceutical Excellence"
              fill
              className="object-cover"
              priority
            />
          </ClientMotionDiv>
          {/* Enhanced Gradient Overlays for better readability and aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10 dark:from-primary/95 dark:via-primary/80 dark:to-transparent" />
          <div className="absolute inset-0 grid-pattern opacity-10 z-10" />
        </div>

        <div className="container relative z-20 mx-auto px-4 md:px-8 pt-12 pb-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="max-w-4xl">
              <ClientMotionDiv
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </span>
                <span className="text-foreground dark:text-primary-foreground text-xs md:text-sm font-semibold tracking-wide uppercase">
                  Available 24/7 For Your Health
                </span>
              </ClientMotionDiv>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#3B2667] dark:text-primary-foreground leading-[1.2] mb-4 tracking-tight max-w-3xl">
                <StaggerText text="Excellence in Healthcare and Pharmaceutical Services" delay={0.2} />
              </h1>

              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-foreground/80 dark:text-primary-foreground/80 text-base md:text-lg max-w-2xl mb-6 leading-relaxed font-medium"
              >
                we are committed to delivering premium pharmaceutical products and healthcare solutions. Our expertise in importation, production, and supply ensures that you receive the best care, every time.
              </ClientMotionDiv>

              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="flex flex-wrap gap-5"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-[#E93399] text-white font-bold text-lg shadow-xl shadow-[#E93399]/20 hover:shadow-[#E93399]/40 transition-all active:scale-95"
                >
                  Contact Us
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ClientMotionDiv>
            </div>
          </div>
        </div>

        {/* Floating decorative elements for a more dynamic feel */}
        <ClientMotionDiv
          className="absolute bottom-20 right-10 md:right-20 z-10 w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-accent/20 opacity-30 blur-sm"
          animate={{ y: [-20, 20, -20], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <ClientMotionDiv
          className="absolute top-32 right-1/4 z-10 w-12 h-12 rounded-full bg-accent/10 opacity-20 blur-md"
          animate={{ scale: [1, 1.2, 1], x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </section>

      <Marquee />

      {/* What We Do */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">Our Services</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 leading-tight">
                Comprehensive <span className="gradient-text">Healthcare</span> Solutions <br /> Tailored for You
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We combine modern technology with traditional care to provide you with the best pharmaceutical experience possible.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview with Image */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">About Helpdesk</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-8 leading-tight">
                  Your Most Trusted <br /> <span className="gradient-text">Healthcare</span> Partner
                </h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-10">
                  <p>
                    Welcome to Helpdesk Pharmacy, your trusted partner in healthcare and wellness. We are dedicated to providing high-quality pharmaceutical products and exceptional customer services.
                  </p>
                  <p>
                    Our team of experienced professionals is committed to ensuring you receive the best care and support for all your healthcare needs. With a wide range of medications and health solutions, we strive to make your experience convenient and reliable.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <ParallaxImage
                  src={aboutTeam}
                  alt="Our pharmacy team"
                  className="aspect-[4/3] rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-800"
                />
                
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedCounter value="24/7" label="Service Hours" delay={0} />
            <AnimatedCounter value="10K+" label="Happy Customers" delay={0.1} />
            <AnimatedCounter value="500+" label="Medications" delay={0.2} />
            <AnimatedCounter value="100%" label="Quality Assured" delay={0.3} />
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -translate-y-1/2" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <div className="relative">
                <ParallaxImage
                  src={wellnessProducts}
                  alt="Health and wellness products"
                  className="aspect-[4/3] rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-800"
                />
                <div className="absolute -top-8 -right-8 glass p-6 rounded-3xl shadow-xl hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-bold">
                      <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-none">Quality</p>
                      <p className="text-xs text-muted-foreground">Assured</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">Why Choose Us</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-8 leading-tight">
                  We Put Your <span className="gradient-text">Health First</span> <br /> In Everything We Do
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  At Helpdesk Pharmacy, your well-being is our top priority. We combine expertise, quality products, and dedicated service to deliver an unparalleled healthcare experience.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whyChooseUs.map((item, i) => (
                    <ClientMotionDiv
                      key={item.text}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-primary/10">
                        <item.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="text-sm font-bold text-foreground leading-tight">{item.text}</span>
                    </ClientMotionDiv>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Services Summary */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">Our Service</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 leading-tight">
                Dedicated to Delivering <br /> <span className="gradient-text">Top-Tier</span> Healthcare
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Experience the perfect blend of professional expertise and personalized care. We're committed to your well-being with every prescription we fill.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1}>
                <div className="group text-center p-8 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-[3]" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary/20">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">{service.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="relative rounded-[3rem] bg-slate-950 p-12 md:p-24 text-center overflow-hidden shadow-3xl">
              {/* Background Decorations */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -ml-64 -mb-64" />
                <div className="absolute inset-0 grid-pattern opacity-10" />
              </div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">
                  Ready to Experience <br /> <span className="gradient-text">Better Healthcare?</span>
                </h2>
                <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
                  Join thousands of satisfied customers who trust Helpdesk Pharmacy for their healthcare needs. We're here for you, 24/7.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-3 px-10 py-5 rounded-full gradient-bg text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
                  >
                    Explore Services
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-full glass text-white font-bold text-lg hover:bg-white/10 transition-all border-white/20 hover:-translate-y-1"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
