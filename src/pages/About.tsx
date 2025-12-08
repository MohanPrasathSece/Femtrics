import { motion } from "framer-motion";
import { Target, TrendingUp, BarChart3, Users, Heart, Lightbulb, Award, Calendar, Building, GraduationCap, Handshake } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CounterAnimation } from "@/components/CounterAnimation";
import { useTranslation } from "@/contexts/TranslationContext";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import femtricsLogo from "/logo.png";

const teamStructure = [
  { role: "Founder & Chief Marketing + Analytics Strategist", count: "You" },
  { role: "Data Associates", count: "12" },
  { role: "Designers", count: "3" },
  { role: "Outreach Lead", count: "1" },
  { role: "Operations Lead", count: "1" },
];

const volunteerBenefits = [
  "Comprehensive Bootcamp Training",
  "Standard Operating Procedures (SOPs)",
  "Real Client Experience",
];

const partnerships = [
  { icon: Users, title: "Women's Self-Help Groups", desc: "Connecting with grassroots women's networks" },
  { icon: Heart, title: "NGOs", desc: "Partnering with organizations in underserved areas" },
  { icon: GraduationCap, title: "College/School Clubs", desc: "Engaging young volunteers and students" },
  { icon: Building, title: "Micro-finance Institutions", desc: "Reaching women entrepreneurs through financial networks" },
];

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 hero-bg">
        <div className="container-tight">
          <AnimatedSection className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-base font-medium mb-6">
              About Femtrics
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6 flex items-center gap-4">
              <img 
                src={femtricsLogo} 
                alt="Femtrics Logo" 
                className="w-16 h-16 md:w-20 md:h-20"
              />
              <span>
                A Business-Analytics Social Enterprise for{" "}
                <span className="text-gradient italic">Women</span>
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Femtrics is a social enterprise that provides affordable, simple, and actionable 
              business analytics to women micro-entrepreneurs so they can grow revenue, reduce waste, 
              and make data-driven decisions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
                Our Story
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Born from a simple belief
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We started Femtrics because we saw a gap—women micro-entrepreneurs in Hyderabad 
                  making critical business decisions based on intuition rather than data.
                </p>
                <p>
                  These women typically don't track expenses properly, don't know which product sells best, 
                  guess inventory, underprice themselves, and don't understand how Instagram engagement leads to sales.
                </p>
                <p>
                  We believe that data-driven decision making shouldn't be a privilege reserved 
                  for large corporations. Every woman entrepreneur deserves access to insights 
                  that can transform her business.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <img 
                src={hero2}
                alt="Women entrepreneurs learning data analytics"
                className="rounded-3xl shadow-2xl border border-pink-200"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values - Detailed */}
      <section id="mission" className="section-padding bg-pink-soft">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <div className="mb-8">
              <img 
                src={hero3} 
                alt="Femtrics team and mission" 
                className="w-full max-w-2xl mx-auto h-auto rounded-3xl shadow-2xl"
              />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Our Foundation
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            <AnimatedSection delay={0.1}>
              <div className="bg-card rounded-3xl p-8 md:p-12 card-elevated">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">Our Mission</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      To empower women micro-entrepreneurs in Hyderabad—boutique owners, tiffin services, 
                      beauty service providers, tutors, home cooks—through affordable business analytics, 
                      so they can make smarter decisions, increase income, and grow sustainably.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card rounded-3xl p-8 md:p-12 card-elevated">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">Our Vision</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A future where every woman entrepreneur has access to the data insights she needs 
                      to compete, grow, and thrive in the market. We envision a world where gender is 
                      no barrier to business success, and data literacy is universal.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-card rounded-3xl p-8 md:p-12 card-elevated">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">Our Values</h3>
                    <div className="grid sm:grid-cols-2 gap-6 mt-6">
                      {[
                        { title: "Accessibility", desc: "Making analytics available to everyone, regardless of technical background" },
                        { title: "Empowerment", desc: "Giving women the tools to take control of their business destiny" },
                        { title: "Simplicity", desc: "Complex insights delivered in simple, actionable formats" },
                        { title: "Impact", desc: "Measuring success by the real-world change we create" },
                      ].map((value) => (
                        <div key={value.title}>
                          <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                          <p className="text-muted-foreground text-base">{value.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Enterprise Structure */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
                Enterprise Structure
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Our Team
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                A dedicated team of volunteers committed to empowering women entrepreneurs through data.
              </p>
              <div className="space-y-4">
                {teamStructure.map((member, index) => (
                  <motion.div
                    key={member.role}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-card p-4 rounded-xl card-elevated"
                  >
                    <span>{member.role}</span>
                    <span className="font-display font-bold text-primary">{member.count}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-primary/10 via-secondary to-accent/5 rounded-3xl p-8 md:p-12">
                <h3 className="font-display text-2xl font-semibold mb-6">Every Volunteer Gets</h3>
                <div className="space-y-4">
                  {volunteerBenefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-center gap-4 bg-card/80 backdrop-blur-sm p-4 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Partnerships
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Who We Partner With
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships.map((partner, index) => (
              <AnimatedSection key={partner.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-card rounded-2xl p-6 card-elevated h-full text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <partner.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{partner.title}</h3>
                  <p className="text-muted-foreground text-base">{partner.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Our Roadmap
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-4">
              {t("common.journeyAhead")}
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            <div className="space-y-12">
              {[
                {
                  phase: "Phase 1",
                  title: "Build Foundation",
                  period: "Month 1-2",
                  description: "Recruit volunteers, create dashboards and templates, train team, partner with first NGO, onboard first 10 businesses",
                  align: "right",
                },
                {
                  phase: "Phase 2",
                  title: "Scale Operations",
                  period: "Month 3-6",
                  description: "Reach 50+ clients, release forecasting model v1, start school workshops, build more NGO partnerships, publish case studies",
                  align: "left",
                },
                {
                  phase: "Phase 3",
                  title: "Maximize Impact",
                  period: "Month 6-12",
                  description: "Serve 120+ businesses, deploy full analytics suite, secure sponsorships and funding, expand to Warangal and Vijayawada, launch ambassador program",
                  align: "right",
                },
              ].map((item, index) => (
                <AnimatedSection key={item.phase} delay={index * 0.2} direction={item.align === "left" ? "right" : "left"}>
                  <div className={`relative flex items-center ${item.align === "left" ? "md:flex-row-reverse" : ""}`}>
                    <motion.div 
                      className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-primary -translate-x-1/2 z-10 shadow-lg shadow-primary/50"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                    />
                    
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${item.align === "left" ? "md:pr-16" : "md:pl-16"}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="bg-card rounded-2xl p-8 card-elevated hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Calendar className="w-6 h-6 text-primary" />
                          <span className="text-primary text-base font-semibold">{item.period}</span>
                        </div>
                        <span className="text-base text-muted-foreground uppercase tracking-wider font-medium">{item.phase}</span>
                        <h3 className="font-display text-3xl font-semibold mt-2 mb-4">{item.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                      </motion.div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;