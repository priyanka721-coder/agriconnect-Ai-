export type SupportedLanguage = 'en' | 'te' | 'hi';

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  assistantTitle: string;
  assistantPrompt: string;
  assistantGreeting: string;
  menuHome: string;
  menuCropRecommend: string;
  menuDiseaseDetect: string;
  menuChatbot: string;
  menuWeather: string;
  menuMarketplace: string;
  menuRental: string;
  menuSchemes: string;
  menuLearning: string;
  menuPriceTrends: string;
  menuContact: string;
  buttonLogin: string;
  buttonLogout: string;
  buttonSpeak: string;
  buttonStop: string;
  soilTypeLabel: string;
  seasonLabel: string;
  locationLabel: string;
  waterLabel: string;
  budgetLabel: string;
  submitRecommend: string;
  diseaseDetectTitle: string;
  diseaseDetectUpload: string;
  chatPlaceholder: string;
  chatSend: string;
  weatherFarmingAdvice: string;
  marketplaceSell: string;
  equipmentRent: string;
  learningCenterTitle: string;
  contactHeader: string;
  accessibilityA: string;
  accessibilityB: string;
  telugu: string;
  hindi: string;
  english: string;
  registerButton: string;
  profileTitle: string;
  loginRequired: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandName: "AgriConnect AI",
    brandTagline: "AI-Powered Smart Farming Portal",
    assistantTitle: "Voice Guidance",
    assistantPrompt: "Click microphone to use Voice Assistant / read aloud page details",
    assistantGreeting: "Hello, welcome to AgriConnect AI! How can I help you manage your farm today?",
    menuHome: "Home",
    menuCropRecommend: "Crop Advisor",
    menuDiseaseDetect: "Disease Scanner",
    menuChatbot: "Kisan Chatbot",
    menuWeather: "Weather",
    menuMarketplace: "Marketplace",
    menuRental: "Rent Tools",
    menuSchemes: "Govt Schemes",
    menuLearning: "Learning Center",
    menuPriceTrends: "Market Prices",
    menuContact: "Contact Us",
    buttonLogin: "Farmer Login",
    buttonLogout: "Logout",
    buttonSpeak: "Read Aloud",
    buttonStop: "Stop Voice",
    soilTypeLabel: "Soil Type",
    seasonLabel: "Sowing Season",
    locationLabel: "Your Location",
    waterLabel: "Water Availability",
    budgetLabel: "Cultivation Budget (₹)",
    submitRecommend: "Get AI Recommendations",
    diseaseDetectTitle: "AI Crop Disease Diagnoser",
    diseaseDetectUpload: "Upload crop photo or pick sample below to test AI diagnosis",
    chatPlaceholder: "Ask anything about crops, fertilizers, pests, or schemes...",
    chatSend: "Ask AI",
    weatherFarmingAdvice: "Smart Farming Advice for Current Weather",
    marketplaceSell: "List Crop for Sale",
    equipmentRent: "Book Rental Equipment",
    learningCenterTitle: "Farming Knowledge Center",
    contactHeader: "Get in Touch with Agriculture Experts",
    accessibilityA: "Text Size",
    accessibilityB: "High Contrast",
    telugu: "తెలుగు (Telugu)",
    hindi: "हिन्दी (Hindi)",
    english: "English",
    registerButton: "Create Profile",
    profileTitle: "Farmer Dashboard Profile",
    loginRequired: "Please login or register to use this feature"
  },
  te: {
    brandName: "అగ్రి-కనెక్ట్ AI",
    brandTagline: "రైతుల కోసం ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ స్మార్ట్ పోర్టల్",
    assistantTitle: "వాయిస్ సహాయం",
    assistantPrompt: "స్పీకర్ ఐకాన్ క్లిక్ చేసి పేజీ సమాచారం వినండి లేదా వాయిస్ వాడండి",
    assistantGreeting: "నమస్కారం, అగ్రి-కనెక్ట్ AI కి స్వాగతం! ఈరోజు మీ పంటల సాగుకు నేను ఏ విధంగా సహాయం చేయగలను?",
    menuHome: "ముఖ్య పేజీ",
    menuCropRecommend: "పంటల సలహాదారు",
    menuDiseaseDetect: "తెగుళ్ల గుర్తింపు",
    menuChatbot: "కిసాన్ చాట్‌బాట్",
    menuWeather: "వాతావరణం",
    menuMarketplace: "పంటల మార్కెట్",
    menuRental: "పరికరాల అద్దె",
    menuSchemes: "ప్రభుత్వ పథకాలు",
    menuLearning: "శిక్షణ కేంద్రం",
    menuPriceTrends: "మార్కెట్ ధరలు",
    menuContact: "సంప్రదించండి",
    buttonLogin: "రైతు లాగిన్",
    buttonLogout: "లాగౌట్",
    buttonSpeak: "చదివి వినిపించు",
    buttonStop: "వాయిస్ ఆపు",
    soilTypeLabel: "నేల రకం",
    seasonLabel: "సాగు కాలం",
    locationLabel: "మీ చిరునామా/ప్రాంతం",
    waterLabel: "నీటి వసతి",
    budgetLabel: "వ్యవసాయ బడ్జెట్ (₹)",
    submitRecommend: "AI సలహాలు పొందండి",
    diseaseDetectTitle: "AI పంట తెగుళ్ల గుర్తింపు",
    diseaseDetectUpload: "పంట ఫోటోను అప్‌లోడ్ చేయండి లేదా క్రింది నమూనాను ఎంచుకోండి",
    chatPlaceholder: "పంటలు, ఎరువులు, పురుగుల మందులు లేదా పథకాల గురించి అడగండి...",
    chatSend: "అడగండి",
    weatherFarmingAdvice: "ప్రస్తుత వాతావరణానికి స్మార్ట్ వ్యవసాయ సలహా",
    marketplaceSell: "అమ్మకానికి పంటను చేర్చండి",
    equipmentRent: "అద్దె పరికరాలు బుక్ చేయండి",
    learningCenterTitle: "వ్యవసాయ సాంకేతిక జ్ఞాన కేంద్రం",
    contactHeader: "వ్యవసాయ నిపుణులతో సంప్రదించండి",
    accessibilityA: "అక్షరాల పరిమాణం",
    accessibilityB: "అధిక కాంట్రాస్ట్",
    telugu: "తెలుగు (Telugu)",
    hindi: "हिन्दी (Hindi)",
    english: "English",
    registerButton: "ఖాతా సృష్టించండి",
    profileTitle: "రైతు ప్రొఫైల్",
    loginRequired: "ఈ సేవను ఉపయోగించడానికి దయచేసి లాగిన్ చేయండి"
  },
  hi: {
    brandName: "एग्रीकनेक्ट AI",
    brandTagline: "एआई-संचालित स्मार्ट कृषि पोर्टल",
    assistantTitle: "आवाज सहायक",
    assistantPrompt: "पेज का विवरण जोर से सुनने या आवाज का उपयोग करने के लिए माइक क्लिक करें",
    assistantGreeting: "नमस्कार, एग्रीकनेक्ट AI में आपका स्वागत है! आज मैं आपकी खेती के प्रबंधन में कैसे मदद कर सकता हूँ?",
    menuHome: "मुख्य पृष्ठ",
    menuCropRecommend: "फसल सलाहकार",
    menuDiseaseDetect: "रोग निदान",
    menuChatbot: "किसान चैटबॉट",
    menuWeather: "मौसम जानकारी",
    menuMarketplace: "फसल बाजार",
    menuRental: "उपकरण किराया",
    menuSchemes: "सरकारी योजनाएं",
    menuLearning: "ज्ञान केंद्र",
    menuPriceTrends: "बाजार दाम",
    menuContact: "संपर्क करें",
    buttonLogin: "किसान लॉगिन",
    buttonLogout: "लॉगआउट",
    buttonSpeak: "जोर से पढ़ें",
    buttonStop: "आवाज बंद करें",
    soilTypeLabel: "मिट्टी का प्रकार",
    seasonLabel: "बुवाई का मौसम",
    locationLabel: "आपका स्थान",
    waterLabel: "पानी की उपलब्धता",
    budgetLabel: "खेती का बजट (₹)",
    submitRecommend: "AI फसल सल्लाह लें",
    diseaseDetectTitle: "AI फसल रोग निदान",
    diseaseDetectUpload: "फसल की फोटो अपलोड करें या परीक्षण के लिए नीचे से एक नमूना चुनें",
    chatPlaceholder: "फसलों, उर्वरकों, कीटों या सरकारी योजनाओं के बारे में पूछें...",
    chatSend: "AI से पूछें",
    weatherFarmingAdvice: "वर्तमान मौसम के लिए कृषि सुझाव",
    marketplaceSell: "बिक्री के लिए फसल जोड़ें",
    equipmentRent: "किराये के उपकरण बुक करें",
    learningCenterTitle: "कृषि प्रशिक्षण एवं ज्ञान केंद्र",
    contactHeader: "कृषि विशेषज्ञों से संपर्क करें",
    accessibilityA: "अक्षरों का आकार",
    accessibilityB: "उच्च कंट्रास्ट",
    telugu: "తెలుగు (Telugu)",
    hindi: "हिन्दी (Hindi)",
    english: "English",
    registerButton: "प्रोफ़ाइल बनाएं",
    profileTitle: "किसान प्रोफ़ाइल",
    loginRequired: "कृपया इस सेवा का उपयोग करने के लिए लॉगिन करें"
  }
};
