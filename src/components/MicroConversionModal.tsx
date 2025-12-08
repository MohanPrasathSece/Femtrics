import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/contexts/TranslationContext";
import { isValidPhoneNumber } from "@/lib/emailValidation";
import { useEmailService } from "@/hooks/useEmailService";

interface MicroConversionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: MicroConversionData) => void;
}

export interface MicroConversionData {
  fullName: string;
  businessName: string;
  businessEmail: string;
  phoneNumber: string;
  businessType: string;
  primaryGoal: string;
  whatsappOptIn: boolean;
}

const businessTypes = [
  "Tiffin",
  "Baker",
  "Boutique",
  "Tutor",
  "Beauty",
  "Crafts",
  "Other",
];

const primaryGoals = [
  "increase sales",
  "reduce waste",
  "get more customers",
];

export const MicroConversionModal = ({
  open,
  onOpenChange,
  onSuccess,
}: MicroConversionModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<MicroConversionData>({
    fullName: "",
    businessName: "",
    businessEmail: "",
    phoneNumber: "",
    businessType: "",
    primaryGoal: "",
    whatsappOptIn: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [otherBusinessType, setOtherBusinessType] = useState("");
  const { sendEmail } = useEmailService();

  const handleChange = (
    field: keyof MicroConversionData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("form.fullName") + " " + t("form.required");
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = t("form.businessName") + " " + t("form.required");
    }
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = t("form.email") + " " + t("form.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = t("form.validEmailError");
    }
    if (!formData.phoneNumber || !isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = t("form.validPhoneError");
    }
    if (!formData.businessType) {
      newErrors.businessType = t("form.businessType") + " " + t("form.required");
    }
    if (!formData.primaryGoal) {
      newErrors.primaryGoal = t("form.primaryGoal") + " " + t("form.required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      // Send email notification
      const finalBusinessType = formData.businessType === "other" 
        ? otherBusinessType || "Other" 
        : formData.businessType;
      
      await sendEmail({
        name: formData.fullName,
        email: formData.businessEmail,
        phone: formData.phoneNumber,
        businessType: `${finalBusinessType} - Goal: ${formData.primaryGoal}`,
        message: `Business Name: ${formData.businessName}\nBusiness Email: ${formData.businessEmail}\nWhatsApp Opt-in: ${formData.whatsappOptIn ? "Yes" : "No"}`,
        formType: "Micro-Conversion CTA",
      });
      
      setIsSubmitting(false);
      setShowSuccess(true);
      onSuccess({
        ...formData,
        businessType: finalBusinessType,
      });
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
        // Reset form
        setFormData({
          fullName: "",
          businessName: "",
          businessEmail: "",
          phoneNumber: "",
          businessType: "",
          primaryGoal: "",
          whatsappOptIn: true,
        });
        setOtherBusinessType("");
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting micro-conversion:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t("microConversion.title")}
          </DialogTitle>
          <DialogDescription>
            {t("microConversion.description")}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <DialogTitle className="text-xl font-semibold mb-2">
                {t("microConversion.successTitle")}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {t("microConversion.successMessage")}
              </DialogDescription>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="fullName">
                  {t("form.fullName")} *
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder={t("form.enterFullName")}
                  className={errors.fullName ? "border-red-300" : ""}
                />
                {errors.fullName && (
                  <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="businessName">
                  {t("form.businessName")} *
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  placeholder={t("form.enterBusinessName")}
                  className={errors.businessName ? "border-red-300" : ""}
                />
                {errors.businessName && (
                  <p className="text-red-600 text-xs mt-1">{errors.businessName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="businessEmail">
                  {t("form.email")} (Business) *
                </Label>
                <Input
                  id="businessEmail"
                  type="email"
                  value={formData.businessEmail}
                  onChange={(e) => handleChange("businessEmail", e.target.value)}
                  placeholder={t("form.enterEmail")}
                  className={errors.businessEmail ? "border-red-300" : ""}
                />
                {errors.businessEmail && (
                  <p className="text-red-600 text-xs mt-1">{errors.businessEmail}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phoneNumber">
                  {t("form.phoneNumber")} (WhatsApp) *
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  placeholder={t("form.enterPhone")}
                  className={errors.phoneNumber ? "border-red-300" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {t("microConversion.whatsappNote")}
                </p>
              </div>

              <div>
                <Label htmlFor="businessType">
                  {t("form.businessType")} *
                </Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => handleChange("businessType", value)}
                >
                  <SelectTrigger className={errors.businessType ? "border-red-300" : ""}>
                    <SelectValue placeholder={t("form.selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.businessType && (
                  <p className="text-red-600 text-xs mt-1">{errors.businessType}</p>
                )}
                {formData.businessType === "other" && (
                  <Input
                    className="mt-2"
                    placeholder={t("microConversion.pleaseSpecify")}
                    value={otherBusinessType}
                    onChange={(e) => setOtherBusinessType(e.target.value)}
                  />
                )}
              </div>

              <div>
                <Label htmlFor="primaryGoal">
                  {t("form.primaryGoal")} *
                </Label>
                <Select
                  value={formData.primaryGoal}
                  onValueChange={(value) => handleChange("primaryGoal", value)}
                >
                  <SelectTrigger className={errors.primaryGoal ? "border-red-300" : ""}>
                    <SelectValue placeholder={t("microConversion.selectGoal")} />
                  </SelectTrigger>
                  <SelectContent>
                    {primaryGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {t(`microConversion.goal.${goal}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.primaryGoal && (
                  <p className="text-red-600 text-xs mt-1">{errors.primaryGoal}</p>
                )}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="whatsappOptIn"
                  checked={formData.whatsappOptIn}
                  onCheckedChange={(checked) =>
                    handleChange("whatsappOptIn", checked === true)
                  }
                />
                <Label
                  htmlFor="whatsappOptIn"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {t("microConversion.whatsappOptIn")}
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("microConversion.submitting") : t("microConversion.submit")}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

