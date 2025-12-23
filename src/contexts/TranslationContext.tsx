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
  "footer.location": { en: "Hyderabad, Delhi, Mumbai, Bangalore", hi: "हैदराबाद, दिल्ली, मुंबई, बैंगलोर", te: "హైదరాబాద్, ఢిల్లీ, ముంబై, బెంగళూరు" },

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
  "index.servingWomenHyd": { en: "Serving Women Across India", hi: "पूरे भारत में महिलाओं की सेवा", te: "భారతదేశం అంతటా మహిళలకు సేవ" },
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

  // Form Fields
  "form.fullName": { en: "Full Name", hi: "पूरा नाम", te: "పూర్తి పేరు" },
  "form.phoneNumber": { en: "Phone Number", hi: "फ़ोन नंबर", te: "ఫోన్ నంబర్" },
  "form.businessEmail": { en: "Business Email", hi: "व्यवसाय ईमेल", te: "వ్యాపార ఇమెయిల్" },
  "form.whatsappNumber": { en: "WhatsApp Number", hi: "व्हाट्सएप नंबर", te: "వాట్సాప్ నంబర్" },
  "form.businessName": { en: "Business Name", hi: "व्यवसाय का नाम", te: "వ్యాపార పేరు" },
  "form.businessType": { en: "Business Type", hi: "व्यवसाय का प्रकार", te: "వ్యాపార రకం" },
  "form.location": { en: "Location (Area)", hi: "स्थान (क्षेत्र)", te: "ప్రాంతం (ఏరియా)" },
  "form.businessDuration": { en: "How long have you been in business?", hi: "आप कितने समय से व्यवसाय में हैं?", te: "మీరు ఎంతకాలం వ్యాపారంలో ఉన్నారు?" },
  "form.biggestChallenge": { en: "What's your biggest business challenge?", hi: "आपकी सबसे बड़ी व्यावसायिक चुनौती क्या है?", te: "మీ అతిపెద్ద వ్యాపార సవాలు ఏమిటి?" },
  "form.interestedRole": { en: "Interested Role", hi: "रुचि वाली भूमिका", te: "ఆసక్తి ఉన్న పాత్ర" },
  "form.yourSkills": { en: "Your Skills", hi: "आपके कौशल", te: "మీ నైపుణ్యాలు" },
  "form.availability": { en: "Availability", hi: "उपलब्धता", te: "లభ్యత" },
  "form.volunteerMotivation": { en: "Why do you want to volunteer with Femtrics?", hi: "आप फेमट्रिक्स के साथ स्वयंसेवक क्यों बनना चाहते हैं?", te: "మీరు ఫెమ్ట్రిక్స్‌తో స్వచ్ఛందంగా ఎందుకు చేరాలనుకుంటున్నారు?" },
  "form.name": { en: "Name", hi: "नाम", te: "పేరు" },
  "form.subject": { en: "Subject", hi: "विषय", te: "విషయం" },
  "form.message": { en: "Message", hi: "संदेश", te: "సందేశం" },
  "form.enterFullName": { en: "Enter your full name", hi: "अपना पूरा नाम दर्ज करें", te: "మీ పూర్తి పేరు నమోదు చేయండి" },
  "form.enterPhone": { en: "+91 98765 43210", hi: "+91 98765 43210", te: "+91 98765 43210" },
  "form.enterBusinessEmail": { en: "your@business.com", hi: "आपका@व्यवसाय.com", te: "మీ@వ్యాపారం.com" },
  "form.enterBusinessName": { en: "Your business name", hi: "आपके व्यवसाय का नाम", te: "మీ వ్యాపార పేరు" },
  "form.selectType": { en: "Select type", hi: "प्रकार चुनें", te: "రకం ఎంచుకోండి" },
  "form.selectRole": { en: "Select role", hi: "भूमिका चुनें", te: "పాత్ర ఎంచుకోండి" },
  "form.selectAvailability": { en: "Select availability", hi: "उपलब्धता चुनें", te: "లభ్యత ఎంచుకోండి" },
  "form.selectDuration": { en: "Select duration", hi: "अवधि चुनें", te: "వ్యవధి ఎంచుకోండి" },
  "form.selectSubject": { en: "Select subject", hi: "विषय चुनें", te: "విషయం ఎంచుకోండి" },
  "form.tellChallenges": { en: "Tell us about your challenges...", hi: "अपनी चुनौतियों के बारे में बताएं...", te: "మీ సవాళ్ల గురించి మాకు చెప్పండి..." },
  "form.tellMotivation": { en: "Tell us about yourself and why you're interested...", hi: "अपने बारे में बताएं और आपकी रुचि क्यों है...", te: "మీ గురించి మాకు చెప్పండి మరియు మీకు ఆసక్తి ఎందుకు..." },
  "form.howCanHelp": { en: "How can we help you?", hi: "हम आपकी कैसे मदद कर सकते हैं?", te: "మేము మీకు ఎలా సహాయం చేయగలం?" },
  "form.businessEmailHelper": { en: "Please use your business email address (not Gmail, Yahoo, etc.)", hi: "कृपया अपना व्यवसाय ईमेल पता उपयोग करें (Gmail, Yahoo आदि नहीं)", te: "దయచేసి మీ వ్యాపార ఇమెయిల్ చిరునామాను ఉపయోగించండి (Gmail, Yahoo మొదలైనవి కాదు)" },
  "form.validPhoneError": { en: "Please enter a valid phone number", hi: "कृपया एक वैध फ़ोन नंबर दर्ज करें", te: "దయచేసి చెల్లుబాటు అయ్యే ఫోన్ నంబర్ నమోదు చేయండి" },
  "form.businessEmailRequired": { en: "Business email is required", hi: "व्यवसाय ईमेल आवश्यक है", te: "వ్యాపార ఇమెయిల్ అవసరం" },
  "form.businessEmailError": { en: "Please use a business email address", hi: "कृपया एक व्यवसाय ईमेल पता उपयोग करें", te: "దయచేసి వ్యాపార ఇమెయిల్ చిరునామాను ఉపయోగించండి" },
  "form.businessEmailRequiredTitle": { en: "Business Email Required", hi: "व्यवसाय ईमेल आवश्यक", te: "వ్యాపార ఇమెయిల్ అవసరం" },
  "form.businessEmailRequiredDesc": { en: "Please use your business email address instead of a personal email (Gmail, Yahoo, Hotmail, etc.). This helps us verify your business and provide better service.", hi: "कृपया व्यक्तिगत ईमेल (Gmail, Yahoo, Hotmail आदि) के बजाय अपना व्यवसाय ईमेल पता उपयोग करें। यह हमें आपके व्यवसाय को सत्यापित करने और बेहतर सेवा प्रदान करने में मदद करता है।", te: "దయచేసి వ్యక్తిగత ఇమెయిల్ (Gmail, Yahoo, Hotmail మొదలైనవి)కి బదులుగా మీ వ్యాపార ఇమెయిల్ చిరునామాను ఉపయోగించండి. ఇది మీ వ్యాపారాన్ని ధృవీకరించడంలో మరియు మంచి సేవను అందించడంలో మాకు సహాయపడుతుంది." },
  "form.iUnderstand": { en: "I Understand", hi: "मैं समझ गया", te: "నాకు అర్థమైంది" },

  // Join Page Additional
  "join.growBusiness": { en: "Grow your business with data", hi: "डेटा के साथ अपने व्यवसाय को बढ़ाएं", te: "డేటాతో మీ వ్యాపారాన్ని పెంచండి" },
  "join.join100": { en: "Join 100+ women entrepreneurs who are already using Femtrics to make smarter business decisions and grow their revenue.", hi: "100+ महिला उद्यमियों में शामिल हों जो पहले से ही फेमट्रिक्स का उपयोग कर रहे हैं ताकि वे स्मार्ट व्यावसायिक निर्णय ले सकें और अपने राजस्व को बढ़ा सकें।", te: "ఇప్పటికే ఫెమ్ట్రిక్స్‌ను ఉపయోగిస్తున్న 100+ మహిళా వ్యాపారవేత్తలలో చేరండి, తద్వారా వారు తెలివైన వ్యాపార నిర్ణయాలు తీసుకోవచ్చు మరియు వారి ఆదాయాన్ని పెంచుకోవచ్చు." },
  "join.volunteerRoles": { en: "Volunteer Roles:", hi: "स्वयंसेवक भूमिकाएं:", te: "స్వచ్ఛంద పాత్రలు:" },
  "join.whatVolunteerGets": { en: "What Every Volunteer Gets", hi: "हर स्वयंसेवक को क्या मिलता है", te: "ప్రతి స్వచ్ఛందకుడికి ఏమి లభిస్తుంది" },
  "join.timeCommitment": { en: "Time Commitment:", hi: "समय की प्रतिबद्धता:", te: "సమయ ప్రతిబద్ధత:" },
  "join.flexibleHours": { en: "Flexible! 4-8 hours per week. We work around your schedule.", hi: "लचीला! प्रति सप्ताह 4-8 घंटे। हम आपके कार्यक्रम के अनुसार काम करते हैं।", te: "వశ్యత! వారానికి 4-8 గంటలు. మేము మీ షెడ్యూల్ ప్రకారం పని చేస్తాము." },
  "join.makeDifference": { en: "Make a real difference", hi: "वास्तविक बदलाव लाएं", te: "నిజమైన తేడా తీసుకురండి" },
  "join.useSkills": { en: "Use your skills to empower women entrepreneurs. Whether you're a data enthusiast, designer, or just passionate about social impact—we need you.", hi: "महिला उद्यमियों को सशक्त बनाने के लिए अपने कौशल का उपयोग करें। चाहे आप डेटा उत्साही हों, डिज़ाइनर हों, या सिर्फ सामाजिक प्रभाव के बारे में भावुक हों—हमें आपकी जरूरत है।", te: "మహిళా వ్యాపారవేత్తలను సాధికారితం చేయడానికి మీ నైపుణ్యాలను ఉపయోగించండి. మీరు డేటా ఉత్సాహి అయినా, డిజైనర్ అయినా లేదా సామాజిక ప్రభావం గురించి ఉత్సాహంతో ఉన్నా—మాకు మీరు అవసరం." },

  // Contact Page Additional
  "contact.selectSubject": { en: "Select subject", hi: "विषय चुनें", te: "విషయం ఎంచుకోండి" },
  "contact.business": { en: "Join as a Business", hi: "व्यवसाय के रूप में शामिल हों", te: "వ్యాపారంగా చేరండి" },
  "contact.volunteer": { en: "Volunteer Inquiry", hi: "स्वयंसेवक पूछताछ", te: "స్వచ్ఛంద విచారణ" },
  "contact.partnership": { en: "Partnership Opportunity", hi: "साझेदारी का अवसर", te: "భాగస్వామ్య అవకాశం" },
  "contact.workshop": { en: "Workshop Request", hi: "कार्यशाला अनुरोध", te: "వర్క్‌షాప్ అభ్యర్థన" },
  "contact.media": { en: "Media & Press", hi: "मीडिया और प्रेस", te: "మీడియా & ప్రెస్" },
  "contact.other": { en: "General Inquiry", hi: "सामान्य पूछताछ", te: "సాధారణ విచారణ" },
  "contact.messageSent": { en: "Message sent successfully! We'll get back to you soon.", hi: "संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।", te: "సందేశం విజయవంతంగా పంపబడింది! మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాము." },
  "contact.messageFailed": { en: "Failed to send message. Please try again.", hi: "संदेश भेजने में विफल। कृपया पुनः प्रयास करें।", te: "సందేశం పంపడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి." },

  // About Page
  "about.aboutFemtrics": { en: "About Femtrics", hi: "फेमट्रिक्स के बारे में", te: "ఫెమ్ట్రిక్స్ గురించి" },
  "about.socialEnterprise": { en: "A Business-Analytics Social Enterprise for", hi: "के लिए एक व्यापार-विश्लेषण सामाजिक उद्यम", te: "కోసం ఒక వ్యాపార-విశ్లేషణ సామాజిక సంస్థ" },
  "about.women": { en: "Women", hi: "महिलाएं", te: "మహిళలు" },
  "about.ourStory": { en: "Our Story", hi: "हमारी कहानी", te: "మా కథ" },
  "about.bornFromBelief": { en: "Born from a simple belief", hi: "एक साधारण विश्वास से जन्म", te: "సాధారణ నమ్మకం నుండి జన్మించింది" },
  "about.teamStructure": { en: "Team Structure", hi: "टीम संरचना", te: "టీమ్ నిర్మాణం" },
  "about.everyVolunteerGets": { en: "Every Volunteer Gets", hi: "हर स्वयंसेवक को मिलता है", te: "ప్రతి స్వచ్ఛందకుడికి లభిస్తుంది" },

  // Micro Conversion Modal
  "microConversion.title": { en: "Get Your Free Mini-Audit", hi: "अपना मुफ्त मिनी-ऑडिट प्राप्त करें", te: "మీ ఉచిత మినీ-ఆడిట్ పొందండి" },
  "microConversion.description": { en: "Quick 30-second form to get started", hi: "शुरू करने के लिए 30 सेकंड का त्वरित फॉर्म", te: "ప్రారంభించడానికి 30 సెకన్ల శీఘ్ర ఫారమ్" },
  "microConversion.whatsappNote": { en: "We'll send a 5-minute onboarding on WhatsApp — quick & in Telugu/Hindi if you prefer.", hi: "हम व्हाट्सएप पर 5 मिनट का ऑनबोर्डिंग भेजेंगे — त्वरित और तेलुगु/हिंदी में यदि आप पसंद करते हैं।", te: "మేము వాట్సాప్‌లో 5 నిమిషాల ఆన్‌బోర్డింగ్ పంపుతాము — త్వరగా మరియు తెలుగు/హిందీలో మీకు ఇష్టమైతే." },
  "microConversion.pleaseSpecify": { en: "Please specify", hi: "कृपया निर्दिष्ट करें", te: "దయచేసి నిర్దేశించండి" },
  "microConversion.selectGoal": { en: "Select your primary goal", hi: "अपना प्राथमिक लक्ष्य चुनें", te: "మీ ప్రాథమిక లక్ష్యాన్ని ఎంచుకోండి" },
  "microConversion.goal.increase sales": { en: "Increase Sales", hi: "बिक्री बढ़ाएं", te: "విక్రయాలను పెంచండి" },
  "microConversion.goal.reduce waste": { en: "Reduce Waste", hi: "अपव्यय कम करें", te: "వృథాను తగ్గించండి" },
  "microConversion.goal.get more customers": { en: "Get More Customers", hi: "अधिक ग्राहक प्राप्त करें", te: "మరిన్ని కస్టమర్‌లను పొందండి" },
  "microConversion.whatsappOptIn": { en: "Send me WhatsApp updates (recommended)", hi: "मुझे व्हाट्सएप अपडेट भेजें (अनुशंसित)", te: "నాకు వాట్సాప్ నవీకరణలు పంపండి (సిఫార్సు చేయబడింది)" },
  "microConversion.submit": { en: "Get Started", hi: "शुरू करें", te: "ప్రారంభించండి" },
  "microConversion.submitting": { en: "Submitting...", hi: "जमा कर रहे हैं...", te: "సమర్పిస్తున్నాము..." },
  "microConversion.successTitle": { en: "Thanks! We'll send your free mini-audit on WhatsApp in 10–30 minutes.", hi: "धन्यवाद! हम 10-30 मिनट में व्हाट्सएप पर आपका मुफ्त मिनी-ऑडिट भेजेंगे।", te: "ధన్యవాదాలు! మేము 10-30 నిమిషాలలో వాట్సాప్‌లో మీ ఉచిత మినీ-ఆడిట్ పంపుతాము." },
  "microConversion.successMessage": { en: "Check your WhatsApp for the next steps!", hi: "अगले कदमों के लिए अपना व्हाट्सएप देखें!", te: "తదుపరి దశల కోసం మీ వాట్సాప్‌ను తనిఖీ చేయండి!" },
  "form.required": { en: "is required", hi: "आवश्यक है", te: "అవసరం" },
  "form.primaryGoal": { en: "Primary Goal", hi: "प्राथमिक लक्ष्य", te: "ప్రాథమిక లక్ష్యం" },
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

