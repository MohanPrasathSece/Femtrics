import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BarChart3, TrendingUp, Target, Users, Smartphone, PieChart, LineChart, Zap, Shield, Sparkles, DollarSign, Package, TrendingDown, Smartphone as PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CounterAnimation } from "@/components/CounterAnimation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroImageCarousel } from "@/components/HeroImageCarousel";
import { useTranslation } from "@/contexts/TranslationContext";
import analyticsBg from "@/assets/analytics-bg.png";

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
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Left Content, Right Image Carousel */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 hero-bg">
        <div className="container-tight relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-base font-medium">
                  <Sparkles className="w-4 h-4" />
                  {t("hero.tagline")}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight"
              >
                {t("hero.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-light"
              >
                {t("hero.description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Button asChild variant="hero" size="lg" className="btn-shimmer text-base px-8 py-6">
                  <Link to="/join" className="group flex items-center">
                    {t("hero.apply")}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="lg" className="text-base px-8 py-6">
                  <Link to="/about">{t("hero.learnMore")}</Link>
                </Button>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-6 text-base text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>{t("hero.free")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>{t("hero.noTech")}</span>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Image Carousel with Parallax */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <motion.div 
                className="relative"
                style={{ y: heroImageY }}
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <HeroImageCarousel />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="section-padding bg-pink-soft">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              {t("common.whoWeServe")}
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
              {t("common.womenMicroEntrepreneurs")}
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              {t("common.simpleAffordable")}
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <h3 className="font-display text-2xl font-semibold mb-6">{t("common.businessTypes")}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {businessTypes.map((type, index) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center gap-3 bg-card p-4 rounded-xl card-elevated cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-base">{type}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <h3 className="font-display text-2xl font-semibold mb-6">{t("common.challenges")}</h3>
              <div className="space-y-4">
                {painPoints.map((point, index) => {
                  const IconComponent = point.icon;
                  return (
                    <motion.div
                      key={point.text}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, y: -4 }}
                      className="flex items-center gap-4 bg-card p-6 rounded-xl cursor-pointer card-elevated"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-lg font-medium">{point.text}</span>
                    </motion.div>
                  );
                })}
              </div>
              <p className="mt-6 text-lg font-semibold text-primary">
                {t("common.fillsGap")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Analytics Solutions */}
      <section className="section-padding relative bg-pink-soft">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-20">
          <img src={analyticsBg} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              {t("common.ourSolutions")}
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
              {t("common.analyticsThatWork")}
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              {t("common.simpleAffordable")}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.map((product, index) => (
              <AnimatedSection key={product.title} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-card rounded-2xl p-8 h-full flex flex-col border border-border/60 hover:shadow-lg"
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

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-pink-medium">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
              {t("index.whatDrivesUs")}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "To empower women micro-entrepreneurs in Hyderabad—boutique owners, tiffin services, beauty service providers, tutors, home cooks—through affordable business analytics, so they can make smarter decisions, increase income, and grow sustainably.",
                delay: 0.1,
              },
              {
                icon: TrendingUp,
                title: "Our Vision",
                description: "A future where every woman entrepreneur has access to the data insights she needs to compete, grow, and thrive in the market.",
                delay: 0.2,
              },
              {
                icon: BarChart3,
                title: "Our Values",
                description: "Accessibility, empowerment, simplicity, and impact. We believe data should be a tool for everyone, not just big businesses.",
                delay: 0.3,
              },
            ].map((item) => (
              <AnimatedSection key={item.title} delay={item.delay}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card rounded-2xl p-8 card-elevated h-full"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"
                  >
                    <item.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-3xl font-semibold mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Reach */}
      <section className="section-padding bg-pink-soft">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              {t("common.ourReach")}
            </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Serving Women Across Hyderabad
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We're expanding our reach across Hyderabad to empower more women entrepreneurs 
                with data-driven insights.
              </p>

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
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 via-pink-soft to-accent/5 p-8 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-7xl md:text-8xl font-bold text-primary mb-4">
                      <CounterAnimation end={10} suffix="+" />
                    </div>
                    <p className="text-xl text-muted-foreground">Areas Covered</p>
                  </div>
                </motion.div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/20 -z-10 animate-pulse-soft" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-pink-medium -z-10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              {t("common.ourJourney")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Year-Long Execution Plan
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                phase: "1",
                title: "Build",
                period: "Month 1-2",
                items: ["Recruit volunteers", "Create dashboards/templates", "Train team", "Partner with 1 NGO", "Onboard first 10 businesses"],
                delay: 0.1,
              },
              {
                phase: "2",
                title: "Scale",
                period: "Month 3-6",
                items: ["50+ clients", "Release forecasting model v1", "Start school workshops", "Build 2 more NGO partnerships", "Publish case studies"],
                delay: 0.2,
              },
              {
                phase: "3",
                title: "Impact",
                period: "Month 6-12",
                items: ["120+ businesses", "Full analytics suite", "Sponsorships/funding", "Expansion to Warangal/Vijayawada", "Ambassador program"],
                delay: 0.3,
              },
            ].map((phase) => (
              <AnimatedSection key={phase.phase} delay={phase.delay}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative bg-background/5 backdrop-blur-sm rounded-2xl p-8 border border-background/10 h-full"
                >
                  <div className="absolute -top-6 left-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-display text-xl font-bold text-primary-foreground"
                    >
                      {phase.phase}
                    </motion.div>
                  </div>
                  <div className="pt-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-base text-background/50 uppercase tracking-wider">Phase {phase.phase}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-1">{phase.title}</h3>
                    <p className="text-primary text-base mb-6">{phase.period}</p>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <motion.li 
                          key={i} 
                          whileHover={{ x: 4 }}
                          className="flex items-start gap-3 text-background/70 text-base cursor-pointer"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Goals / Impact Metrics */}
      <section className="section-padding bg-pink-soft">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              {t("common.ourGoals")}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              {t("common.impactTargets")}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[
              { display: "80-120+", label: t("common.womenOnboarded") },
              { display: "30-35%", label: t("common.revenueImprovement") },
              { display: "20%", label: t("common.inventoryWasteReduction") },
              { display: "100+", label: t("common.dashboardsDeployed") },
            ].map((metric, index) => (
              <AnimatedSection key={metric.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 text-center card-elevated backdrop-blur-sm"
                >
                  <div className="font-display text-5xl md:text-6xl font-bold text-primary mb-3 tracking-tight">
                    {metric.display}
                  </div>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed">{metric.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { display: "12-15", label: t("common.forecastingModels") },
              { display: "300+", label: t("common.participantsTrained") },
              { display: "3", label: t("common.ngoPartnerships") },
              { display: "1-2", label: t("common.newspaperFeatures") },
            ].map((metric, index) => (
              <AnimatedSection key={metric.label} delay={(index + 4) * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 text-center card-elevated backdrop-blur-sm"
                >
                  <div className="font-display text-5xl md:text-6xl font-bold text-primary mb-3 tracking-tight">
                    {metric.display}
                  </div>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed">{metric.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container-tight">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-5xl md:text-7xl font-semibold mb-6 tracking-tight">
              {t("common.readyToJoin")}
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl mb-10 leading-relaxed">
              {t("common.joinMissionDesc")}
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
    </div>
  );
};

export default Index;
