import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import { MapPin, Phone, Clock, Mail, PhoneCall, HelpCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";
import { Phone as PhoneIcon } from "lucide-react";

const heroContact = "/pic7.webp";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "8, Dr Chimezie street, Chevy view estate, Chevron Drive Off Lekki" },
  { icon: Phone, label: "Phone", value: "+2347082272277" },
  { icon: Clock, label: "Opening Hours", value: "Monday to Friday: 9am to 6pm\nSaturday: Closed\nSunday: Closed" },
  { icon: Mail, label: "Email", value: "chioma.ugwoke@helpdeskpharmacy.com" },
];

export default function Contact() {
  return (
    <>
      <PageHero
        image={heroContact}
        badge="Reach Out"
        title="Get in Touch"
        subtitle="Whether you have a question, need assistance, or want to learn more about our services, we're here to help. Reach out to us through any of the following methods."
      />

      {/* Contact Details + Form */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-5">
              <ScrollReveal>
                <div className="mb-8">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Contact Info</span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mt-2">
                    We'd Love to <span className="gradient-text">Hear From You</span>
                  </h2>
                </div>
              </ScrollReveal>

              {contactInfo.map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 0.1} direction="left">
                  <ClientMotionDiv
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-sm mb-1">{item.label}</h3>
                      <p className="text-muted-foreground text-sm whitespace-pre-line">{item.value}</p>
                    </div>
                  </ClientMotionDiv>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.5} direction="left">
                <ClientMotionDiv
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl gradient-hero-bg text-center"
                >
                  <PhoneCall className="w-8 h-8 text-primary-foreground mx-auto mb-3" />
                  <h3 className="text-primary-foreground font-heading font-bold text-lg mb-2">Speak with a Pharmacist</h3>
                  <p className="text-primary-foreground/70 text-sm mb-3">Our team is ready to assist with your health needs</p>
                  <a
                    href="tel:+2347082272277"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    Call Now
                  </a>
                </ClientMotionDiv>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <ScrollReveal direction="right">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map & FAQ Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map Column */}
            <ScrollReveal direction="left">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-border h-[500px]">
                <iframe
                  title="Helpdesk Pharmacy Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7311!2d3.5111!3d6.4399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53aec4dd92d%3A0x5e34fe6b4a4a4c99!2sChevy%20View%20Estate%2C%20Lekki%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </ScrollReveal>

            {/* Content Column */}
            <div className="space-y-8">
              <ScrollReveal direction="right">
                <div>
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Commitment</span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-6">
                    Professional <span className="gradient-text">Care</span> & Support
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    At Helpdesk Pharmacy, we are dedicated to providing you with more than just medications. We offer a comprehensive health experience focused on your well-being.
                  </p>
                </div>
              </ScrollReveal>

              <div className="space-y-4">
                {[
                  {
                    q: "Expert Consultations",
                    a: "Our licensed pharmacists are always available to provide professional advice, medication reviews, and personalized health guidance."
                  },
                  {
                    q: "Quality Assurance",
                    a: "We guarantee the authenticity of every product we dispense, sourcing only from certified manufacturers and trusted global distributors."
                  },
                  {
                    q: "Patient-First Approach",
                    a: "Your health journey is unique. We pride ourselves on offering tailored pharmaceutical care that respects your individual needs and preferences."
                  }
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1} direction="right">
                    <div className="p-5 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors shadow-sm">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <HelpCircle className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-sm mb-2">{item.q}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
