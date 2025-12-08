import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, TrendingUp, Target, Users, Smartphone, PieChart, LineChart, Zap, Shield, Sparkles, DollarSign, Package, TrendingDown, Smartphone as PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CounterAnimation } from "@/components/CounterAnimation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/contexts/TranslationContext";
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
  
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Modern Minimal Design */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container-tight relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center items-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>65+ Women Trained</span>
              </div>
              <div className="text-sm text-gray-400">•</div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>NGO Partners</span>
              </div>
              <div className="text-sm text-gray-400">•</div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Hyderabad Focus</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-gray-900">Femtrics —</span><br/>
              <span className="text-gradient">Data that helps your business earn more.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Dashboards, forecasts & Instagram insights—designed for women-run microbusinesses in Hyderabad.
            </motion.p>

            {/* Free Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full mb-8"
            >
              <span className="text-sm font-semibold">COMPLETELY FREE</span>
              <span className="text-xs opacity-90">(We carefully select businesses we work with)</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get my free mini-audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 px-8 py-4 text-lg font-semibold transition-all duration-200"
              >
                See sample dashboard
              </Button>
            </motion.div>

            {/* Phone Input Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md mx-auto mb-12"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Get started with your phone number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3 text-gray-600">
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6">
                    Start
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Visual Section - Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl border border-pink-200 overflow-hidden">
                <img 
                  src={hero1}
                  alt="Business Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Entrepreneur Photo Overlay */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full shadow-lg border-4 border-pink-200 overflow-hidden">
                <img 
                  src={hero2}
                  alt="Local Woman Entrepreneur"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Perfect for Your Business Type
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with women entrepreneurs across various sectors in Hyderabad
            </p>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-pink-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{type}</h3>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      {/* Features Section */}
      <section className="section-padding bg-pink-soft">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Everything You Need to Grow
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple tools that make complex data easy to understand
            </p>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 card-hover-glow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from women entrepreneurs who transformed their businesses
            </p>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-pink-600 to-rose-600">
        <div className="container-tight">
          <AnimatedSection className="text-center">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 65+ women entrepreneurs who are already using data to make smarter decisions
            </p>
            <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              <Link to="/join">Get Started Free</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section> 
                  src={hero1}
                  alt="Women entrepreneurs working with data analytics"
                  className="w-full h-auto rounded-3xl shadow-2xl border border-pink-200"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl shadow-lg flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl shadow-lg flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              <h3 className="font-display text-2xl font-semibold mb-6">{t("common.businessTypes")}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {businessTypes.map((type, index) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center gap-3 bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl card-elevated cursor-pointer"
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
                      className="flex items-center gap-4 bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl cursor-pointer card-elevated"
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
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 h-full flex flex-col border border-pink-200 hover:shadow-lg"
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
      <section className="section-padding bg-background">
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
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 card-elevated h-full"
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
                  className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-6 text-center card-elevated backdrop-blur-sm"
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
                  className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-6 text-center card-elevated backdrop-blur-sm"
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
    </div>
  );
};

export default Index;
