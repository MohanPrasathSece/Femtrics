import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Briefcase, Heart, Building, GraduationCap, BarChart3, Palette, Megaphone, Settings, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { isBusinessEmail, isValidPhoneNumber } from "@/lib/emailValidation";

const businessTypes = [
  "Home baker",
  "Boutique/Saree store",
  "Tiffin service",
  "Mehndi artist",
  "Beautician",
  "Tutor/Academy",
  "Craft/Candle maker",
  "Instagram business",
  "Other",
];

const volunteerRoles = [
  {
    title: "Data Associate",
    desc: "Help create dashboards and analyze business data for clients",
    icon: BarChart3,
    skills: "Excel, Google Sheets, Basic analytics",
    count: "12 positions",
  },
  {
    title: "Designer",
    desc: "Create visual reports, infographics, and presentation materials",
    icon: Palette,
    skills: "Canva, Figma, Visual design",
    count: "3 positions",
  },
  {
    title: "Outreach Lead",
    desc: "Connect with NGOs, SHGs, and potential clients in the community",
    icon: Megaphone,
    skills: "Communication, Networking, Telugu/Hindi",
    count: "1 position",
  },
  {
    title: "Operations Lead",
    desc: "Manage volunteer coordination, scheduling, and quality assurance",
    icon: Settings,
    skills: "Project management, Organization",
    count: "1 position",
  },
];

const Join = () => {
  const [activeTab, setActiveTab] = useState<"business" | "volunteer">("business");
  const { t } = useTranslation();
  const [businessFormData, setBusinessFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    businessName: '',
    businessType: '',
    location: '',
    businessDuration: '',
    challenge: '',
    email: ''
  });
  const [volunteerFormData, setVolunteerFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    skills: '',
    availability: '',
    motivation: ''
  });
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [emailErrors, setEmailErrors] = useState<{ email?: string; phone?: string }>({});

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBusinessFormData({
      ...businessFormData,
      [name]: value
    });
    if (emailErrors[name as keyof typeof emailErrors]) {
      setEmailErrors({
        ...emailErrors,
        [name]: undefined
      });
    }
  };

  const handleVolunteerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVolunteerFormData({
      ...volunteerFormData,
      [name]: value
    });
    if (emailErrors[name as keyof typeof emailErrors]) {
      setEmailErrors({
        ...emailErrors,
        [name]: undefined
      });
    }
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessFormData.phone || !isValidPhoneNumber(businessFormData.phone)) {
      setEmailErrors({ phone: 'Please enter a valid phone number' });
      return;
    }

    if (!businessFormData.email) {
      setEmailErrors({ email: 'Business email is required' });
      return;
    }

    if (!isBusinessEmail(businessFormData.email)) {
      setShowEmailAlert(true);
      setEmailErrors({ email: 'Please use a business email address' });
      return;
    }

    setEmailErrors({});
    // Handle form submission here
    console.log('Business form submitted', businessFormData);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!volunteerFormData.phone || !isValidPhoneNumber(volunteerFormData.phone)) {
      setEmailErrors({ phone: 'Please enter a valid phone number' });
      return;
    }

    if (!volunteerFormData.email) {
      setEmailErrors({ email: 'Email is required' });
      return;
    }

    if (!isBusinessEmail(volunteerFormData.email)) {
      setShowEmailAlert(true);
      setEmailErrors({ email: 'Please use a business email address' });
      return;
    }

    setEmailErrors({});
    // Handle form submission here
    console.log('Volunteer form submitted', volunteerFormData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 hero-bg">
        <div className="container-tight">
          <AnimatedSection className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {t("nav.join")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6">
              {t("join.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t("join.heroDesc")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tab Selection */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection>
            <div className="flex justify-center mb-12">
              <div className="bg-secondary rounded-2xl p-2 inline-flex">
                <button
                  onClick={() => setActiveTab("business")}
                  className={`px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === "business"
                      ? "bg-card shadow-lg text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    {t("join.applyTab")}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("volunteer")}
                  className={`px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === "volunteer"
                      ? "bg-card shadow-lg text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    {t("join.volunteerTab")}
                  </span>
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Business Application */}
          {activeTab === "business" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-12">
                <AnimatedSection direction="left">
                  <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                    Grow your business with data
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Join 100+ women entrepreneurs who are already using Femtrics to make 
                    smarter business decisions and grow their revenue.
                  </p>

                  <div className="space-y-4 mb-8">
                    <h3 className="font-semibold text-lg">{t("join.whatYouGet")}</h3>
                    {[
                      "Personalized MicroBiz Insight Dashboard",
                      "Monthly insights and recommendations",
                      "Access to all workshops (free)",
                      "One-on-one support sessions",
                      "Demand forecasting for your business",
                      "Instagram growth analysis",
                      "Community of fellow entrepreneurs",
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-secondary/50 rounded-xl p-6">
                    <h4 className="font-semibold mb-3">{t("join.eligibility")}</h4>
                    <ul className="text-muted-foreground text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Woman-owned micro or small business
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Based in Hyderabad or partner areas
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Operating for at least 3 months
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Committed to using data for growth
                      </li>
                    </ul>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2}>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 card-elevated">
                    <h3 className="font-display text-2xl font-semibold mb-6">{t("join.businessApplication")}</h3>
                    <form onSubmit={handleBusinessSubmit} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={businessFormData.name}
                          onChange={handleBusinessChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={businessFormData.phone}
                          onChange={handleBusinessChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                            emailErrors.phone 
                              ? 'border-red-300 focus:ring-red-300' 
                              : 'border-border focus:ring-primary/30'
                          }`}
                          placeholder="+91 98765 43210"
                        />
                        {emailErrors.phone && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Business Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={businessFormData.email}
                          onChange={handleBusinessChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                            emailErrors.email 
                              ? 'border-red-300 focus:ring-red-300' 
                              : 'border-border focus:ring-primary/30'
                          }`}
                          placeholder="your@business.com"
                        />
                        {emailErrors.email && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.email}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Please use your business email address (not Gmail, Yahoo, etc.)
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={businessFormData.whatsapp}
                          onChange={handleBusinessChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Same as phone or different"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Business Name *</label>
                        <input
                          type="text"
                          name="businessName"
                          value={businessFormData.businessName}
                          onChange={handleBusinessChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Your business name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Business Type *</label>
                        <select 
                          name="businessType"
                          value={businessFormData.businessType}
                          onChange={handleBusinessChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        >
                          <option value="">Select type</option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location (Area) *</label>
                        <input
                          type="text"
                          name="location"
                          value={businessFormData.location}
                          onChange={handleBusinessChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Your area in Hyderabad"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">How long have you been in business?</label>
                        <select 
                          name="businessDuration"
                          value={businessFormData.businessDuration}
                          onChange={handleBusinessChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        >
                          <option value="">Select duration</option>
                          <option value="less-than-3">Less than 3 months</option>
                          <option value="3-6">3-6 months</option>
                          <option value="6-12">6-12 months</option>
                          <option value="1-2-years">1-2 years</option>
                          <option value="more-than-2">More than 2 years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">What's your biggest business challenge?</label>
                        <textarea
                          name="challenge"
                          value={businessFormData.challenge}
                          onChange={handleBusinessChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                          placeholder="Tell us about your challenges..."
                        />
                      </div>
                      <Button type="submit" variant="hero" className="w-full" size="lg">
                        {t("join.submitApplication")}
                        <ArrowRight className="ml-2" />
                      </Button>
                    </form>
                    <p className="text-muted-foreground text-xs mt-4 text-center">
                      {t("join.weWillContact")}
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </motion.div>
          )}

          {/* Volunteer Application */}
          {activeTab === "volunteer" && (
            <motion.div
              id="volunteer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-12">
                <AnimatedSection direction="left">
                  <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                    Make a real difference
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Use your skills to empower women entrepreneurs. Whether you're a data enthusiast, 
                    designer, or just passionate about social impact—we need you.
                  </p>

                  <div className="space-y-6 mb-8">
                    <h3 className="font-semibold text-lg">Volunteer Roles:</h3>
                    {volunteerRoles.map((role) => (
                      <motion.div 
                        key={role.title} 
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-4 bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-2xl card-elevated"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <role.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{role.title}</h4>
                            <span className="text-xs text-primary font-medium">{role.count}</span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{role.desc}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Skills:</span> {role.skills}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 via-secondary to-accent/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-3">What Every Volunteer Gets</h4>
                    <ul className="space-y-2">
                      {[
                        "Comprehensive Bootcamp Training",
                        "Standard Operating Procedures (SOPs)",
                        "Real Client Experience",
                        "Certificate of Volunteering",
                        "Networking Opportunities",
                      ].map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted-foreground text-sm mt-4">
                      <span className="font-medium">Time Commitment:</span> Flexible! 4-8 hours per week. 
                      We work around your schedule.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2}>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 card-elevated">
                    <h3 className="font-display text-2xl font-semibold mb-6">{t("join.volunteerApplication")}</h3>
                    <form onSubmit={handleVolunteerSubmit} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={volunteerFormData.name}
                          onChange={handleVolunteerChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Business Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={volunteerFormData.email}
                          onChange={handleVolunteerChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                            emailErrors.email 
                              ? 'border-red-300 focus:ring-red-300' 
                              : 'border-border focus:ring-primary/30'
                          }`}
                          placeholder="your@business.com"
                        />
                        {emailErrors.email && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.email}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Please use your business email address (not Gmail, Yahoo, etc.)
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={volunteerFormData.phone}
                          onChange={handleVolunteerChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                            emailErrors.phone 
                              ? 'border-red-300 focus:ring-red-300' 
                              : 'border-border focus:ring-primary/30'
                          }`}
                          placeholder="+91 98765 43210"
                        />
                        {emailErrors.phone && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Interested Role *</label>
                        <select 
                          name="role"
                          value={volunteerFormData.role}
                          onChange={handleVolunteerChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        >
                          <option value="">Select role</option>
                          <option value="data-associate">Data Associate</option>
                          <option value="designer">Designer</option>
                          <option value="outreach-lead">Outreach Lead</option>
                          <option value="operations-lead">Operations Lead</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Skills *</label>
                        <input
                          type="text"
                          name="skills"
                          value={volunteerFormData.skills}
                          onChange={handleVolunteerChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="e.g., Excel, Google Sheets, Canva, Data Analysis"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Availability *</label>
                        <select 
                          name="availability"
                          value={volunteerFormData.availability}
                          onChange={handleVolunteerChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        >
                          <option value="">Select availability</option>
                          <option value="weekdays">Weekdays only</option>
                          <option value="weekends">Weekends only</option>
                          <option value="flexible">Flexible</option>
                          <option value="evenings">Evenings only</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Why do you want to volunteer with Femtrics?</label>
                        <textarea
                          name="motivation"
                          value={volunteerFormData.motivation}
                          onChange={handleVolunteerChange}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                          placeholder="Tell us about yourself and why you're interested..."
                        />
                      </div>
                      <Button type="submit" variant="hero" className="w-full" size="lg">
                        {t("join.submitApplication")}
                        <ArrowRight className="ml-2" />
                      </Button>
                    </form>
                    <p className="text-muted-foreground text-xs mt-4 text-center">
                      {t("join.weWillReachOut")}
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Our Partner Network
            </h2>
            <p className="text-muted-foreground">
              We work with organizations across Hyderabad to reach more women
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Women's Self-Help Groups", desc: "Grassroots networks" },
              { icon: Heart, title: "NGOs", desc: "Community organizations" },
              { icon: GraduationCap, title: "College/School Clubs", desc: "Student volunteers" },
              { icon: Building, title: "Micro-finance Institutions", desc: "Financial networks" },
            ].map((partner, index) => (
              <AnimatedSection key={partner.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 card-elevated text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <partner.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{partner.title}</h3>
                  <p className="text-muted-foreground text-sm">{partner.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Email Alert Dialog */}
      <AlertDialog open={showEmailAlert} onOpenChange={setShowEmailAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Business Email Required
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please use your business email address instead of a personal email (Gmail, Yahoo, Hotmail, etc.). 
              This helps us verify your business and provide better service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowEmailAlert(false)}>
              I Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Join;