
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import DoctorForm from "@/components/DoctorForm";
import { Stethoscope, FileText, MessageSquare } from "lucide-react";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

const heroImage = "/hero-services.jpg";

export default function DoctorPage() {
  return (
    <>
      <PageHero
        image={heroImage}
        badge="Medical Consultation"
        title="Speak to Our Doctor"
        subtitle="Professional medical advice and consultation at your convenience."
      />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            
            <div className="space-y-8">
              <ScrollReveal>
                <div>
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Consultation</span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">
                    Discuss with us about <span className="gradient-text">your form</span>
                  </h2>
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    Need help understanding your medical forms or prescriptions? Our qualified doctors are here to assist you. 
                    Whether it's a general inquiry or a specific medical question, we provide confidential and professional guidance.
                  </p>
                </div>
              </ScrollReveal>

              <div className="space-y-6">
                {[
                  {
                    icon: MessageSquare,
                    title: "Expert Advice",
                    desc: "Get answers to your health questions from certified professionals."
                  },
                  {
                    icon: FileText,
                    title: "Form Assistance",
                    desc: "We help you understand and complete your medical documentation."
                  },
                  {
                    icon: Stethoscope,
                    title: "Health Consultation",
                    desc: "Discuss symptoms and get recommendations for your well-being."
                  }
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1} direction="left">
                    <ClientMotionDiv
                      whileHover={{ x: 6 }}
                      className="flex gap-4 p-5 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </ClientMotionDiv>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal direction="right">
              <DoctorForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
