import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmailTerminal } from "@/components/EmailTerminal";
import { useEmailService } from "@/hooks/useEmailService";
import { useTranslation } from "@/contexts/TranslationContext";

const faqs = [
  {
    question: "Is Femtrics free to use?",
    answer: "Yes! Our basic analytics dashboard and all workshops are completely free for eligible women entrepreneurs. We're a social enterprise funded by grants and donations.",
  },
  {
    question: "What kind of businesses can join?",
    answer: "We work with all types of micro and small businesses—home bakers, boutique owners, tiffin services, mehndi artists, beauticians, tutors, craft sellers, and Instagram-based businesses. If you're a woman entrepreneur in Hyderabad, we'd love to hear from you.",
  },
  {
    question: "Do I need technical skills?",
    answer: "Not at all! Our dashboards and workshops are designed for entrepreneurs with no technical background. We make data simple and actionable. You just need a smartphone to access your dashboard.",
  },
  {
    question: "How does the onboarding process work?",
    answer: "After you submit your application, we'll contact you within 48 hours to schedule an onboarding call. During this call, we'll understand your business, collect basic data, and within a week, your personalized dashboard will be ready with a mini-audit summary.",
  },
  {
    question: "Can I become a volunteer?",
    answer: "Absolutely! We're always looking for data associates, designers, outreach leads, and operations support. Every volunteer receives bootcamp training, SOPs, and real client experience. Visit our Join Us page to apply.",
  },
  {
    question: "Which areas do you serve?",
    answer: "We primarily serve Jubilee Hills, Banjara Hills, Madhapur, Kondapur, Gachibowli, and HITEC City. We also work with NGO partners to reach women in Old City, Secunderabad, LB Nagar, and Kukatpally.",
  },
];

export const Contact = () => {
  const { t } = useTranslation();
  const { sendEmail, isLoading } = useEmailService();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await sendEmail({
      ...formData,
      formType: 'Contact Inquiry'
    });
    
    if (result.success) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EmailTerminal />

      {/* Hero */}
      <section className="pt-32 pb-20 hero-bg">
        <div className="container-tight">
          <AnimatedSection className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {t("nav.contact")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t("contact.heroDesc")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimatedSection direction="left">
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
                {t("contact.getInTouch")}
              </h2>

              <div className="space-y-6 mb-12">
                {[
                  {
                    icon: Phone,
                    label: t("contact.phone"),
                    value: "+91 98765 43210",
                    href: "tel:+919876543210",
                  },
                  {
                    icon: Mail,
                    label: t("contact.email"),
                    value: "hello@femtrics.org",
                    href: "mailto:hello@femtrics.org",
                  },
                  {
                    icon: MapPin,
                    label: t("contact.location"),
                    value: "Hyderabad, Telangana, India",
                    href: null,
                  },
                  {
                    icon: Clock,
                    label: t("contact.workingHours"),
                    value: "Mon - Sat, 9:00 AM - 6:00 PM",
                    href: null,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-primary/10 via-secondary to-accent/5 rounded-2xl p-6">
                <MessageSquare className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">
                  {t("contact.preferWhatsapp")}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Connect with us instantly on WhatsApp for quick queries and support. 
                  We prioritize phone-first communication!
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                    {t("contact.chatOnWhatsapp")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </AnimatedSection>

            {/* Contact Form / Enquiry Form */}
            <AnimatedSection direction="right" delay={0.2}>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 card-elevated">
                <h3 className="font-display text-2xl font-semibold mb-6">{t("contact.sendEnquiry")}</h3>
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      placeholder="Your full name"
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
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                      <option value="">Select subject</option>
                      <option value="business">Join as a Business</option>
                      <option value="volunteer">Volunteer Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="workshop">Workshop Request</option>
                      <option value="media">Media & Press</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" size="lg">
                    {t("contact.sendEnquiry")}
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
                <p className="text-muted-foreground text-xs mt-4 text-center">
                  {t("contact.backWithin")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              {t("contact.faq")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              {t("contact.faqTitle")}
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={faq.question} delay={index * 0.1}>
                <motion.details
                  className="bg-card rounded-2xl card-elevated group"
                >
                  <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-semibold">
                    <span className="pr-4">{faq.question}</span>
                    <motion.span
                      className="text-primary text-2xl font-light flex-shrink-0"
                    >
                      +
                    </motion.span>
                  </summary>
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;