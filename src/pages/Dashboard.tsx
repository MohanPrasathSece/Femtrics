import { motion } from "framer-motion";
import { Calendar, Users, Clock, MapPin, ChevronRight, Gift, BookOpen, Target, DollarSign, Package, TrendingUp, LineChart, PieChart, BarChart3, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  AreaChart,
  Area,
  Legend
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const forecastData = [
  { month: 'Jan', actual: 4000, forecast: 4200 },
  { month: 'Feb', actual: 3000, forecast: 3100 },
  { month: 'Mar', actual: 2000, forecast: 2300 },
  { month: 'Apr', actual: 2780, forecast: 2900 },
  { month: 'May', actual: 1890, forecast: 2100 },
  { month: 'Jun', actual: 2390, forecast: 2500 },
  { month: 'Jul', forecast: 3600 },
  { month: 'Aug', forecast: 3800 },
];

const instagramData = [
  { day: 'Mon', followers: 1205, engagement: 4.5 },
  { day: 'Tue', followers: 1215, engagement: 4.8 },
  { day: 'Wed', followers: 1222, engagement: 4.2 },
  { day: 'Thu', followers: 1238, engagement: 5.1 },
  { day: 'Fri', followers: 1255, engagement: 6.5 },
  { day: 'Sat', followers: 1289, engagement: 7.2 },
  { day: 'Sun', followers: 1310, engagement: 6.8 },
];

const Dashboard = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: DollarSign, label: "Monthly Revenue", value: "₹1,24,500", change: "+12%", positive: true },
                  { icon: Users, label: "Customers", value: "342", change: "+8%", positive: true },
                  { icon: Package, label: "Inventory Items", value: "156", change: "-3%", positive: false },
                  { icon: TrendingUp, label: "Profit Margin", value: "28%", change: "+2%", positive: true },
                ].map((kpi) => (
                  <motion.div
                    key={kpi.label}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-background rounded-xl p-4 sm:p-5 card-hover-lift"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <kpi.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">{kpi.label}</span>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold mb-1 font-sans">{kpi.value}</div>
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

      {/* Product Samples */}
      <section className="section-padding bg-background/50">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              Our Products
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Tools That Drive Growth
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our suite of analytics products designed specifically for micro-entrepreneurs.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "MicroBiz Insight Dashboard",
                tag: "Product A",
                desc: "Complete business health at a glance. Track revenue, customers, and best-selling items.",
                icon: PieChart,
                features: ["Daily/Weekly Revenue", "Customer Retention", "Best Sellers"]
              },
              {
                title: "Demand Forecasting Model",
                tag: "Product B",
                desc: "AI-powered predictions to help you plan inventory and reduce waste.",
                icon: LineChart,
                features: ["3-Month Prediction", "Trend Analysis", "Inventory Planning"]
              },
              {
                title: "Instagram Growth Analyzer",
                tag: "Product C",
                desc: "Optimize your social media strategy to convert followers into customers.",
                icon: Target,
                features: ["Engagement Tracking", "ROI Analysis", "Content Strategy"]
              }
            ].map((product, index) => (
              <AnimatedSection key={product.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-2xl p-6 h-full flex flex-col border border-border shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <product.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">
                      {product.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{product.desc}</p>
                  <div className="pt-4 border-t border-border">
                    <ul className="space-y-2">
                      {product.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 rounded-full bg-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedProduct(product.tag)}
                      >
                        View Sample
                      </Button>
                    </div>
                  </div>
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

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct === "Product A" && "MicroBiz Insight Dashboard Sample"}
              {selectedProduct === "Product B" && "Demand Forecasting Model Sample"}
              {selectedProduct === "Product C" && "Instagram Growth Analyzer Sample"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedProduct === "Product A" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="text-sm text-green-600 font-medium">Monthly Revenue</div>
                    <div className="text-2xl font-bold text-green-700">₹45,200</div>
                    <div className="text-xs text-green-600 mt-1">+12.5% vs last month</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="text-sm text-blue-600 font-medium">New Customers</div>
                    <div className="text-2xl font-bold text-blue-700">128</div>
                    <div className="text-xs text-blue-600 mt-1">+5.2% vs last month</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="text-sm text-purple-600 font-medium">Avg Order Value</div>
                    <div className="text-2xl font-bold text-purple-700">₹850</div>
                    <div className="text-xs text-purple-600 mt-1">+2.1% vs last month</div>
                  </div>
                </div>
                <div className="h-[300px] border rounded-lg p-4 bg-white">
                  <h4 className="mb-4 font-semibold text-sm text-gray-500">Revenue Trend</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="actual" fill="#ec4899" name="Revenue" />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {selectedProduct === "Product B" && (
              <div className="h-[400px] w-full border rounded-lg p-4 bg-white">
                <h4 className="mb-4 font-semibold text-sm text-gray-500">Sales Forecast vs Actual</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Sales" strokeWidth={2} />
                    <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecasted Sales" strokeDasharray="5 5" strokeWidth={2} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedProduct === "Product C" && (
              <div className="space-y-6">
                <div className="h-[300px] w-full border rounded-lg p-4 bg-white">
                  <h4 className="mb-4 font-semibold text-sm text-gray-500">Follower Growth</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={instagramData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="followers" stroke="#E1306C" fill="#E1306C" fillOpacity={0.1} name="Total Followers" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[200px] w-full border rounded-lg p-4 bg-white">
                  <h4 className="mb-4 font-semibold text-sm text-gray-500">Engagement Rate (%)</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={instagramData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="engagement" stroke="#833AB4" strokeWidth={2} dot={{ r: 4 }} />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
