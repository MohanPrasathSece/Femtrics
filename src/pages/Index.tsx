import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, TrendingUp, Target, Users, Smartphone, PieChart, LineChart, Zap, Shield, Sparkles, DollarSign, Package, TrendingDown, Smartphone as PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CounterAnimation } from "@/components/CounterAnimation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      <Header />

      {/* Landing Hero - Simplified & Clean */}
      <section className="relative bg-white overflow-hidden pt-28 pb-20 md:pb-32">
        {/* Simple Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container-tight relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
            {/* Simplified Text Section */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {t("hero.tagline")}
                </div>
                
                <motion.h1 
                  className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Femtrics: {t("hero.title")}
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {t("hero.description")}
                </motion.p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 md:gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  onClick={() => setShowMicroConversion(true)}
                  size="lg"
                  className="px-8 py-4 bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl font-semibold rounded-xl text-base md:text-lg transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    {t("hero.apply")}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary/5 font-semibold rounded-xl text-base md:text-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/about">
                    <span className="flex items-center gap-2">
                      {t("hero.learnMore")}
                      <Target className="w-4 h-4" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Simplified Visual Section */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="grid gap-6">
                  <div className="rounded-2xl overflow-hidden">
                    <img src={hero1} alt="Analytics preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="rounded-2xl overflow-hidden">
                      <img src={hero2} alt="Women entrepreneurs" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-2xl overflow-hidden">
                      <img src={hero3} alt="Growth insights" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
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
              Working Together for Women's Empowerment
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're proud to collaborate with these amazing organizations who share our vision of empowering women entrepreneurs through data literacy
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-border/50">
              <div className="grid grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
                {[
                  { name: "Telangana Mahila Samakhya", initials: "TMS", color: "bg-pink-500" },
                  { name: "Stree Nidhi Credit Cooperative", initials: "SNC", color: "bg-purple-500" },
                  { name: "Chaitanya Mahila Sangham", initials: "CMS", color: "bg-blue-500" },
                  { name: "Rubaroo", initials: "RB", color: "bg-green-500" },
                  { name: "SAFA NGO", initials: "SAFA", color: "bg-orange-500" },
                  { name: "Kriya Foundation", initials: "KF", color: "bg-red-500" },
                  { name: "Annapurna Finance", initials: "AF", color: "bg-teal-500" },
                  { name: "ESAF Small Finance Bank", initials: "ESAF", color: "bg-indigo-500" },
                  { name: "Oakridge International", initials: "OI", color: "bg-cyan-500" },
                  { name: "Chirec International", initials: "CI", color: "bg-emerald-500" }
                ].map((ngo, index) => (
                  <motion.div
                    key={ngo.name}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="text-center group cursor-pointer"
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 ${ngo.color} rounded-xl flex items-center justify-center mx-auto group-hover:shadow-xl transition-all duration-300`}>
                      <span className="text-white font-bold text-lg md:text-xl">
                        {ngo.initials}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
                  <Shield className="w-5 h-5" />
                  <span>10 NGO Partners Across Hyderabad</span>
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
              {t("common.womenMicroEntrepreneurs")}
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              {t("common.simpleAffordable")}
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <div className="mb-6">
                <img 
                  src={hero2} 
                  alt="Women entrepreneurs" 
                  className="w-full h-auto rounded-2xl shadow-lg mb-6"
                />
                <h3 className="font-display text-2xl font-semibold">{t("common.businessTypes")}</h3>
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
                Serving Women Across Hyderabad
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We're expanding our reach across Hyderabad to empower more women entrepreneurs 
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
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="aspect-square rounded-3xl bg-card p-8 flex items-center justify-center border border-border"
                >
                  <div className="text-center">
                    <div className="text-7xl md:text-8xl font-bold text-primary mb-4">
                      <CounterAnimation end={10} suffix="+" />
                    </div>
                    <p className="text-xl text-muted-foreground">Areas Covered</p>
                  </div>
                </motion.div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/20 -z-10 animate-pulse-soft" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-background -z-10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      
      {/* Goals / Impact Metrics */}
      <section className="section-padding bg-background">
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
              { display: "12-15", label: t("common.forecastingModels") },
              { display: "300+", label: t("common.participantsTrained") },
              { display: "3", label: t("common.ngoPartnerships") },
              { display: "1-2", label: t("common.newspaperFeatures") },
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
