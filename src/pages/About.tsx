import { motion } from "framer-motion";
import { useEffect } from "react";
import { Target, TrendingUp, BarChart3, Users, Heart, Lightbulb, Award, Calendar, Building, GraduationCap, Handshake } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CounterAnimation } from "@/components/CounterAnimation";
import SEO from "@/components/SEO";
import { useTranslation } from "@/contexts/TranslationContext";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import femtricsLogo from "/logo.png";

const partnerships = [
  { icon: Users, title: "Women's Self-Help Groups", desc: "Connecting with grassroots women's networks" },
  { icon: Heart, title: "NGOs", desc: "Partnering with organizations in underserved areas" },
  { icon: GraduationCap, title: "College/School Clubs", desc: "Engaging young volunteers and students" },
  { icon: Building, title: "Micro-finance Institutions", desc: "Reaching women entrepreneurs through financial networks" },
];

const About = () => {
  const { t } = useTranslation();

  // SEO metadata for About page
  useEffect(() => {
    document.title = "About Femtrics | Empowering Women Entrepreneurs with Data Analytics";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.content = "Learn about Femtrics - Our mission to empower women micro-entrepreneurs in Hyderabad with affordable data analytics solutions and business insights.";
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link') as HTMLLinkElement;
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://femtrics.com/about';

    // Update Open Graph tags
    updateMetaTag('og:title', 'About Femtrics | Empowering Women Entrepreneurs');
    updateMetaTag('og:description', 'Learn about Femtrics mission to empower women entrepreneurs with data analytics solutions.');
    updateMetaTag('og:url', 'https://femtrics.com/about');

    // Update Twitter tags
    updateMetaTag('twitter:title', 'About Femtrics | Empowering Women Entrepreneurs');
    updateMetaTag('twitter:description', 'Femtrics mission: Empowering women micro-entrepreneurs with data analytics in Hyderabad.');
  }, []);

  function updateMetaTag(property: string, content: string) {
    let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement ||
      document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement('meta') as HTMLMetaElement;
      tag.setAttribute(property.includes(':') ? 'property' : 'name', property);
      document.head.appendChild(tag);
    }
    tag.content = content;
  }
  return (
    <div className="min-h-screen bg-background overflow-x-hidden max-w-[100vw]">
      <SEO 
        title="About Femtrics - Empowering Women Entrepreneurs with Data Analytics in Hyderabad"
        description="Learn about Femtrics' mission to empower women micro-entrepreneurs in Hyderabad through affordable data analytics solutions. Our story, team, and commitment to women's economic empowerment."
        keywords="about Femtrics, women empowerment Hyderabad, data analytics mission, women entrepreneurs support, Femtrics story, social impact Hyderabad, women-led businesses, economic empowerment"
        canonical="/about"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://femtrics.com/#about-page",
            "name": "About Femtrics",
            "description": "Learn about Femtrics' mission to empower women micro-entrepreneurs through data analytics solutions.",
            "url": "https://femtrics.com/about",
            "mainEntity": {
              "@type": "Organization",
              "@id": "https://femtrics.com/#organization",
              "name": "Femtrics"
            }
          }
        ]}
      />
      <Header />
      

      {/* Hero */}
      <section className="pt-40 pb-24 relative overflow-hidden max-w-[100vw]">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 max-w-[100vw]" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container-tight relative max-w-[100vw] overflow-x-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-[100vw] overflow-x-hidden">
            <AnimatedSection direction="left" className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                About Femtrics
              </div>

              <div className="space-y-6">
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1]">
                  <span className="block">Femtrics: Business Analytics</span>
                  <span className="block text-gradient">For Women</span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-normal">By Women</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Empowering women micro-entrepreneurs with affordable, simple, and actionable business analytics to grow revenue, reduce waste, and make confident data-driven decisions.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Social Enterprise</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200">
                    <Heart className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Women-Focused</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Data-Driven</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative">
                {/* Main Image */}
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <img
                    src={hero2}
                    alt="Women entrepreneurs learning data analytics"
                    className="rounded-3xl shadow-2xl border border-pink-200 w-full"
                  />

                  {/* Floating Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-lg border border-pink-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">500+ Women</p>
                        <p className="text-xs text-muted-foreground">Empowered</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg border border-pink-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">40% Growth</p>
                        <p className="text-xs text-muted-foreground">Avg. Revenue</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Impact Banner */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/30">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-12">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              Our Impact
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Empowering Women Through Data
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're transforming the lives of women micro-entrepreneurs across Hyderabad with data-driven insights and practical business solutions.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "500+ Women",
                  description: "Empowered with business analytics",
                  color: "bg-primary/10 text-primary"
                },
                {
                  icon: TrendingUp,
                  title: "40% Growth",
                  description: "Average revenue increase",
                  color: "bg-green-100 text-green-700"
                },
                {
                  icon: Target,
                  title: "6+ Business Types",
                  description: "From boutiques to tiffin services",
                  color: "bg-blue-100 text-blue-700"
                },
                {
                  icon: Award,
                  title: "15+ Workshops",
                  description: "Training programs conducted",
                  color: "bg-purple-100 text-purple-700"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-border/50 text-center"
                >
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{stat.title}</h3>
                  <p className="text-muted-foreground text-sm">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
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

      {/* Founder Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/30">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-12">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              Meet Our Founder
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Founder & Chief Marketing + Analytics Strategist
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="relative">
                {/* Founder Image Container */}
                <div className="relative w-full max-w-md mx-auto">
                  <img
                    src="/founder.jpg"
                    alt="Harshini Kalakuntla - Founder of Femtrics"
                    className="w-full h-auto founder-image-circular shadow-2xl"
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-3xl font-semibold mb-4 text-foreground">
                    Harshini Kalakuntla
                  </h3>
                  <p className="text-primary text-lg font-medium mb-6">
                    Founder & Chief Marketing + Analytics Strategist
                  </p>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    As a high school student and the founder of Femtrics, I am deeply passionate about empowering women entrepreneurs through the power of data, insight, and strategic marketing. What began as curiosity and a love for understanding how businesses grow has evolved into a mission to help women feel confident, informed, and in control of their decisions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    My journey started with a simple but powerful realization: many talented women entrepreneurs have access to data, yet feel overwhelmed by it or unsure how to turn numbers into meaningful action. This gap between information and understanding inspired the creation of Femtrics — a platform built to make data approachable, human, and genuinely useful.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Through workshops, simplified analytics frameworks, and hands-on marketing guidance, Femtrics focuses on breaking down complex concepts into clear, actionable insights. At its heart, Femtrics is more than analytics — it is about confidence, clarity, and belief. I envision a future where every woman entrepreneur, regardless of background or experience, has the tools and knowledge to trust her decisions and grow sustainably. Together, we're not just learning how to read data — we're helping women see their potential, make empowered choices, and build businesses that reflect their passion and purpose.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                    <Lightbulb className="w-4 h-4" />
                    <span className="text-sm font-medium">Data Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-medium">Marketing Strategy</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">Women Empowerment</span>
                  </div>
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



      <Footer />
    </div>
  );
};

export default About;