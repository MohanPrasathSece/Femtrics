import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, TrendingUp, Target, Users, Smartphone, PieChart, LineChart, Zap, Shield, Sparkles, DollarSign, Package, TrendingDown, Smartphone as PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CounterAnimation } from "@/components/CounterAnimation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "@/contexts/TranslationContext";
import { MicroConversionModal, MicroConversionData } from "@/components/MicroConversionModal";
import analyticsBg from "@/assets/analytics-bg.png";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import femtricsLogo from "/logo.png";

const businessTypes = [
  "Home bakers",
  "Boutique/saree store owners",
  "Tiffin services",
  "Mehndi artists & beauticians",
  "Tutors & home academies",
  "Homemade crafts, candles, gift hampers",
  "Instagram-based businesses",
];

const painPoints = [
  { icon: BarChart3, text: "Do not track expenses properly" },
  { icon: Package, text: "Don't know which product sells best" },
  { icon: TrendingDown, text: "Guess inventory levels" },
  { icon: DollarSign, text: "Underprice themselves" },
  { icon: PhoneIcon, text: "Don't know how Instagram engagement leads to sales" },
];

const products = [
  {
    title: "MicroBiz Insight Dashboard",
    tag: "Product A",
    description: "A Google Data Studio dashboard showing your complete business health",
    features: [
      "Daily/weekly/monthly revenue",
      "Customer retention & repeat order rate",
      "Best-selling & slow-moving items",
      "Average order value",
      "Instagram engagement to sales correlation",
      "Peak buying times & Marketing ROI",
    ],
    tools: "Google Sheets, Data Studio, Python, Canva",
    icon: PieChart,
  },
  {
    title: "Demand Forecasting Model",
    tag: "Product B",
    description: "Predict your demand and plan inventory smartly",
    features: [
      "Moving averages analysis",
      "Trend decomposition",
      "3-month demand prediction",
    ],
    useCases: "Tiffin services, boutiques, home bakers",
    icon: LineChart,
  },
  {
    title: "Instagram Growth Analyzer",
    tag: "Product C",
    description: "Optimize your social media for maximum sales",
    features: [
      "Engagement rate tracking",
      "Post type analysis",
      "Influencer collab effectiveness",
      "Budget recommendations",
      "Pricing elasticity insights",
    ],
    icon: Smartphone,
  },
];

const Index = () => {
  const { t } = useTranslation();
  const [showMicroConversion, setShowMicroConversion] = useState(false);

  const handleMicroConversionSuccess = (data: MicroConversionData) => {
    console.log("Micro-conversion data:", data);
    // Here you would typically send to WhatsApp API or your backend
    // For now, the email service will handle the notification
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO 
        title="Data Analytics for Women Entrepreneurs in Hyderabad | Business Insights & Growth"
        description="Femtrics empowers women micro-entrepreneurs in Hyderabad with affordable data analytics solutions. Get actionable business insights, revenue tracking, inventory management, and marketing ROI analysis to grow your business."
        keywords="Femtrics, women entrepreneurs Hyderabad, data analytics for women, business insights Hyderabad, micro-entrepreneurs India, female business owners, data-driven decisions, small business analytics, revenue tracking, inventory management, marketing ROI, business dashboard, women-led businesses, Hyderabad startups, business growth analytics"
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://femtrics.com/#service-home",
            "name": "Data Analytics for Women Entrepreneurs",
            "description": "Comprehensive data analytics solutions designed specifically for women micro-entrepreneurs to make data-driven business decisions.",
            "provider": {
              "@type": "Organization",
              "@id": "https://femtrics.com/#organization",
              "name": "Femtrics"
            },
            "serviceType": "Business Analytics Consulting",
            "areaServed": "Hyderabad, Telangana, India"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://femtrics.com/#faq-home",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Femtrics?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Femtrics is a data analytics platform designed specifically for women micro-entrepreneurs in Hyderabad, providing affordable business insights and analytics solutions."
                }
              },
              {
                "@type": "Question",
                "name": "Who can benefit from Femtrics services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Women micro-entrepreneurs including home bakers, boutique owners, tiffin services, mehndi artists, tutors, and Instagram-based businesses can benefit from our analytics solutions."
                }
              }
            ]
          }
        ]}
      />
      <Header />
      

      {/* Simple Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-primary/5 to-background pt-36 pb-24 md:pt-48 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold"
              >
                {t("hero.tagline")}
              </motion.div>

              <motion.h1
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-primary">Data Analytics</span> for Women Entrepreneurs
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Empowering women micro-entrepreneurs in Hyderabad with actionable business insights and growth strategies.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  onClick={() => setShowMicroConversion(true)}
                  size="lg"
                  className="px-8 py-3 bg-primary text-white hover:bg-primary/90 shadow-lg font-semibold rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    {t("hero.apply")}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary/5 font-semibold rounded-lg"
                >
                  <Link to="/about">
                    {t("hero.learnMore")}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hero1} 
                  alt="Women entrepreneurs using data analytics for business growth" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">60+</div>
                  <div className="text-sm text-muted-foreground">Women Businesses</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-12">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              Our Partners
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Empowering Women Entrepreneurs Through Data Analytics
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We collaborate with leading NGOs and organizations in Hyderabad to provide data analytics training and business insights for women micro-entrepreneurs across Telangana
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-border/50">
              <div className="flex flex-wrap gap-8 md:gap-12 items-center justify-center">
                {[
                  { name: "Telangana Mahila Samakhya", initials: "TMS", color: "bg-pink-500", image: "/ngos/image.png" },
                  { name: "Stree Nidhi Credit Cooperative", initials: "SNC", color: "bg-purple-500", image: "/ngos/image copy.png" },
                  { name: "Chaitanya Mahila Sangham", initials: "CMS", color: "bg-blue-500", image: "/ngos/image copy 2.png" },
                  { name: "Rubaroo", initials: "RB", color: "bg-green-500", image: "/ngos/image copy 3.png" },
                  { name: "SAFA NGO", initials: "SAFA", color: "bg-orange-500", image: "/ngos/image copy 4.png" },
                  { name: "Kriya Foundation", initials: "KF", color: "bg-red-500", image: "/ngos/image copy 5.png" },
                  { name: "Annapurna Finance", initials: "AF", color: "bg-teal-500", image: "/ngos/image copy 6.png" },
                  { name: "Women's Development Network", initials: "WDN", color: "bg-indigo-500", image: "/ngos/image copy 7.png" },
                  { name: "Self Help Group Initiative", initials: "SHG", color: "bg-yellow-500", image: "/ngos/new.png" }
                ].map((ngo, index) => (
                  <motion.div
                    key={ngo.name}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="text-center group cursor-pointer"
                  >
                    <div className={`w-32 h-32 md:w-36 md:h-36 flex items-center justify-center p-3 rounded-xl shadow-sm border transition-all duration-300 ${ngo.name === "SAFA NGO"
                        ? "bg-gradient-to-br from-gray-900 to-black border-gray-700 group-hover:shadow-lg"
                        : "bg-white border-gray-100 group-hover:shadow-md"
                      }`}>
                      {ngo.name === "SAFA NGO" ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={ngo.image}
                            alt={ngo.name}
                            className="w-full h-full object-contain filter brightness-0 invert contrast-200"
                          />
                        </div>
                      ) : (
                        <img
                          src={ngo.image}
                          alt={ngo.name}
                          className="w-full h-full object-contain transition-all duration-300"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
                  <Shield className="w-5 h-5" />
                  <span>Partnered with over 9 NGOs</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who We Serve */}

      {/* Who We Serve */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              {t("common.whoWeServe")}
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
              Empowering {t("common.womenMicroEntrepreneurs")}
            </h2>
            <h3 className="font-display text-2xl md:text-3xl font-medium text-primary mb-6">
              Affordable Business Analytics Solutions for Growth
            </h3>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              {t("common.simpleAffordable")}. Transform your business data into actionable insights for revenue growth, inventory optimization, and marketing ROI.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <div className="mb-6">
                <img
                  src={hero2}
                  alt="Women entrepreneurs attending Femtrics data analytics workshop in Hyderabad"
                  className="w-full h-auto rounded-2xl shadow-lg mb-6"
                />
                <h3 className="font-display text-2xl font-semibold">Perfect for These Business Types</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {businessTypes.map((type, index) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card cursor-pointer card-hover-lift"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-base">{type}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <h3 className="font-display text-2xl font-semibold mb-6">{t("common.challenges")}</h3>
              <div className="space-y-4 mb-6">
                {painPoints.map((point, index) => {
                  const IconComponent = point.icon;
                  return (
                    <motion.div
                      key={point.text}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, y: -4 }}
                      className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card cursor-pointer card-hover-lift"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-lg font-medium">{point.text}</span>
                    </motion.div>
                  );
                })}
              </div>
              <img
                src={hero3}
                alt="Business analytics"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <p className="mt-6 text-lg font-semibold text-primary">
                {t("common.fillsGap")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Analytics Solutions */}
      <section className="section-padding relative bg-background">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-20">
          <img src={analyticsBg} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="container-tight relative">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              {t("common.ourSolutions")}
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
              Advanced Analytics Solutions That Drive Business Growth
            </h2>
            <h3 className="font-display text-2xl md:text-3xl font-medium text-primary mb-6">
              Professional Business Intelligence for Women Entrepreneurs in Hyderabad
            </h3>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Transform your business data into actionable insights with our comprehensive analytics platform. Designed specifically for women micro-entrepreneurs, our solutions include revenue tracking, customer analytics, predictive modeling, and performance metrics to help you make data-driven decisions and achieve sustainable business growth in Hyderabad's competitive market.
            </p>
            
            {/* Additional SEO Content */}
            <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h4 className="font-semibold text-lg mb-3 text-primary">Why Choose Femtrics?</h4>
                <p className="text-muted-foreground leading-relaxed">
                  As Hyderabad's leading data analytics provider for women entrepreneurs, we offer affordable business intelligence solutions that help you track revenue, understand customer behavior, optimize operations, and scale your business with confidence.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h4 className="font-semibold text-lg mb-3 text-primary">Data-Driven Success</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Join 60+ successful women entrepreneurs who have transformed their businesses using our analytics dashboard. Get real-time insights, KPI tracking, and growth strategies tailored for your specific business needs.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.map((product, index) => (
              <AnimatedSection key={product.title} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-card rounded-2xl p-8 h-full flex flex-col border border-border hover:shadow-lg card-hover-lift"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                    >
                      <product.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                      {product.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-3 tracking-tight">{product.title}</h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{product.description}</p>
                  <ul className="space-y-2 flex-grow">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {product.tools && (
                    <p className="mt-6 pt-4 border-t border-border/50 text-base text-muted-foreground">
                      <span className="font-semibold">Tools:</span> {product.tools}
                    </p>
                  )}
                  {product.useCases && (
                    <p className="mt-6 pt-4 border-t border-border/50 text-base text-muted-foreground">
                      <span className="font-semibold">Best for:</span> {product.useCases}
                    </p>
                  )}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* Our Reach */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
                {t("common.ourReach")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Serving Women Across Hyderabad, Delhi, Mumbai
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We're expanding our reach across India to empower more women entrepreneurs
                with data-driven insights.
              </p>
              <img
                src={hero2}
                alt="Women entrepreneurs across Hyderabad"
                className="w-full h-auto rounded-2xl shadow-lg mb-8 lg:hidden"
              />

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-display text-lg font-semibold mb-4 line-decoration">Primary Areas</h4>
                  <ul className="space-y-3">
                    {["Jubilee Hills", "Banjara Hills", "Madhapur", "Kondapur", "Gachibowli", "HITEC City"].map((area) => (
                      <motion.li
                        key={area}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-2 text-muted-foreground cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {area}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold mb-4 line-decoration">Partner Areas</h4>
                  <ul className="space-y-3">
                    {["Old City (via NGOs)", "Secunderabad", "LB Nagar", "Kukatpally"].map((area) => (
                      <motion.li
                        key={area}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-2 text-muted-foreground cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                        {area}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button asChild variant="hero" size="lg" className="mt-8 btn-shimmer">
                <Link to="/contact" className="group">
                  Send Enquiry
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative">
                <img
                  src={hero3}
                  alt="Women entrepreneurs across India using Femtrics analytics"
                  className="w-full h-auto rounded-2xl shadow-lg mb-8"
                />
                
                {/* Stats Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-100"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground font-medium">Major Cities</div>
                  </div>
                </motion.div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-background rounded-2xl p-8 border border-border/50">
                <h3 className="font-display text-2xl font-semibold mb-6">Expanding Our Impact</h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  From our Hyderabad headquarters, we're rapidly expanding to serve women entrepreneurs across India's major business hubs.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Strategic Expansion</h4>
                      <p className="text-muted-foreground">Targeting high-potential markets with strong women entrepreneur communities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Local Partnerships</h4>
                      <p className="text-muted-foreground">Collaborating with regional NGOs and women's organizations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Growth Trajectory</h4>
                      <p className="text-muted-foreground">Planning to reach 10+ cities by 2025</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                    <p className="text-primary font-medium">
                      Coming soon: Bangalore, Chennai, and Pune!
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* Goals / Impact Metrics */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            {/* Title removed as requested */}
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[
              { display: "40+", label: "woman business onboarded" },
              { display: "30-35%", label: "Revenue improvement" },
              { display: "20%", label: "Inventory waste reduction" },
              { display: "70+", label: "dashboards deployed" },
            ].map((metric, index) => (
              <AnimatedSection key={metric.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-card rounded-3xl p-6 text-center card-hover-lift border border-border"
                >
                  <div className="text-2xl md:text-3xl font-semibold text-primary mb-2 tracking-tight">
                    {metric.display}
                  </div>
                  <p className="text-muted-foreground text-base font-medium leading-relaxed">{metric.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { display: "12-15", label: "Forecasting models used monthly" },
              { display: "50+", label: "participants trained" },
            ].map((metric, index) => (
              <AnimatedSection key={metric.label} delay={(index + 4) * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-card rounded-3xl p-6 text-center card-hover-lift border border-border"
                >
                  <div className="text-2xl md:text-3xl font-semibold text-primary mb-2 tracking-tight">
                    {metric.display}
                  </div>
                  <p className="text-muted-foreground text-base font-medium leading-relaxed">{metric.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      
      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-5xl md:text-7xl font-semibold mb-6 tracking-tight">
              Ready to Transform Your Business with Data Analytics?
            </h2>
            <h3 className="font-display text-2xl md:text-3xl font-medium text-primary mb-6">
              Join 60+ Women Entrepreneurs Growing Their Businesses with Femtrics
            </h3>
            <p className="text-muted-foreground text-xl md:text-2xl mb-10 leading-relaxed">
              Take the first step towards data-driven business decisions. Our affordable analytics solutions are designed specifically for women entrepreneurs in Hyderabad who want to scale their businesses and maximize their revenue potential.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="lg" className="btn-shimmer">
                <Link to="/join" className="group">
                  {t("hero.apply")}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/join#volunteer">{t("common.becomeVolunteer")}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />

      {/* Micro-Conversion Modal */}
      <MicroConversionModal
        open={showMicroConversion}
        onOpenChange={setShowMicroConversion}
        onSuccess={handleMicroConversionSuccess}
      />
    </div>
  );
};

export default Index;
