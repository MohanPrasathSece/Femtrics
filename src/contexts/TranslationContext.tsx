import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "te";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    te: string;
  };
}

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", hi: "होम", te: "హోమ్" },
  "nav.about": { en: "About", hi: "के बारे में", te: "గురించి" },
  "nav.dashboard": { en: "Dashboard", hi: "डैशबोर्ड", te: "డాష్‌బోర్డ్" },
  "nav.workshops": { en: "Workshops", hi: "कार्यशालाएं", te: "వర్క్‌షాప్‌లు" },
  "nav.join": { en: "Join Us", hi: "हमसे जुड़ें", te: "మాతో చేరండి" },
  "nav.contact": { en: "Contact", hi: "संपर्क", te: "సంప్రదించండి" },
  "nav.getStarted": { en: "Get Started", hi: "शुरू करें", te: "ప్రారంభించండి" },
  
  // Hero Section
  "hero.tagline": { en: "A Business-Analytics Social Enterprise", hi: "एक व्यापार-विश्लेषण सामाजिक उद्यम", te: "ఒక వ్యాపార-విశ్లేషణ సామాజిక సంస్థ" },
  "hero.title": { en: "Where women lead with data, not guesswork.", hi: "जहां महिलाएं अनुमान नहीं, डेटा के साथ आगे बढ़ती हैं।", te: "మహిళలు ఊహాజనితంగా కాకుండా, డేటాతో నడిచే చోట." },
  "hero.description": { en: "Femtrics provides affordable, simple, and actionable business analytics to women micro-entrepreneurs so they can grow revenue, reduce waste, and make data-driven decisions.", hi: "फेमट्रिक्स महिला सूक्ष्म-उद्यमियों को सस्ती, सरल और व्यावहारिक व्यापार विश्लेषण प्रदान करता है ताकि वे राजस्व बढ़ा सकें, अपव्यय कम कर सकें और डेटा-आधारित निर्णय ले सकें।", te: "ఫెమ్ట్రిక్స్ మహిళా సూక్ష్మ-వ్యాపారులకు సరసమైన, సరళమైన మరియు చర్యాత్మక వ్యాపార విశ్లేషణను అందిస్తుంది, తద్వారా వారు ఆదాయాన్ని పెంచుకోవచ్చు, వృథా తగ్గించవచ్చు మరియు డేటా-ఆధారిత నిర్ణయాలు తీసుకోవచ్చు." },
  "hero.apply": { en: "Apply Your Business", hi: "अपना व्यवसाय आवेदन करें", te: "మీ వ్యాపారాన్ని దరఖాస్తు చేయండి" },
  "hero.learnMore": { en: "Learn More", hi: "अधिक जानें", te: "మరింత తెలుసుకోండి" },
  "hero.free": { en: "100% Free for Eligible Businesses", hi: "पात्र व्यवसायों के लिए 100% निःशुल्क", te: "అర్హత ఉన్న వ్యాపారాల కోసం 100% ఉచితం" },
  "hero.noTech": { en: "No Technical Skills Required", hi: "तकनीकी कौशल की आवश्यकता नहीं", te: "సాంకేతిక నైపుణ్యాలు అవసరం లేదు" },
  
  // Footer
  "footer.subscribe": { en: "Subscribe to Our Newsletter", hi: "हमारे न्यूज़लेटर की सदस्यता लें", te: "మా న్యూస్‌లెటర్‌కు సభ్యత్వం పొందండి" },
  "footer.email": { en: "Your Email", hi: "आपका ईमेल", te: "మీ ఇమెయిల్" },
  "footer.copyright": { en: "Copyright © 2024 - Femtrics", hi: "कॉपीराइट © 2024 - फेमट्रिक्स", te: "కాపీరైట్ © 2024 - ఫెమ్ట్రిక్స్" },
  "footer.quickLinks": { en: "Quick Links", hi: "त्वरित लिंक", te: "త్వరిత లింకులు" },
  "footer.contact": { en: "Contact", hi: "संपर्क", te: "సంప్రదించండి" },
  "footer.resources": { en: "Resources", hi: "संसाधन", te: "వనరులు" },
  "footer.tagline": { en: "Empowering women micro-entrepreneurs with data-driven insights for sustainable business growth.", hi: "टिकाऊ व्यवसाय वृद्धि के लिए डेटा-चालित अंतर्दृष्टियों के साथ महिला सूक्ष्म-उद्यमियों को सशक्त बनाना।", te: "స్థిరమైన వ్యాపార వృద్ధికి డేటా ఆధారిత అంతర్దృష్టులతో మహిళా సూక్ష్మవ్యాపారులను సాధికారితం చేస్తాము." },
  "footer.caseStudies": { en: "Case Studies", hi: "केस स्टडीज़", te: "కేస్ స్టడీలు" },
  "footer.blog": { en: "Blog", hi: "ब्लॉग", te: "బ్లాగ్" },
  "footer.faq": { en: "FAQ", hi: "अक्सर पूछे जाने वाले प्रश्न", te: "తరచుగా అడిగే ప్రశ్నలు" },
  "footer.support": { en: "Support", hi: "समर्थन", te: "మద్దతు" },
  "footer.location": { en: "Hyderabad, India", hi: "हैदराबाद, भारत", te: "హైదరాబాదు, భారత్" },
  
  // Common
  "common.whoWeServe": { en: "Who We Serve", hi: "हम किसकी सेवा करते हैं", te: "మేము ఎవరికి సేవ చేస్తాము" },
  "common.womenMicroEntrepreneurs": { en: "Women Micro-Entrepreneurs", hi: "महिला सूक्ष्म-उद्यमी", te: "మహిళా సూక్ష్మ-వ్యాపారులు" },
  "common.ourSolutions": { en: "Our Solutions", hi: "हमारे समाधान", te: "మా పరిష్కారాలు" },
  "common.ourReach": { en: "Our Reach", hi: "हमारी पहुंच", te: "మా పరిధి" },
  "common.ourJourney": { en: "Our Journey", te: "మా ప్రయాణం", hi: "हमारी यात्रा" },
  "common.ourGoals": { en: "Our Goals", hi: "हमारे लक्ष्य", te: "మా లక్ష్యాలు" },
  "common.analyticsThatWork": { en: "Analytics That Work For You", hi: "आपके लिए काम करने वाला विश्लेषण", te: "మీ కోసం పని చేసే విశ్లేషణ" },
  "common.simpleAffordable": { en: "Simple, affordable, and actionable analytics solutions designed for micro-entrepreneurs", hi: "सूक्ष्म-उद्यमियों के लिए डिज़ाइन किए गए सरल, सस्ती और व्यावहारिक विश्लेषण समाधान", te: "సూక్ష్మ-వ్యాపారుల కోసం రూపొందించబడిన సరళమైన, సరసమైన మరియు చర్యాత్మక విశ్లేషణ పరిష్కారాలు" },
  "common.womenOnboarded": { en: "Women onboarded", hi: "महिलाएं शामिल हुईं", te: "మహిళలు చేరారు" },
  "common.revenueImprovement": { en: "Revenue improvement", hi: "राजस्व में सुधार", te: "ఆదాయ మెరుగుదల" },
  "common.inventoryWasteReduction": { en: "Inventory waste reduction", hi: "इन्वेंटरी अपव्यय में कमी", te: "ఇన్వెంటరీ వృథా తగ్గింపు" },
  "common.dashboardsDeployed": { en: "Dashboards deployed", hi: "डैशबोर्ड तैनात", te: "డాష్‌బోర్డ్‌లు అమలు చేయబడ్డాయి" },
  "common.forecastingModels": { en: "Forecasting models used monthly", hi: "मासिक उपयोग किए गए पूर्वानुमान मॉडल", te: "నెలవారీగా ఉపయోగించే ఫోర్కాస్టింగ్ మోడల్‌లు" },
  "common.participantsTrained": { en: "Participants trained", hi: "प्रशिक्षित प्रतिभागी", te: "ప్రశిక్షణ పొందిన పాల్గొనేవారు" },
  "common.ngoPartnerships": { en: "NGO partnerships", hi: "एनजीओ साझेदारी", te: "ఎన్‌జీఓ భాగస్వామ్యాలు" },
  "common.newspaperFeatures": { en: "Newspaper features", hi: "अखबार की सुविधाएं", te: "వార్తాపత్రిక లక్షణాలు" },
  "common.impactTargets": { en: "6-12 Month Impact Targets", hi: "6-12 महीने के प्रभाव लक्ष्य", te: "6-12 నెలల ప్రభావ లక్ష్యాలు" },
  "common.readyToJoin": { en: "Ready to join our mission?", hi: "हमारे मिशन में शामिल होने के लिए तैयार हैं?", te: "మా మిషన్‌లో చేరడానికి సిద్ధంగా ఉన్నారా?" },
  "common.joinMissionDesc": { en: "Whether you're a woman entrepreneur looking to grow your business or someone who wants to make a difference, we'd love to hear from you.", hi: "चाहे आप अपने व्यवसाय को बढ़ाना चाहने वाली महिला उद्यमी हों या कोई व्यक्ति जो बदलाव लाना चाहता हो, हम आपसे सुनना पसंद करेंगे।", te: "మీరు మీ వ్యాపారాన్ని పెంచడానికి చూస్తున్న మహిళా వ్యాపారవేత్త అయినా లేదా తేడా తీసుకురావాలనుకునే వ్యక్తి అయినా, మేము మీ నుండి వినడానికి ఇష్టపడతాము." },
  "common.becomeVolunteer": { en: "Become a Volunteer", hi: "स्वयंसेवक बनें", te: "స్వచ్ఛందంగా చేరండి" },
  "common.businessTypes": { en: "Business Types We Support", hi: "हम जिन व्यवसायों का समर्थन करते हैं", te: "మేము మద్దతు ఇచ్చే వ్యాపార రకాలు" },
  "common.challenges": { en: "Common Challenges We Solve", hi: "हम जिन सामान्य चुनौतियों का समाधान करते हैं", te: "మేము పరిష్కరించే సాధారణ సవాళ్లు" },
  "common.fillsGap": { en: "Femtrics fills this exact gap.", hi: "फेमट्रिक्स इसी अंतर को भरता है।", te: "ఫెమ్ట్రిక్స్ ఈ ఖాళీని పూరించుతుంది." },
  "common.analyticsWork": { en: "Analytics That Work For You", hi: "आपके लिए काम करने वाला विश्लेषण", te: "మీ కోసం పని చేసే విశ్లేషణ" },
  "common.journeyAhead": { en: "The Journey Ahead", hi: "आगे की यात्रा", te: "ముందుకు ప్రయాణం" },
  "common.workshopPrograms": { en: "Our Workshop Programs", hi: "हमारे कार्यशाला कार्यक्रम", te: "మా వర్క్‌షాప్ కార్యక్రమాలు" },
  "common.practicalSessions": { en: "Practical, jargon-free sessions that you can apply immediately", hi: "व्यावहारिक, जार्गन-मुक्त सत्र जिन्हें आप तुरंत लागू कर सकते हैं", te: "వ్యావహారిక, పరిభాష-రహిత సెషన్‌లు మీరు వెంటనే వర్తింపజేయవచ్చు" },
  "common.whatYouLearn": { en: "What you'll learn:", hi: "आप क्या सीखेंगे:", te: "మీరు ఏమి నేర్చుకుంటారు:" },
  "common.upcomingWorkshops": { en: "Upcoming Workshops", hi: "आगामी कार्यशालाएं", te: "రాబోయే వర్క్‌షాప్‌లు" },
  "common.schedule": { en: "Schedule", hi: "अनुसूची", te: "షెడ్యూల్" },

  // Index (Home)
  "index.whatDrivesUs": { en: "What Drives Us", hi: "हमें क्या प्रेरित करता है", te: "మాకు ప్రేరణ ఇచ్చేది" },
  "index.servingWomenHyd": { en: "Serving Women Across Hyderabad", hi: "हैदराबाद भर में महिलाओं की सेवा", te: "హైదరాబాద్ అంతటా మహిళలకు సేవ" },
  "index.primaryAreas": { en: "Primary Areas", hi: "प्रमुख क्षेत्र", te: "ప్రాధాన్య ప్రాంతాలు" },
  "index.partnerAreas": { en: "Partner Areas", hi: "भागीदार क्षेत्र", te: "భాగస్వామ్య ప్రాంతాలు" },
  "index.areasCovered": { en: "Areas Covered", hi: "कवरेज क्षेत्र", te: "కవర్ చేసిన ప్రాంతాలు" },
  "index.yearPlan": { en: "Year-Long Execution Plan", hi: "वर्षभर की कार्ययोजना", te: "ఏడాది పొడవు కార్యాచరణ ప్రణాళిక" },

  // Join
  "join.title": { en: "Be part of the change", hi: "परिवर्तन का हिस्सा बनें", te: "మార్పులో భాగం అవ్వండి" },
  "join.heroDesc": { en: "Whether you're a woman entrepreneur ready to grow your business or someone who wants to make a difference, there's a place for you at Femtrics.", hi: "चाहे आप अपना व्यवसाय बढ़ाने के लिए तैयार महिला उद्यमी हों या कोई जो बदलाव लाना चाहता हो, फेमट्रिक्स में आपके लिए जगह है।", te: "మీరు మీ వ్యాపారాన్ని పెంచడానికి సిద్ధమైన మహిళా వ్యాపారవేత్త అయినా, లేక తేడా తీసుకురావాలనుకునే వారు అయినా, ఫెమ్ట్రిక్స్‌లో మీకు స్థానం ఉంది." },
  "join.applyTab": { en: "Apply Your Business", hi: "अपना व्यवसाय आवेदन करें", te: "మీ వ్యాపారాన్ని దరఖాస్తు చేయండి" },
  "join.volunteerTab": { en: "Become a Volunteer", hi: "स्वयंसेवक बनें", te: "స్వచ్ఛందంగా చేరండి" },
  "join.whatYouGet": { en: "What you'll get", hi: "आपको क्या मिलेगा", te: "మీకు ఏమి లభిస్తుంది" },
  "join.eligibility": { en: "Eligibility", hi: "पात्रता", te: "అర్హత" },
  "join.businessApplication": { en: "Business Application", hi: "व्यवसाय आवेदन", te: "వ్యాపార దరఖాస్తు" },
  "join.volunteerApplication": { en: "Volunteer Application", hi: "स्वयंसेवक आवेदन", te: "స్వచ్ఛంద దరఖాస్తు" },
  "join.submitApplication": { en: "Submit Application", hi: "आवेदन जमा करें", te: "దరఖాస్తు పంపండి" },
  "join.weWillContact": { en: "We'll contact you within 48 hours to schedule an onboarding call.", hi: "हम 48 घंटों के भीतर आपसे ऑनबोर्डिंग कॉल शेड्यूल करने के लिए संपर्क करेंगे।", te: "ఆన్‌బోర్డింగ్ కాల్ షెడ్యూల్ చేయడానికి 48 గంటల్లో మేము మీతో సంప్రదిస్తాము." },
  "join.weWillReachOut": { en: "We'll reach out within a week to discuss next steps.", hi: "हम एक सप्ताह के भीतर अगले चरणों पर चर्चा करने के लिए आपसे संपर्क करेंगे।", te: "తదుపరి చర్యల గురించి చర్చించేందుకు మేము వారంలోపు మీను సంప్రదిస్తాము." },

  // Contact
  "contact.title": { en: "Let's connect", hi: "आइए जुड़ते हैं", te: "కలుద్దాం" },
  "contact.heroDesc": { en: "Have questions? Want to partner with us? We'd love to hear from you.", hi: "प्रश्न हैं? हमारे साथ साझेदारी करना चाहते हैं? हम आपसे सुनना पसंद करेंगे।", te: "సందేహాలున్నాయా? మాతో భాగస్వామ్యం చేయాలనుకుంటున్నారా? మేము మీ నుండి వినాలని కోరుకుంటున్నాము." },
  "contact.getInTouch": { en: "Get in touch", hi: "संपर्क करें", te: "మమ్మల్ని సంప్రదించండి" },
  "contact.preferWhatsapp": { en: "Prefer WhatsApp?", hi: "व्हाट्सएप पसंद है?", te: "వాట్సాప్ ఇష్టమా?" },
  "contact.chatOnWhatsapp": { en: "Chat on WhatsApp", hi: "व्हाट्सएप पर चैट करें", te: "వాట్సాప్‌లో చాట్ చేయండి" },
  "contact.sendEnquiry": { en: "Send Enquiry", hi: "प्रश्न भेजें", te: "విచారణ పంపండి" },
  "contact.backWithin": { en: "We'll get back to you within 24-48 hours.", hi: "हम 24-48 घंटों के भीतर आपसे संपर्क करेंगे।", te: "24-48 గంటలలో మిమ్మల్ని సంప్రదిస్తాము." },
  "contact.faq": { en: "FAQ", hi: "अक्सर पूछे जाने वाले प्रश्न", te: "తరచుగా అడిగే ప్రశ్నలు" },
  "contact.faqTitle": { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न", te: "తరచుగా అడిగే ప్రశ్నలు" },
  "contact.phone": { en: "Phone", hi: "फ़ोन", te: "ఫోన్" },
  "contact.email": { en: "Email", hi: "ईमेल", te: "ఈమెయిల్" },
  "contact.location": { en: "Location", hi: "स्थान", te: "ప్రాంతం" },
  "contact.workingHours": { en: "Working Hours", hi: "कार्य समय", te: "పని గంటలు" },

  // Dashboard
  "dashboard.tagline": { en: "Sample Dashboard", hi: "नमूना डैशबोर्ड", te: "నమూనా డాష్‌బోర్డ్" },
  "dashboard.title": { en: "Data that makes sense", hi: "डेटा जो समझ में आता है", te: "అర్థమయ్యే డేటా" },
  "dashboard.heroDesc": { en: "Our dashboards are designed to be simple, actionable, and easy to understand—no data science degree required.", hi: "हमारे डैशबोर्ड सरल, कार्रवाई योग्य और आसान समझ के लिए बनाए गए हैं—किसी डेटा साइंस डिग्री की आवश्यकता नहीं।", te: "మా డాష్‌బోర్డ్‌లు సరళంగా, అమలు చేయదగినట్లుగా మరియు సులభంగా అర్థమయ్యేలా రూపొందించబడ్డాయి—డేటా సైన్స్ డిగ్రీ అవసరం లేదు." },
  // already have 'What You Get' generic key? Use dashboard.whatYouGet
  "dashboard.whatYouGet": { en: "What You Get", hi: "आपको क्या मिलेगा", te: "మీకు లభించేవి" },
  "dashboard.ctaTitle": { en: "Ready to see your data?", hi: "क्या आप अपना डेटा देखने के लिए तैयार हैं?", te: "మీ డేటాను చూడడానికి సిద్ధంగా ఉన్నారా?" },
  "dashboard.ctaDesc": { en: "Join Femtrics today and get your personalized business dashboard", hi: "आज ही फेमट्रिक्स से जुड़ें और अपना पर्सनलाइज्ड बिजनेस डैशबोर्ड प्राप्त करें", te: "ఈరోజే ఫెమ్ట్రిక్స్‌లో చేరండి మరియు మీ వ్యక్తిగతీకరించిన బిజినెస్ డాష్‌బోర్డ్ పొందండి" },
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
};

