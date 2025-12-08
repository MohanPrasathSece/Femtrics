import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Calendar, Clock, Users, MapPin, BookOpen, CheckCircle, ArrowRight, GraduationCap, Award, Send, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import workshopsHero from "@/assets/workshops-hero.png";
import hero3 from "@/assets/hero-3.png";
import femtricsLogo from "/logo.png";

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
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    signupType: "",
    workshop: "",
    date: "",
    name: "",
    email: "",
    phone: "",
    groupName: "",
    groupSize: "",
    participantFile: null,
    participants: []
  });
  const [selectedMonth, setSelectedMonth] = useState(0);

  // SEO metadata for Workshops page
  useEffect(() => {
    document.title = "Femtrics Workshops | Data Analytics Training for Women Entrepreneurs";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.content = "Join Femtrics workshops - Free data analytics training for women entrepreneurs in Hyderabad. Learn business insights, revenue tracking, and data-driven decisions.";
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link') as HTMLLinkElement;
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://femtrics.com/workshops';
    
    // Update Open Graph tags
    updateMetaTag('og:title', 'Femtrics Workshops | Data Analytics Training');
    updateMetaTag('og:description', 'Free data analytics workshops for women entrepreneurs. Learn business insights and revenue tracking.');
    updateMetaTag('og:url', 'https://femtrics.com/workshops');
    
    // Update Twitter tags
    updateMetaTag('twitter:title', 'Femtrics Workshops | Data Analytics Training');
    updateMetaTag('twitter:description', 'Free data analytics workshops for women entrepreneurs in Hyderabad.');
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

  const handleDateSelect = (workshop, date) => {
    setRegistrationData(prev => ({
      ...prev,
      workshop,
      date,
      location: "Various Locations",
      time: "10:00 AM - 1:00 PM",
      type: workshop === "Data for Didi" ? "Women Entrepreneurs" : "Students"
    }));
    setCurrentStep(4); // Jump to personal info step
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        parseParticipantFile(text, file.name);
      };
      reader.readAsText(file);
      setRegistrationData(prev => ({ ...prev, participantFile: file }));
    }
  };

  const parseParticipantFile = (text, fileName) => {
    const participants = [];
    const lines = text.split('\n');
    
    // Skip header if exists
    const startIndex = lines[0].toLowerCase().includes('name') ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Handle CSV format
      if (fileName.endsWith('.csv')) {
        const [name, email] = line.split(',').map(item => item.trim().replace(/"/g, ''));
        if (name && email && email.includes('@')) {
          participants.push({ name, email });
        }
      } else {
        // Handle simple text format (name,email per line)
        const [name, email] = line.split(',').map(item => item.trim());
        if (name && email && email.includes('@')) {
          participants.push({ name, email });
        }
      }
    }
    
    setRegistrationData(prev => ({ 
      ...prev, 
      participants: participants.slice(0, 50), // Limit to 50 participants
      groupSize: participants.length.toString()
    }));
  };

  const addManualParticipant = () => {
    setRegistrationData(prev => ({
      ...prev,
      participants: [...prev.participants, { name: '', email: '' }]
    }));
  };

  const updateParticipant = (index, field, value) => {
    setRegistrationData(prev => ({
      ...prev,
      participants: prev.participants.map((p, i) => 
        i === index ? { ...p, [field]: value } : p
      )
    }));
  };

  const removeParticipant = (index) => {
    setRegistrationData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  const resetModal = () => {
    setCurrentStep(1);
    setRegistrationData({
      signupType: "",
      workshop: "",
      date: "",
      name: "",
      email: "",
      phone: "",
      groupName: "",
      groupSize: "",
      participantFile: null,
      participants: []
    });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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
              <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.1] mb-6 flex items-center gap-4">
                <img 
                  src={femtricsLogo} 
                  alt="Femtrics Logo" 
                  className="w-16 h-16 md:w-20 md:h-20"
                />
                <span>
                  Femtrics: Learn to lead with <span className="text-gradient italic">data</span>
                </span>
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
              className="relative"
            >
              <div className="relative">
                <motion.img 
                  src={workshopsHero} 
                  alt="Women in workshop learning data analytics"
                  className="rounded-3xl shadow-2xl w-full h-auto"
                  whileHover={{ scale: 1.02 }}
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/20 -z-10 animate-pulse-soft hidden lg:block" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-background -z-10 hidden lg:block" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Educational Impact Section */}
      <section className="section-padding bg-background">
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
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 text-center card-hover-glow border border-pink-200"
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
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 h-full flex flex-col card-elevated"
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
                      className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg"
                    >
                      <Clock className="w-4 h-4" /> {workshop.duration}
                    </motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg"
                    >
                      <Users className="w-4 h-4" /> {workshop.participants} participants
                    </motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg"
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
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-base font-semibold tracking-wider uppercase mb-4 block">
              {t("common.schedule")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Upcoming Workshops
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              View our workshop schedule and register for upcoming sessions
            </p>
          </AnimatedSection>

          {/* Workshop Calendar Section */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden">
                {/* Calendar Header */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 border-b border-border/50">
                  <h3 className="text-2xl font-semibold text-center mb-4">Workshop Schedule</h3>
                  
                  {/* Month Tabs */}
                  <div className="flex justify-center">
                    <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
                      {['December 2024', 'January 2025', 'February 2025'].map((month, index) => (
                        <button
                          key={month}
                          onClick={() => setSelectedMonth(index)}
                          className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                            selectedMonth === index 
                              ? 'bg-pink-500 text-white shadow-sm' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calendar Body */}
                <div className="p-6">
                  {/* Calendar Grid - Single Month Display */}
                  <div className="space-y-6">
                    {selectedMonth === 0 && (
                      <div>
                        <h4 className="font-medium mb-4 text-center text-lg">December 2024</h4>
                        <div className="grid grid-cols-7 gap-2 mb-3">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                            let workshop = null;
                            let workshopCode = '';
                            
                            if (day === 15) {
                              workshop = 'Data for Didi';
                              workshopCode = 'DD';
                            } else if (day === 20) {
                              workshop = 'Girls in Data';
                              workshopCode = 'GD';
                            }
                            
                            return (
                              <div
                                key={day}
                                onClick={() => workshop && handleDateSelect(workshop, `Dec ${day}, 2024`)}
                                className={`text-center py-3 text-sm rounded-lg transition-all duration-200 ${
                                  workshop 
                                    ? 'bg-pink-500 text-white hover:bg-pink-600 cursor-pointer font-medium shadow-md hover:shadow-lg transform hover:scale-105' 
                                    : 'text-gray-300 cursor-not-allowed bg-gray-50'
                                }`}
                              >
                                <div className="font-medium">{day}</div>
                                {workshop && <div className="text-xs mt-1 font-bold">{workshopCode}</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {selectedMonth === 1 && (
                      <div>
                        <h4 className="font-medium mb-4 text-center text-lg">January 2025</h4>
                        <div className="grid grid-cols-7 gap-2 mb-3">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                            let workshop = null;
                            let workshopCode = '';
                            
                            if (day === 5 || day === 18) {
                              workshop = 'Data for Didi';
                              workshopCode = 'DD';
                            } else if (day === 12 || day === 25) {
                              workshop = 'Girls in Data';
                              workshopCode = 'GD';
                            }
                            
                            return (
                              <div
                                key={day}
                                onClick={() => workshop && handleDateSelect(workshop, `Jan ${day}, 2025`)}
                                className={`text-center py-3 text-sm rounded-lg transition-all duration-200 ${
                                  workshop 
                                    ? 'bg-pink-500 text-white hover:bg-pink-600 cursor-pointer font-medium shadow-md hover:shadow-lg transform hover:scale-105' 
                                    : 'text-gray-300 cursor-not-allowed bg-gray-50'
                                }`}
                              >
                                <div className="font-medium">{day}</div>
                                {workshop && <div className="text-xs mt-1 font-bold">{workshopCode}</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {selectedMonth === 2 && (
                      <div>
                        <h4 className="font-medium mb-4 text-center text-lg">February 2025</h4>
                        <div className="grid grid-cols-7 gap-2 mb-3">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: 28 }, (_, i) => i + 1).map(day => {
                            let workshop = null;
                            let workshopCode = '';
                            
                            if (day === 2) {
                              workshop = 'Data for Didi';
                              workshopCode = 'DD';
                            } else if (day === 9) {
                              workshop = 'Girls in Data';
                              workshopCode = 'GD';
                            }
                            
                            return (
                              <div
                                key={day}
                                onClick={() => workshop && handleDateSelect(workshop, `Feb ${day}, 2025`)}
                                className={`text-center py-3 text-sm rounded-lg transition-all duration-200 ${
                                  workshop 
                                    ? 'bg-pink-500 text-white hover:bg-pink-600 cursor-pointer font-medium shadow-md hover:shadow-lg transform hover:scale-105' 
                                    : 'text-gray-300 cursor-not-allowed bg-gray-50'
                                }`}
                              >
                                <div className="font-medium">{day}</div>
                                {workshop && <div className="text-xs mt-1 font-bold">{workshopCode}</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Legend */}
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <div className="flex justify-center gap-8 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-pink-500 rounded shadow-sm"></div>
                        <span className="font-medium">DD = Data for Didi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-pink-500 rounded shadow-sm"></div>
                        <span className="font-medium">GD = Girls in Data</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Registration CTA Section */}
          <AnimatedSection className="mt-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Ready to Join?</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Found a workshop that interests you? Register now and start your data analytics journey with our free, hands-on sessions.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Calendar className="w-5 h-5" />
                  Register for Workshops
                </button>
                <p className="text-sm text-muted-foreground mt-4">
                  Click on any pink date in the calendar above or use this button to start registration
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Step-by-Step Registration Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold">Workshop Registration</h3>
                    <button
                      onClick={resetModal}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Progress Steps */}
                  <div className="flex items-center justify-between">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            step <= currentStep
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {step}
                        </div>
                        {step < 5 && (
                          <div
                            className={`w-12 h-1 mx-2 transition-colors ${
                              step < currentStep ? 'bg-pink-500' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <span>Who</span>
                    <span>Workshop</span>
                    <span>Date</span>
                    <span>Details</span>
                    <span>Confirm</span>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Step 1: Who are you signing up? */}
                  {currentStep === 1 && (
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Who are you signing up?</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <button
                          onClick={() => {
                            setRegistrationData(prev => ({ ...prev, signupType: 'self' }));
                            setCurrentStep(2);
                          }}
                          className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                            registrationData.signupType === 'self'
                              ? 'border-pink-500 bg-pink-50'
                              : 'border-gray-200 hover:border-pink-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                              <Users className="w-6 h-6 text-pink-600" />
                            </div>
                            <h5 className="font-semibold text-lg">Myself</h5>
                          </div>
                          <p className="text-muted-foreground">
                            I want to register for a workshop to learn data analytics
                          </p>
                        </button>

                        <button
                          onClick={() => {
                            setRegistrationData(prev => ({ ...prev, signupType: 'group' }));
                            setCurrentStep(2);
                          }}
                          className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                            registrationData.signupType === 'group'
                              ? 'border-pink-500 bg-pink-50'
                              : 'border-gray-200 hover:border-pink-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                              <Users className="w-6 h-6 text-pink-600" />
                            </div>
                            <h5 className="font-semibold text-lg">Group Registration</h5>
                          </div>
                          <p className="text-muted-foreground">
                            Register 20+ people for a dedicated workshop session
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Choose Workshop */}
                  {currentStep === 2 && (
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Choose Workshop</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {workshops.map((workshop) => (
                          <button
                            key={workshop.title}
                            onClick={() => {
                              setRegistrationData(prev => ({ ...prev, workshop: workshop.title }));
                              setCurrentStep(3);
                            }}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                              registrationData.workshop === workshop.title
                                ? 'border-pink-500 bg-pink-50'
                                : 'border-gray-200 hover:border-pink-300'
                            }`}
                          >
                            <h5 className="font-semibold text-lg mb-2">{workshop.title}</h5>
                            <p className="text-sm text-muted-foreground mb-3">{workshop.tagline}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {workshop.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" /> {workshop.participants}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 rounded-full">
                                {workshop.level}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Choose Date */}
                  {currentStep === 3 && (
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Choose Date</h4>
                      <div className="space-y-4">
                        {upcomingSchedule
                          .filter(event => event.workshop === registrationData.workshop)
                          .map((event, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setRegistrationData(prev => ({ ...prev, date: event.date }));
                                setCurrentStep(4);
                              }}
                              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                registrationData.date === event.date
                                  ? 'border-pink-500 bg-pink-50'
                                  : 'border-gray-200 hover:border-pink-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-semibold">{event.date}</h5>
                                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {event.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" /> {event.location}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                  {registrationData.date === event.date && (
                                    <div className="w-3 h-3 rounded-full bg-pink-500" />
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Personal Details */}
                  {currentStep === 4 && (
                    <div>
                      <h4 className="text-xl font-semibold mb-4">
                        {registrationData.signupType === 'self' ? 'Your Details' : 'Participant Details'}
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <input
                            type="text"
                            value={registrationData.name}
                            onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address</label>
                          <input
                            type="email"
                            value={registrationData.email}
                            onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={registrationData.phone}
                            onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter phone number"
                          />
                        </div>
                        {registrationData.signupType === 'self' && (
                          <div className="bg-pink-50 p-3 rounded-lg text-sm text-pink-700">
                            <strong>Note:</strong> You can also bring a group of 20+ people for special arrangements.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Confirmation */}
                  {currentStep === 5 && (
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Review & Confirm</h4>
                      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Registration Type</p>
                            <p className="font-medium">{registrationData.signupType === 'self' ? 'Self Registration' : 'Registration for Others'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Workshop</p>
                            <p className="font-medium">{registrationData.workshop}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Date</p>
                            <p className="font-medium">{registrationData.date}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Participant Name</p>
                            <p className="font-medium">{registrationData.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{registrationData.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium">{registrationData.phone}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                        <p className="text-sm text-pink-700">
                          <strong>Important:</strong> You'll receive a confirmation email with workshop details and joining instructions.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-border">
                  <div className="flex justify-between">
                    <button
                      onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : resetModal()}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {currentStep === 1 ? 'Cancel' : 'Back'}
                    </button>
                    
                    {currentStep < 5 ? (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        disabled={
                          (currentStep === 1 && !registrationData.signupType) ||
                          (currentStep === 2 && !registrationData.workshop) ||
                          (currentStep === 3 && !registrationData.date) ||
                          (currentStep === 4 && (!registrationData.name || !registrationData.email || !registrationData.phone))
                        }
                        className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // Handle submission
                          alert('Registration submitted successfully!');
                          resetModal();
                        }}
                        className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                      >
                        Submit Registration
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="section-padding bg-background">
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
              <img 
                src={hero3}
                alt="Workshop resources and materials"
                className="rounded-3xl shadow-2xl border border-pink-200"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="section-padding bg-background">
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
