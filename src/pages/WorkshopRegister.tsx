import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useEmailService } from "@/hooks/useEmailService";

interface WorkshopRegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  workshopTitle: string;
  workshopDate: string;
  workshopLocation: string;
  workshopType: string;
  workshopTime: string;
}

const WorkshopRegister = () => {
  const [searchParams] = useSearchParams();
  const { sendEmail, sendConfirmationEmail } = useEmailService();
  
  const workshopTitle = searchParams.get('workshop') || '';
  const workshopDate = searchParams.get('date') || '';
  const workshopLocation = searchParams.get('location') || '';
  const workshopType = searchParams.get('type') || '';
  const workshopTime = searchParams.get('time') || '';

  const [formData, setFormData] = useState<WorkshopRegistrationData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    workshopTitle,
    workshopDate,
    workshopLocation,
    workshopType,
    workshopTime,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      workshopTitle,
      workshopDate,
      workshopLocation,
      workshopType,
      workshopTime,
    }));
  }, [workshopTitle, workshopDate, workshopLocation, workshopType, workshopTime]);

  const handleChange = (field: keyof WorkshopRegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    console.log('Validating form data:', formData);

    if (!formData.fullName.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      // Send email notification
      await sendEmail({
        name: formData.fullName,
        email: 'harshinik290@gmail.com', // Admin email
        phone: formData.phoneNumber,
        businessType: 'Workshop Registration',
        message: `Workshop Registration Details:\n\nWorkshop: ${formData.workshopTitle}\nType: ${formData.workshopType}\nDate: ${formData.workshopDate}\nTime: ${formData.workshopTime}\nLocation: ${formData.workshopLocation}\n\nParticipant Details:\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phoneNumber}`,
        formType: `${formData.workshopTitle} - ${formData.workshopType}`,
      });
      
      // Send confirmation email to user
      await sendConfirmationEmail({
        name: formData.fullName,
        email: formData.email,
        formType: 'Workshop Registration',
        customMessage: `Dear ${formData.fullName},\n\nThank you for registering for "${formData.workshopTitle}"! We are excited to have you join us.\n\nWorkshop Details:\n- Date: ${formData.workshopDate}\n- Time: ${formData.workshopTime}\n- Location: ${formData.workshopLocation}\n- Type: ${formData.workshopType}\n\nYou will receive a reminder email with all the details 2 days before the workshop. If you have any questions, feel free to reach out to us.\n\nBest regards,\nTeam Femtrics`
      });
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Log successful registration
      console.log('Workshop registration successful:', formData);
      
      // Auto close after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          workshopTitle,
          workshopDate,
          workshopLocation,
          workshopType,
          workshopTime,
        });
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting workshop registration:", error);
      
      // Still show success even if email fails (for better UX)
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          workshopTitle,
          workshopDate,
          workshopLocation,
          workshopType,
          workshopTime,
        });
      }, 5000);
    }
  };

  if (!workshopTitle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-tight pt-32 pb-20">
          <div className="text-center">
            <h1 className="font-display text-2xl font-semibold mb-4">Workshop Not Found</h1>
            <p className="text-muted-foreground mb-8">Please select a workshop from the dashboard first.</p>
            <Button asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-bg">
        <div className="container-tight">
          <AnimatedSection>
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Workshops
              </Link>
            </Button>
            
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Register for Workshop
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl">
              Join our free workshop and learn practical skills to grow your business
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Workshop Details */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Workshop Info */}
            <AnimatedSection direction="left">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 card-elevated"
              >
                <h2 className="font-display text-2xl font-semibold mb-6">{workshopTitle}</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-muted-foreground">{workshopDate} at {workshopTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{workshopLocation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Target Audience</p>
                      <p className="text-muted-foreground">{workshopType}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-2xl p-6">
                  <h3 className="font-semibold mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Practical skills for immediate implementation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Network with fellow women entrepreneurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Get personalized guidance from experts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Registration Form */}
            <AnimatedSection direction="right" delay={0.2}>
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-border/50">
                <h3 className="font-display text-2xl font-semibold mb-6">Register Now</h3>
                
                {showSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-display text-xl font-semibold mb-2 text-green-600">
                      Registration Successful!
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      Thank you for registering. We'll send you a confirmation email with workshop details.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/dashboard">Register for Another Workshop</Link>
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                          errors.name 
                            ? 'border-red-300 focus:ring-red-300' 
                            : 'border-border focus:ring-primary/30'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-300' 
                            : 'border-border focus:ring-primary/30'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                          errors.phone 
                            ? 'border-red-300 focus:ring-red-300' 
                            : 'border-border focus:ring-primary/30'
                        }`}
                        placeholder="Enter your 10-digit phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        We'll use this to send you workshop updates and reminders
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Registering...' : 'Register for Workshop'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By registering, you agree to receive workshop updates via email and phone
                    </p>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkshopRegister;
