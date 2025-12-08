import { motion } from "framer-motion";
import { Calendar, Users, Clock, MapPin, ChevronRight, Gift, BookOpen, Target, DollarSign, Package, TrendingUp, LineChart, PieChart, BarChart3, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 hero-bg">
        <div className="container-tight">
          <AnimatedSection className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Workshops & Training
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6">
              Empowering Women with Data Skills
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Join our free workshops designed specifically for women entrepreneurs. Learn business analytics, pricing strategies, and Instagram insights to grow your business.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Workshop Signup Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 md:p-8 card-hover-glow border border-pink-200"
            >
              {/* Dashboard Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                <div>
                  <h3 className="font-display text-2xl font-semibold">Priya's Boutique</h3>
                  <p className="text-muted-foreground text-sm">Last updated: Today, 9:45 AM</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Healthy
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Premium Plan
                  </span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: DollarSign, label: "Monthly Revenue", value: "₹1,24,500", change: "+12%", positive: true },
                  { icon: Users, label: "Customers", value: "342", change: "+8%", positive: true },
                  { icon: Package, label: "Inventory Items", value: "156", change: "-3%", positive: false },
                  { icon: TrendingUp, label: "Profit Margin", value: "28%", change: "+2%", positive: true },
                ].map((kpi) => (
                  <motion.div
                    key={kpi.label}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-background rounded-xl p-5 card-hover-lift"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <kpi.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">{kpi.label}</span>
                    </div>
                    <div className="text-2xl font-bold mb-1 font-sans">{kpi.value}</div>
                    <span className={`text-xs font-medium ${kpi.positive ? "text-green-600" : "text-red-500"}`}>
                      {kpi.change} from last month
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart Placeholder */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-background rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold">Revenue Trend</h4>
                    <LineChart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {[40, 65, 45, 80, 55, 75, 90, 60, 85, 70, 95, 88].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t-sm cursor-pointer"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                    <span>Jan</span>
                    <span>Jun</span>
                    <span>Dec</span>
                  </div>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-background rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold">Sales by Category</h4>
                    <PieChart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Sarees", value: 42, color: "bg-primary" },
                      { name: "Suits", value: 28, color: "bg-primary/70" },
                      { name: "Accessories", value: 18, color: "bg-primary/50" },
                      { name: "Others", value: 12, color: "bg-primary/30" },
                    ].map((category) => (
                      <motion.div 
                        key={category.name}
                        whileHover={{ x: 4 }}
                        className="cursor-pointer"
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span>{category.name}</span>
                          <span className="font-medium font-sans">{category.value}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${category.value}%` }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className={`h-full ${category.color} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Insights Section */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0"
                  >
                    <AlertCircle className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold mb-2">AI-Powered Insights</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• <strong>Peak sales:</strong> Sarees sell best on weekends. Consider extending Saturday hours.</li>
                      <li>• <strong>Inventory alert:</strong> Low stock on blue silk sarees—your bestseller last month.</li>
                      <li>• <strong>Growth opportunity:</strong> Accessories have high margins. Consider featuring them prominently.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Workshop Calendar */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/30">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-12">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              Upcoming Workshops
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Join Our Free Workshops
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Learn practical skills to grow your business. All workshops are free and designed specifically for women entrepreneurs.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Business Analytics Basics",
                date: "Dec 15, 2024",
                time: "10:00 AM - 1:00 PM",
                location: "Old City Community Center",
                description: "Learn to track your business numbers and make data-driven decisions",
                level: "Beginner",
                spots: "12 spots left"
              },
              {
                title: "Instagram for Sales",
                date: "Dec 22, 2024", 
                time: "2:00 PM - 5:00 PM",
                location: "Secunderabad Women's Center",
                description: "Master Instagram marketing to increase your sales and customer base",
                level: "Intermediate",
                spots: "8 spots left"
              },
              {
                title: "Pricing Strategies",
                date: "Jan 5, 2025",
                time: "11:00 AM - 2:00 PM", 
                location: "LB Nagar Community Hall",
                description: "Learn how to price your products for maximum profit",
                level: "Beginner",
                spots: "15 spots left"
              },
              {
                title: "Inventory Management",
                date: "Jan 12, 2025",
                time: "3:00 PM - 6:00 PM",
                location: "Kukatpally Training Center",
                description: "Smart inventory techniques to reduce waste and increase profits",
                level: "Intermediate",
                spots: "10 spots left"
              },
              {
                title: "Customer Insights",
                date: "Jan 19, 2025",
                time: "10:00 AM - 1:00 PM",
                location: "Madhapur Business Center", 
                description: "Understand your customers and grow your business",
                level: "Beginner",
                spots: "20 spots left"
              },
              {
                title: "Financial Planning",
                date: "Jan 26, 2025",
                time: "2:00 PM - 5:00 PM",
                location: "Gachibowli Community Center",
                description: "Plan your business finances for sustainable growth",
                level: "Advanced",
                spots: "5 spots left"
              }
            ].map((workshop, index) => (
              <AnimatedSection key={workshop.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-border/50 card-hover-lift h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-2">{workshop.title}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        workshop.level === "Beginner" ? "bg-green-100 text-green-700" :
                        workshop.level === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {workshop.level}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{workshop.spots}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {workshop.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {workshop.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {workshop.location}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{workshop.description}</p>
                  
                  <Link 
                    to={`/workshop-register?workshop=${encodeURIComponent(workshop.title)}&date=${workshop.date}&location=${encodeURIComponent(workshop.location)}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  >
                    Register Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              {t("dashboard.whatYouGet")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our dashboards are tailored to your business type and updated automatically
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, title: "Revenue Tracking", desc: "Daily, weekly, and monthly revenue insights with trend analysis" },
              { icon: TrendingUp, title: "Growth Forecasting", desc: "AI-powered predictions to help you plan inventory and staffing" },
              { icon: PieChart, title: "Category Analysis", desc: "Understand which products drive your business forward" },
              { icon: Users, title: "Customer Insights", desc: "Know your customers better—their preferences and buying patterns" },
              { icon: Package, title: "Inventory Management", desc: "Smart alerts when stock is low or products are underperforming" },
              { icon: DollarSign, title: "Profit Analysis", desc: "Clear breakdown of costs and margins for each product category" },
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 card-hover-glow h-full border border-pink-200 gradient-border"
                >
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                  >
                    <feature.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              {t("dashboard.ctaTitle")}
            </h2>
            <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
              {t("dashboard.ctaDesc")}
            </p>
            <Button asChild variant="hero" size="lg" className="btn-shimmer">
              <Link to="/join">{t("nav.getStarted")}</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
