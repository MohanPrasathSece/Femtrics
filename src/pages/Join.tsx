import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Briefcase, Heart, Building, GraduationCap, BarChart3, Palette, Megaphone, Settings, AlertCircle, Upload, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { useTranslation } from "@/contexts/TranslationContext";
import { sendEmailWithGmailSMTP, sendConfirmationEmail, createJoinEmail, createPartnerEmail } from "@/utils/emailService";
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
  },
  {
    title: "Designer",
    desc: "Create visual reports, infographics, and presentation materials",
    icon: Palette,
    skills: "Canva, Figma, Visual design",
  },
  {
    title: "Outreach Lead",
    desc: "Connect with NGOs, SHGs, and potential clients in the community",
    icon: Megaphone,
    skills: "Communication, Networking, Telugu/Hindi",
  },
  {
    title: "Operations Lead",
    desc: "Manage volunteer coordination, scheduling, and quality assurance",
    icon: Settings,
    skills: "Project management, Organization",
  },
];

const Join = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"business" | "volunteer" | "partner">("business");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "partner") {
      setActiveTab("partner");
    } else if (tab === "volunteer") {
      setActiveTab("volunteer");
    }
  }, [location.search]);
  const { t } = useTranslation();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [volunteerSubmitStatus, setVolunteerSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [partnerSubmitStatus, setPartnerSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [partnerFormData, setPartnerFormData] = useState({
    orgName: '',
    email: '',
    isNGO: '',
    isHumanitarian: '',
    needsSupport: '',
    hasExperience: ''
  });
  const [businessFormData, setBusinessFormData] = useState({
    fullName: '',
    businessName: '',
    phoneNumber: '',
    email: '',
    instagramId: '',
    businessType: '',
    primaryGoal: '',
    whatsappOptIn: true
  });
  const [volunteerFormData, setVolunteerFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    position: '',
    experience: '',
    otherCommitments: '',
    evidence: null,
    whyJoin: '',
    availabilityHours: '',
    skillsRating: {
      technical: 3,
      communication: 3,
      teamwork: 3,
      leadership: 3,
      creativity: 3
    },
    isHighSchoolStudent: false,
    grade: '',
    schoolName: '',
    futureGoals: '',
    parentContact: ''
  });
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [emailErrors, setEmailErrors] = useState<{ name?: string; businessName?: string; phone?: string; email?: string; businessType?: string; primaryGoal?: string; position?: string; experience?: string; whyJoin?: string; availabilityHours?: string }>({});

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
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setVolunteerFormData({
        ...volunteerFormData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else if (type === 'file') {
      setVolunteerFormData({
        ...volunteerFormData,
        [name]: (e.target as HTMLInputElement).files?.[0] || null
      });
    } else if (name.startsWith('skillsRating.')) {
      const skill = name.split('.')[1];
      setVolunteerFormData({
        ...volunteerFormData,
        skillsRating: {
          ...volunteerFormData.skillsRating,
          [skill]: parseInt(value)
        }
      });
    } else {
      setVolunteerFormData({
        ...volunteerFormData,
        [name]: value
      });
    }

    if (emailErrors[name as keyof typeof emailErrors]) {
      setEmailErrors({
        ...emailErrors,
        [name]: undefined
      });
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessFormData.fullName.trim()) {
      setEmailErrors({ name: 'Full name is required' });
      return;
    }

    if (!businessFormData.businessName.trim()) {
      setEmailErrors({ businessName: 'Business name is required' });
      return;
    }

    if (!businessFormData.phoneNumber || !isValidPhoneNumber(businessFormData.phoneNumber)) {
      setEmailErrors({ phone: t("form.validPhoneError") });
      return;
    }

    if (!businessFormData.email.trim()) {
      setEmailErrors({ email: 'Email is required' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessFormData.email)) {
      setEmailErrors({ email: t("form.validEmailError") });
      return;
    }

    if (!businessFormData.businessType) {
      setEmailErrors({ businessType: 'Business type is required' });
      return;
    }

    if (!businessFormData.primaryGoal) {
      setEmailErrors({ primaryGoal: 'Primary goal is required' });
      return;
    }

    setEmailErrors({});

    try {
      const emailData = createJoinEmail({
        name: businessFormData.fullName,
        email: businessFormData.email,
        phone: businessFormData.phoneNumber,
        businessType: businessFormData.businessType,
        businessName: businessFormData.businessName,
        message: 'Business application submitted'
      });

      const success = await sendEmailWithGmailSMTP(emailData);

      if (success) {
        // Send confirmation email to user
        await sendConfirmationEmail({
          name: businessFormData.fullName,
          email: businessFormData.email,
          formType: 'Business Application',
          customMessage: `
            <p style="color: #374151; margin: 0 0 15px;">
              Thank you for applying to grow your business with Femtrics! We have received your application for <strong>${businessFormData.businessName}</strong>.
            </p>
            <div style="background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h4 style="color: #0369a1; margin: 0 0 10px;">Application Details:</h4>
              <ul style="color: #0369a1; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 5px;">Business: ${businessFormData.businessName}</li>
                <li style="margin-bottom: 5px;">Type: ${businessFormData.businessType}</li>
                <li style="margin-bottom: 5px;">Goal: ${businessFormData.primaryGoal}</li>
              </ul>
            </div>
            <p style="color: #374151; margin: 15px 0 0;">
              Our team will contact you within 2-3 business days to discuss the next steps.
            </p>
          `
        });

        // Show success alert
        setShowEmailAlert(true);
        setSubmitStatus('success');

        // Reset form
        setBusinessFormData({
          fullName: '',
          businessName: '',
          phoneNumber: '',
          email: '',
          instagramId: '',
          businessType: '',
          primaryGoal: '',
          whatsappOptIn: true
        });
      } else {
        console.error('Failed to send business form');
        setSubmitStatus('error');
      }

    } catch (error) {
      console.error('Error submitting business form:', error);
      setSubmitStatus('error');
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: typeof emailErrors = {};

    if (!volunteerFormData.fullName.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!volunteerFormData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isValidPhoneNumber(volunteerFormData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!volunteerFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(volunteerFormData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!volunteerFormData.position) {
      newErrors.position = 'Please select a position';
    }

    if (!volunteerFormData.experience.trim()) {
      newErrors.experience = 'Experience details are required';
    }

    if (!volunteerFormData.whyJoin.trim()) {
      newErrors.whyJoin = 'Please tell us why you want to join';
    }

    if (!volunteerFormData.availabilityHours.trim()) {
      newErrors.availabilityHours = 'Availability hours are required';
    }

    if (volunteerFormData.isHighSchoolStudent) {
      if (!volunteerFormData.grade.trim()) {
        newErrors.name = 'Grade is required for high school students';
      }
      if (!volunteerFormData.schoolName.trim()) {
        newErrors.email = 'School name is required for high school students';
      }
      if (!volunteerFormData.futureGoals.trim()) {
        newErrors.position = 'Future goals are required for high school students';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setEmailErrors(newErrors);
      return;
    }

    setEmailErrors({});

    try {
      const emailData = createJoinEmail({
        name: volunteerFormData.fullName,
        email: volunteerFormData.email,
        phone: volunteerFormData.phone,
        businessType: `Volunteer - ${volunteerFormData.position}`,
        businessName: '',
        message: 'Volunteer application submitted'
      });

      const success = await sendEmailWithGmailSMTP(emailData);

      if (success) {
        // Send confirmation email to user
        await sendConfirmationEmail({
          name: volunteerFormData.fullName,
          email: volunteerFormData.email,
          formType: 'Volunteer Application',
          customMessage: `
            <p style="color: #374151; margin: 0 0 15px;">
              Thank you for your interest in volunteering with Femtrics! We have received your application for the <strong>${volunteerFormData.position}</strong> position.
            </p>
            <div style="background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h4 style="color: #0369a1; margin: 0 0 10px;">Application Details:</h4>
              <ul style="color: #0369a1; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 5px;">Position: ${volunteerFormData.position}</li>
                <li style="margin-bottom: 5px;">Availability: ${volunteerFormData.availabilityHours}</li>
                <li style="margin-bottom: 5px;">Skills: ${Object.entries(volunteerFormData.skillsRating).map(([key, value]) => `${key}: ${value}/5`).join(', ')}</li>
              </ul>
            </div>
            <p style="color: #374151; margin: 15px 0 0;">
              Our team will review your application and contact you within 3-5 business days for the next steps.
            </p>
          `
        });

        // Show success alert
        setShowEmailAlert(true);
        setVolunteerSubmitStatus('success');

        // Reset form
        setVolunteerFormData({
          fullName: '',
          phone: '',
          email: '',
          position: '',
          experience: '',
          otherCommitments: '',
          evidence: null,
          whyJoin: '',
          availabilityHours: '',
          skillsRating: {
            technical: 3,
            communication: 3,
            teamwork: 3,
            leadership: 3,
            creativity: 3
          },
          isHighSchoolStudent: false,
          grade: '',
          schoolName: '',
          futureGoals: '',
          parentContact: ''
        });
      } else {
        console.error('Failed to send volunteer form');
        setVolunteerSubmitStatus('error');
      }

    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      setVolunteerSubmitStatus('error');
    }
  };

  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartnerFormData({
      ...partnerFormData,
      [name]: value
    });
    if (emailErrors[name as keyof typeof emailErrors]) {
      setEmailErrors({
        ...emailErrors,
        [name]: undefined
      });
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: typeof emailErrors = {};

    if (!partnerFormData.orgName.trim()) newErrors.name = 'Organization name is required';
    if (!partnerFormData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partnerFormData.email)) newErrors.email = 'Invalid email';
    if (!partnerFormData.isNGO) newErrors.businessType = 'Please answer if you are an NGO';
    if (!partnerFormData.isHumanitarian) newErrors.primaryGoal = 'Please answer the humanitarian focus question';
    if (!partnerFormData.needsSupport) newErrors.experience = 'Please answer the support question';
    if (!partnerFormData.hasExperience) newErrors.availabilityHours = 'Please answer the experience question';

    if (Object.keys(newErrors).length > 0) {
      setEmailErrors(newErrors);
      return;
    }

    try {
      const emailData = createPartnerEmail(partnerFormData);
      const success = await sendEmailWithGmailSMTP(emailData);

      if (success) {
        await sendConfirmationEmail({
          name: partnerFormData.orgName,
          email: partnerFormData.email,
          formType: 'Partnership Preliminary Application',
          customMessage: `
            <p style="color: #374151; margin: 0 0 15px;">
              Thank you for your interest! This brief questionnaire helps the Femtrics team understand whether your organization leads core partnership criteria.
            </p>
            <p style="color: #374151; margin: 15px 0 0;">
              If your organization fits our mandate, you will receive a link to our full partnership application within 3-5 business days.
            </p>
          `
        });

        setPartnerSubmitStatus('success');
        setShowEmailAlert(true);
        setPartnerFormData({
          orgName: '',
          email: '',
          isNGO: '',
          isHumanitarian: '',
          needsSupport: '',
          hasExperience: ''
        });
      } else {
        setPartnerSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting partner form:', error);
      setPartnerSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Join Femtrics - Partner with Us for Women Entrepreneur Empowerment"
        description="Join Femtrics as a volunteer, partner, or supporter. Help us empower women entrepreneurs across India through data analytics and business insights. Multiple ways to contribute."
        keywords="join Femtrics, women empowerment volunteer, partner with Femtrics, support women entrepreneurs India, social impact India, NGO partnerships, volunteer opportunities"
        canonical="/join"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "JoinPage",
            "@id": "https://femtrics.com/#join-page",
            "name": "Join Femtrics",
            "description": "Join Femtrics to support women entrepreneurs through data analytics and business insights.",
            "url": "https://femtrics.com/join",
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
      <section className="pt-40 pb-24 hero-bg">
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
                  className={`px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === "business"
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
                  className={`px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === "volunteer"
                    ? "bg-card shadow-lg text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    {t("join.volunteerTab")}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("partner")}
                  className={`px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === "partner"
                    ? "bg-card shadow-lg text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Partner With Us
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
                    {t("join.growBusiness")}
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {t("join.join100")}
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
                        Based in our service cities (Hyderabad, Delhi, Mumbai, Bangalore, Chennai, Pune)
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
                        <label className="block text-sm font-medium mb-2">Full name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={businessFormData.fullName}
                          onChange={handleBusinessChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.name
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="Enter your full name"
                        />
                        {emailErrors.name && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Business name *</label>
                        <input
                          type="text"
                          name="businessName"
                          value={businessFormData.businessName}
                          onChange={handleBusinessChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.businessName
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="Enter your business name"
                        />
                        {emailErrors.businessName && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.businessName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Phone number (WhatsApp preferred) *</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={businessFormData.phoneNumber}
                          onChange={handleBusinessChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.phone
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="Enter your phone number"
                        />
                        {emailErrors.phone && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Email ID *</label>
                        <input
                          type="email"
                          name="email"
                          value={businessFormData.email}
                          onChange={handleBusinessChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.email
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="Enter your email address"
                        />
                        {emailErrors.email && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Instagram ID link</label>
                        <input
                          type="text"
                          name="instagramId"
                          value={businessFormData.instagramId}
                          onChange={handleBusinessChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="https://instagram.com/yourbusiness"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Business type *</label>
                        <select
                          name="businessType"
                          value={businessFormData.businessType}
                          onChange={handleBusinessChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.businessType
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                        >
                          <option value="">Select business type</option>
                          <option value="tiffin">Tiffin</option>
                          <option value="baker">Baker</option>
                          <option value="boutique">Boutique</option>
                          <option value="tutor">Tutor</option>
                          <option value="beauty">Beauty</option>
                          <option value="crafts">Crafts</option>
                          <option value="other">Other (specify)</option>
                        </select>
                        {emailErrors.businessType && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.businessType}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Primary goal *</label>
                        <select
                          name="primaryGoal"
                          value={businessFormData.primaryGoal}
                          onChange={handleBusinessChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.primaryGoal
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                        >
                          <option value="">Select your primary goal</option>
                          <option value="increase sales">Increase sales</option>
                          <option value="reduce waste">Reduce waste</option>
                          <option value="get more customers">Get more customers</option>
                        </select>
                        {emailErrors.primaryGoal && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.primaryGoal}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="whatsappOptIn"
                          name="whatsappOptIn"
                          checked={businessFormData.whatsappOptIn}
                          onChange={(e) => handleBusinessChange({
                            target: { name: 'whatsappOptIn', value: e.target.checked }
                          } as any)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="whatsappOptIn" className="text-sm leading-none cursor-pointer">
                          Opt-in for WhatsApp updates
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                      >
                        Continue
                      </Button>
                    </form>
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
                    {t("join.makeDifference")}
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {t("join.useSkills")}
                  </p>

                  <div className="space-y-6 mb-8">
                    <h3 className="font-semibold text-lg">{t("join.volunteerRoles")}</h3>
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
                    <h4 className="font-semibold mb-3">{t("join.whatVolunteerGets")}</h4>
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
                      <span className="font-medium">{t("join.timeCommitment")}</span> {t("join.flexibleHours")}
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2}>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 card-elevated">
                    <h3 className="font-display text-2xl font-semibold mb-6">{t("join.volunteerApplication")}</h3>
                    <form onSubmit={handleVolunteerSubmit} className="space-y-5">
                      {volunteerSubmitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 text-red-700">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">Failed to submit application. Please check your connection or try again later.</span>
                          </div>
                        </div>
                      )}
                      {/* Basic Information */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Full name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={volunteerFormData.fullName}
                          onChange={handleVolunteerChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.name
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="Enter your full name"
                        />
                        {emailErrors.name && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={volunteerFormData.phone}
                          onChange={handleVolunteerChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.phone
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="Enter your phone number"
                        />
                        {emailErrors.phone && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={volunteerFormData.email}
                          onChange={handleVolunteerChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.email
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="Enter your email address"
                        />
                        {emailErrors.email && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Position Selection */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Which position applying for *</label>
                        <select
                          name="position"
                          value={volunteerFormData.position}
                          onChange={handleVolunteerChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.position
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                        >
                          <option value="">Select a position</option>
                          <option value="Data Associate">Data Associate</option>
                          <option value="Designer">Designer</option>
                          <option value="Outreach">Outreach</option>
                          <option value="Operations">Operations</option>
                        </select>
                        {emailErrors.position && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.position}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Experience *</label>
                        <textarea
                          name="experience"
                          value={volunteerFormData.experience}
                          onChange={handleVolunteerChange}
                          required
                          rows={3}
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.experience
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="Describe your relevant experience"
                        />
                        {emailErrors.experience && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.experience}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Other commitments</label>
                        <textarea
                          name="otherCommitments"
                          value={volunteerFormData.otherCommitments}
                          onChange={handleVolunteerChange}
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Any other commitments or time constraints"
                        />
                      </div>

                      {/* Evidence Upload */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Evidence upload (certificates, samples, dashboards, IG profiles)</label>
                        <div className="relative">
                          <input
                            name="evidence"
                            type="file"
                            onChange={handleVolunteerChange}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                          />
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Upload className="w-3 h-3" />
                            <span>Upload certificates, work samples, dashboards, or IG profiles</span>
                          </div>
                        </div>
                      </div>

                      {/* Why Join */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Why do you want to join Femtrics? *</label>
                        <textarea
                          name="whyJoin"
                          value={volunteerFormData.whyJoin}
                          onChange={handleVolunteerChange}
                          required
                          rows={3}
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.whyJoin
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="Tell us why you're interested in joining Femtrics"
                        />
                        {emailErrors.whyJoin && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.whyJoin}
                          </p>
                        )}
                      </div>

                      {/* Availability Hours */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Availability hours *</label>
                        <input
                          type="text"
                          name="availabilityHours"
                          value={volunteerFormData.availabilityHours}
                          onChange={handleVolunteerChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${emailErrors.availabilityHours
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-border focus:ring-primary/30'
                            }`}
                          placeholder="e.g., 10 hours per week, weekends only"
                        />
                        {emailErrors.availabilityHours && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {emailErrors.availabilityHours}
                          </p>
                        )}
                      </div>

                      {/* Skills Rating */}
                      <div>
                        <label className="block text-sm font-medium mb-3">Skills self-rating (1–5)</label>
                        <div className="space-y-3">
                          {[
                            { key: 'technical', label: 'Technical Skills' },
                            { key: 'communication', label: 'Communication' },
                            { key: 'teamwork', label: 'Teamwork' },
                            { key: 'leadership', label: 'Leadership' },
                            { key: 'creativity', label: 'Creativity' }
                          ].map((skill) => (
                            <div key={skill.key} className="flex items-center justify-between">
                              <span className="text-sm font-medium">{skill.label}</span>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <div key={rating} className="flex items-center">
                                    <input
                                      type="radio"
                                      id={`${skill.key}-${rating}`}
                                      name={`skillsRating.${skill.key}`}
                                      value={rating}
                                      checked={volunteerFormData.skillsRating[skill.key as keyof typeof volunteerFormData.skillsRating] === rating}
                                      onChange={handleVolunteerChange}
                                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <label htmlFor={`${skill.key}-${rating}`} className="text-xs text-muted-foreground cursor-pointer ml-1">
                                      {rating}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* High School Student Checkbox */}
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="isHighSchoolStudent"
                          name="isHighSchoolStudent"
                          checked={volunteerFormData.isHighSchoolStudent}
                          onChange={handleVolunteerChange}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="isHighSchoolStudent" className="text-sm leading-none cursor-pointer">
                          I am a high school student
                        </label>
                      </div>

                      {/* High School Student Extra Fields */}
                      {volunteerFormData.isHighSchoolStudent && (
                        <div className="space-y-4 p-4 bg-pink-50 rounded-xl border border-pink-200">
                          <h4 className="font-semibold text-sm text-pink-900 mb-3">High School Student Information</h4>

                          <div>
                            <label className="block text-sm font-medium mb-2">Grade *</label>
                            <input
                              type="text"
                              name="grade"
                              value={volunteerFormData.grade}
                              onChange={handleVolunteerChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                              placeholder="e.g., 10th Grade, 12th Grade"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">School name *</label>
                            <input
                              type="text"
                              name="schoolName"
                              value={volunteerFormData.schoolName}
                              onChange={handleVolunteerChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                              placeholder="Enter your school name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Why this fits your future goals *</label>
                            <textarea
                              name="futureGoals"
                              value={volunteerFormData.futureGoals}
                              onChange={handleVolunteerChange}
                              required
                              rows={3}
                              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                              placeholder="How does volunteering at Femtrics align with your future goals?"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Parent contact (optional)</label>
                            <input
                              type="text"
                              name="parentContact"
                              value={volunteerFormData.parentContact}
                              onChange={handleVolunteerChange}
                              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                              placeholder="Parent email or phone number"
                            />
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                      >
                        Submit
                      </Button>
                    </form>
                  </div>
                </AnimatedSection>
              </div>
            </motion.div>
          )}

          {/* Partner Application */}
          {activeTab === "partner" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-12">
                <AnimatedSection direction="left">
                  <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                    Partner With Femtrics
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Collaborate with us to create sustainable impact. We work with NGOs, educational institutions, government bodies, and corporations to empower women entrepreneurs through data and design.
                  </p>

                  <div className="space-y-6 mb-8">
                    <p className="font-medium text-lg">Why Partner With Us?</p>
                    {[
                      "Data-Driven Impact: Measure and visualize real outcomes.",
                      "Grassroots Reach: Direct access to micro-entrepreneurs.",
                      "Scalable Solutions: Technology-led interventions.",
                      "Custom Workshops: Tailored training programs."
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 bg-primary/10 p-1 rounded-full">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2}>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 card-elevated">
                    <h3 className="font-display text-2xl font-semibold mb-6">Preliminary Application Questions</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Thank you for your interest! This brief questionnaire helps the Femtrics team understand whether your organization meets core partnership criteria. If your organization fits our mandate, you will receive a link to our full partnership application.
                    </p>
                    <form onSubmit={handlePartnerSubmit} className="space-y-6">
                      {partnerSubmitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 text-red-700">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">Failed to submit inquiry. Please try again.</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-2">What is your organization's legally registered name? *</label>
                        <input
                          type="text"
                          name="orgName"
                          value={partnerFormData.orgName}
                          onChange={handlePartnerChange}
                          required
                          maxLength={255}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Your answer"
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-right">{partnerFormData.orgName.length}/255</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">What's your email address? *</label>
                        <input
                          type="email"
                          name="email"
                          value={partnerFormData.email}
                          onChange={handlePartnerChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Your answer"
                        />
                      </div>

                      {[
                        {
                          key: 'isNGO',
                          question: "Is your organization a non-governmental organization (NGO)? *"
                        },
                        {
                          key: 'isHumanitarian',
                          question: "Does your organization have a focus on serving urgent humanitarian needs? *",
                          desc: "i.e. those arising from natural and climate-related disasters, conflicts, complex crises, and/or health emergencies (disease outbreaks, epidemics, pandemics)"
                        },
                        {
                          key: 'needsSupport',
                          question: "Do you need support from Femtrics for your programs? *"
                        },
                        {
                          key: 'hasExperience',
                          question: "Does your organization have at least 2 years of operational experience? *"
                        }
                      ].map((item) => (
                        <div key={item.key}>
                          <label className="block text-sm font-medium mb-2">{item.question}</label>
                          {item.desc && <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.desc}</p>}
                          <div className="space-y-2">
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-secondary/30 transition-colors">
                              <input
                                type="radio"
                                name={item.key}
                                value="no"
                                checked={partnerFormData[item.key as keyof typeof partnerFormData] === 'no'}
                                onChange={handlePartnerChange}
                                className="w-4 h-4 text-primary focus:ring-primary"
                              />
                              <span className="text-sm">No</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-secondary/30 transition-colors">
                              <input
                                type="radio"
                                name={item.key}
                                value="yes"
                                checked={partnerFormData[item.key as keyof typeof partnerFormData] === 'yes'}
                                onChange={handlePartnerChange}
                                className="w-4 h-4 text-primary focus:ring-primary"
                              />
                              <span className="text-sm">Yes</span>
                            </label>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                      >
                        Submit
                      </Button>

                    </form>
                  </div>
                </AnimatedSection>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />

      {/* Success Alert */}
      <AlertDialog open={showEmailAlert} onOpenChange={setShowEmailAlert}>
        <AlertDialogContent className="!max-w-[425px]" style={{ maxWidth: '425px', width: '100%' }}>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Thank You!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for your submission! We have received your information and will be in touch soon.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowEmailAlert(false)}>
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Join;