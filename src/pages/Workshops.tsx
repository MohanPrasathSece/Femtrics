import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, BookOpen, CheckCircle, ArrowRight, GraduationCap, Award, Send } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import workshopsHero from "@/assets/workshops-hero.png";

const workshops = [
  {
    title: "Data for Didi",
    tagline: "For Women Entrepreneurs",
    description: "A hands-on workshop designed specifically for women micro-entrepreneurs. Learn to track your business data, understand your numbers, and make smarter decisions.",
    duration: "3 hours",
    participants: "15-25",
    level: "Beginner",
    topics: [
      "Basic expense tracking",
      "Understanding sales patterns",
      "Simple profit calculations",
      "Using your phone for business data",
      "Reading simple charts",
      "Inventory basics",
    ],
    color: "primary",
  },
  {
    title: "Girls in Data",
    tagline: "For School & College Students",
    description: "Introducing young women to the world of data analytics. Build foundational skills and discover career opportunities in the growing field of business analytics.",
    duration: "4 hours",
    participants: "20-30",
    level: "Beginner",
    topics: [
      "What is data analytics?",
      "Career opportunities in data",
      "Hands-on Excel/Sheets basics",
      "Creating your first chart",
      "Data storytelling",
      "Real-world case studies",
    ],
    color: "accent",
  },
];

const upcomingSchedule = [
  { date: "Dec 15, 2024", workshop: "Data for Didi", location: "Jubilee Hills", time: "10:00 AM", type: "Women Entrepreneurs" },
  { date: "Dec 20, 2024", workshop: "Girls in Data", location: "Madhapur", time: "2:00 PM", type: "Students" },
  { date: "Jan 5, 2025", workshop: "Data for Didi", location: "Gachibowli", time: "11:00 AM", type: "Women Entrepreneurs" },
  { date: "Jan 12, 2025", workshop: "Girls in Data", location: "Banjara Hills", time: "10:00 AM", type: "Students" },
];

const Workshops = () => {
  const { t } = useTranslation();
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    phone: "",
    email: "",
    workshop: "",
    date: "",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 hero-bg relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 opacity-30">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container-tight relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-base font-medium mb-6">
                Educational Programs
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.1] mb-6">
                Learn to lead with <span className="text-gradient italic">data</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Free, hands-on workshops designed for women entrepreneurs and students. 
                No prior experience needed—just a willingness to learn.
              </p>
            </AnimatedSection>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.img 
                  src={workshopsHero} 
                  alt="Women in workshop learning data analytics"
                  className="rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/20 -z-10 animate-pulse-soft" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-pink-soft -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Educational Impact Section */}
      <section className="section-padding bg-pink-soft">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              Educational Impact
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Empowering Through Education
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our workshops are designed to make data accessible and actionable for everyone
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, value: "300+", label: "Participants Trained" },
              { icon: GraduationCap, value: "50+", label: "Workshops Conducted" },
              { icon: Award, value: "95%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card rounded-2xl p-8 text-center card-hover-glow border border-border/50"
                >
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <stat.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <div className="text-4xl font-bold text-primary mb-2 font-sans">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Cards */}
      <section className="section-padding">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              {t("common.workshopPrograms")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("common.practicalSessions")}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {workshops.map((workshop, index) => (
              <AnimatedSection key={workshop.title} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-card rounded-3xl p-8 h-full flex flex-col card-elevated"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-base font-medium ${
                      workshop.color === "primary" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-accent/10 text-accent"
                    }`}>
                      {workshop.tagline}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-semibold mb-3">{workshop.title}</h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{workshop.description}</p>

                  <div className="flex flex-wrap gap-4 mb-6 text-base text-muted-foreground">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 bg-pink-soft px-3 py-1.5 rounded-lg"
                    >
                      <Clock className="w-4 h-4" /> {workshop.duration}
                    </motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 bg-pink-soft px-3 py-1.5 rounded-lg"
                    >
                      <Users className="w-4 h-4" /> {workshop.participants} participants
                    </motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 bg-pink-soft px-3 py-1.5 rounded-lg"
                    >
                      {workshop.level}
                    </motion.span>
                  </div>

                  <div className="pt-6 border-t border-border/50 flex-grow">
                    <h4 className="text-base font-semibold mb-4">{t("common.whatYouLearn")}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {workshop.topics.map((topic) => (
                        <motion.div 
                          key={topic} 
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-start gap-2 text-base text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Schedule */}
      <section className="section-padding bg-pink-medium">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              {t("common.schedule")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              {t("common.upcomingWorkshops")}
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-4">
            {upcomingSchedule.map((event, index) => (
              <AnimatedSection key={`${event.date}-${event.workshop}`} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-elevated"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      whileHover={{ rotate: 10 }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <Calendar className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{event.workshop}</h3>
                        <span className="text-sm px-2 py-0.5 rounded-full bg-pink-soft text-muted-foreground">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-base text-muted-foreground">
                        <span>{event.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    Register
                  </Button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="section-padding bg-pink-soft">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
                Register Now
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Join Our Next Workshop
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Fill out the registration form and we'll get back to you with all the details. 
                All workshops are completely free!
              </p>
              <ul className="space-y-4">
                {[
                  "No prior experience required",
                  "Materials and refreshments provided",
                  "Certificate of completion",
                  "Follow-up support included",
                  "Networking opportunities",
                ].map((item) => (
                  <motion.li 
                    key={item} 
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-card rounded-3xl p-8 card-hover-glow border border-border/50"
              >
                <h3 className="font-display text-2xl font-semibold mb-6">Registration Form</h3>
                <form className="space-y-5">
                  <div>
                    <label className="block text-base font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Workshop *</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                      <option value="">Choose a workshop</option>
                      <option value="data-for-didi">Data for Didi (Women Entrepreneurs)</option>
                      <option value="girls-in-data">Girls in Data (Students)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                      <option value="">Select a date</option>
                      <option value="dec-15">Dec 15, 2024 - Jubilee Hills</option>
                      <option value="dec-20">Dec 20, 2024 - Madhapur</option>
                      <option value="jan-5">Jan 5, 2025 - Gachibowli</option>
                      <option value="jan-12">Jan 12, 2025 - Banjara Hills</option>
                    </select>
                  </div>
                  <Button type="submit" variant="hero" className="w-full btn-shimmer" size="lg">
                    Register Now
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
                <p className="text-muted-foreground text-sm mt-4 text-center">
                  We'll send you a confirmation with all the details within 24 hours.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="section-padding bg-pink-soft">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
                Free Resources
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Take learning home
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Access our collection of free templates, guides, and checklists designed 
                to help you implement what you learn.
              </p>
              <ul className="space-y-4">
                {[
                  "Daily sales tracking template",
                  "Monthly expense tracker",
                  "Customer feedback form",
                  "Inventory management checklist",
                  "Business health scorecard",
                ].map((resource) => (
                  <motion.li 
                    key={resource} 
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3"
                  >
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>{resource}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-primary/10 via-pink-medium to-accent/5 rounded-3xl p-8 md:p-12 border border-border/50"
              >
                <motion.div whileHover={{ rotate: 10 }}>
                  <BookOpen className="w-16 h-16 text-primary mb-6" />
                </motion.div>
                <h3 className="font-display text-2xl font-semibold mb-4">
                  Download Our Starter Kit
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get everything you need to start tracking your business data today. 
                  Includes templates, guides, and video tutorials.
                </p>
                <Button asChild variant="hero" className="btn-shimmer">
                  <Link to="/contact" className="group">
                    Get Starter Kit
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Workshops;
