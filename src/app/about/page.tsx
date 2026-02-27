import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import ParallaxImage from "@/components/ParallaxImage";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Shield, Users, Award, Lightbulb, Handshake, Heart, Star, Target, Eye } from "lucide-react";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

const heroAbout = "/hero-about.jpg";
const aboutTeam = "/about-team.jpg";

const values = [
  { icon: Shield, title: "Integrity", description: "We uphold the highest standards of honesty and ethics in all our actions." },
  { icon: Users, title: "Customer Focus", description: "Our customers are at the heart of everything we do. We are committed to providing exceptional service and care." },
  { icon: Award, title: "Quality", description: "We ensure that all our products and services meet the highest standards of quality and reliability." },
  { icon: Lightbulb, title: "Innovation", description: "We continuously seek out and implement innovative solutions to improve our services and enhance patient care." },
  { icon: Handshake, title: "Teamwork", description: "We believe in the power of collaboration and work together to achieve our common goals." },
  { icon: Heart, title: "Compassion", description: "We approach our work with empathy and a genuine concern for the well-being of our customers." },
  { icon: Star, title: "Excellence", description: "We strive for excellence in all we do, constantly improving and exceeding expectations." },
];

export default function About() {
  return (
    <>
      <PageHero
        image={heroAbout}
        badge="About Us"
        title="Company Overview"
        subtitle="Discover the story, mission, and values that drive Helpdesk Pharmacy to deliver exceptional healthcare services every day."
      />

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal direction="left">
              <ParallaxImage
                src={aboutTeam}
                alt="Our pharmacy team collaborating"
                className="aspect-[4/3] shadow-card"
              />
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-6">
                  Where Your <span className="gradient-text">Health</span> is Our Priority
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to Helpdesk Pharmacy, your trusted partner in healthcare and wellness. We are dedicated to providing high-quality pharmaceutical products and exceptional customer services.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our team of experienced professionals is committed to ensuring you receive the best care and support for all your healthcare needs. With a wide range of medications and health solutions, we strive to make your experience convenient and reliable.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Thank you for choosing Helpdesk Pharmacy – where your health is our priority. We continue to grow and innovate, always keeping your well-being at the center of everything we do.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 gradient-subtle-bg">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedCounter value="24/7" label="Service Hours" delay={0} />
            <AnimatedCounter value="10K+" label="Happy Customers" delay={0.1} />
            <AnimatedCounter value="500+" label="Medications" delay={0.2} />
            <AnimatedCounter value="100%" label="Quality Assured" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">What Guides Us</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
                Our Mission & <span className="gradient-text">Vision</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="group p-8 md:p-10 rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-500 h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Mission</span>
                <h3 className="text-2xl font-heading font-bold mt-2 mb-4">Delivering Reliable Solutions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We deliver reliable products and innovative services efficiently for therapeutic interventions and health promotion.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="group p-8 md:p-10 rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-500 h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">Our Vision</span>
                <h3 className="text-2xl font-heading font-bold mt-2 mb-4">Leading Pharmacy Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading pharmacy that empowers healthier lives through innovative solutions and exceptional service.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 gradient-subtle-bg">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">What Drives Us</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
                Our Core <span className="gradient-text">Values</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These values are the foundation of everything we do and how we serve our community.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <ClientMotionDiv
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-500 h-full"
                >
                  <div className="w-11 h-11 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <value.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-base font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </ClientMotionDiv>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
