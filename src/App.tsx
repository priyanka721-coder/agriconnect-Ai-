import { useState, useEffect } from 'react';
import { translations, SupportedLanguage } from './utils/translator';
import { UserProfile } from './types';
import { motion, AnimatePresence } from 'motion/react';

// Importing Tab Components
import AuthModal from './components/AuthModal';
import VoiceAssistant from './components/VoiceAssistant';
import WeatherDashboard from './components/WeatherDashboard';
import CropRecommendation from './components/CropRecommendation';
import DiseaseDetection from './components/DiseaseDetection';
import Chatbot from './components/Chatbot';
import Marketplace from './components/Marketplace';
import EquipmentRental from './components/EquipmentRental';
import GovernmentSchemes from './components/GovernmentSchemes';
import LearningCenter from './components/LearningCenter';
import MarketPrices from './components/MarketPrices';
import ContactPage from './components/ContactPage';
import TickerTape from './components/TickerTape';
import VoicePlayerWidget from './components/VoicePlayerWidget';
import WeatherAlertSystem from './components/WeatherAlertSystem';

// Icon Set
import { 
  Sprout, ShieldAlert, Sparkles, CloudRain, ShoppingBag, 
  Calendar, Landmark, BookOpen, TrendingUp, Phone, 
  Home, Menu, X, CheckCircle, Award, Users, ArrowRight, Eye,
  Bell
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [alertCount, setAlertCount] = useState(2);
  
  // Accessibility state
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync translation state instantly when farmer profiles with explicit languages load
  useEffect(() => {
    if (profile && profile.preferredLanguage) {
      setLanguage(profile.preferredLanguage);
    }
  }, [profile]);

  const activeTrans = translations[language];

  // Map tabs to translation strings
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'home': return activeTrans.menuHome;
      case 'recommend': return activeTrans.menuCropRecommend;
      case 'disease': return activeTrans.menuDiseaseDetect;
      case 'chatbot': return activeTrans.menuChatbot;
      case 'weather': return activeTrans.menuWeather;
      case 'marketplace': return activeTrans.menuMarketplace;
      case 'rental': return activeTrans.menuRental;
      case 'schemes': return activeTrans.menuSchemes;
      case 'learning': return activeTrans.menuLearning;
      case 'prices': return activeTrans.menuPriceTrends;
      case 'contact': return activeTrans.menuContact;
      default: return '';
    }
  };

  const menuItems = [
    { id: 'home', icon: <Home className="w-4 h-4" /> },
    { id: 'recommend', icon: <Sprout className="w-4 h-4" /> },
    { id: 'disease', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'chatbot', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'weather', icon: <CloudRain className="w-4 h-4" /> },
    { id: 'marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'rental', icon: <Calendar className="w-4 h-4" /> },
    { id: 'schemes', icon: <Landmark className="w-4 h-4" /> },
    { id: 'learning', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'prices', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'contact', icon: <Phone className="w-4 h-4" /> },
  ];

  // Render core views
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeSection();
      case 'recommend':
        return <CropRecommendation language={language} />;
      case 'disease':
        return <DiseaseDetection language={language} />;
      case 'chatbot':
        return <Chatbot language={language} />;
      case 'weather':
        return <WeatherDashboard language={language} userLocation={profile?.location} />;
      case 'marketplace':
        return <Marketplace language={language} />;
      case 'rental':
        return <EquipmentRental language={language} />;
      case 'schemes':
        return <GovernmentSchemes language={language} />;
      case 'learning':
        return <LearningCenter language={language} />;
      case 'prices':
        return <MarketPrices language={language} />;
      case 'contact':
        return <ContactPage language={language} />;
      default:
        return renderHomeSection();
    }
  };

  const renderHomeSection = () => (
    <div className="space-y-12 font-sans" id="home-dashboard-view">
      
      {/* 1. Hero banner section */}
      <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-green-700 to-green-900 text-white p-8 md:p-12 shadow-2xl border border-green-800/20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-[-15deg] translate-x-12 hidden md:block"></div>
        <div className="max-w-3xl relative z-10 space-y-5">
          <span className="bg-green-500/25 text-green-300 border border-green-500/30 font-bold text-[10px] uppercase px-3.5 py-1.5 rounded-full tracking-wider shadow-sm inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
            🌾 {language === 'en' ? 'India Sowing Intelligence Hub' : 'భారతీయ వ్యవసాయ విజ్ఞాన కేంద్రం'}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight leading-tight">
            {language === 'en' ? 'Smart Farming Solutions for Rural India' : language === 'te' ? 'రైతు సోదరుల కోసం ఆధునిక AI సాంకేతికత' : 'भारतीय किसानों के लिए आधुनिक एआई पोर्टल'}
          </h1>
          <p className="text-sm md:text-base text-stone-100 font-medium leading-relaxed max-w-xl">
            {language === 'en' 
              ? 'Maximize crop yield, diagnose pathogens, and buy/sell produce directly with peer-to-peer farmer cooperative connections under multi-lingual support.'
              : 'పంటల దిగుబడి పెంచడం, తెగుళ్ల నిర్ధారణ, అద్దె యంత్రాల బుకింగ్ మరియు తాజా మార్కెట్ రేట్లకు ఎంచుకున్న భాషలో సహాయం పొందండి.'}
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2">
            <button
              id="cta-recommend"
              onClick={() => setActiveTab('recommend')}
              className="bg-white hover:bg-stone-100 text-green-800 font-bold py-3.5 px-7 rounded-2xl text-xs uppercase tracking-wider cursor-pointer shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              🌱 {language === 'en' ? 'Get Crop Recommendations' : 'పంట సలహాలు పొందండి'}
            </button>
            <button
              id="cta-disease"
              onClick={() => setActiveTab('disease')}
              className="bg-white/15 hover:bg-white/25 text-white font-bold py-3.5 px-7 rounded-2xl text-xs uppercase tracking-wider cursor-pointer transition-all border border-white/20 shadow-md"
            >
              🔍 {language === 'en' ? 'Scan Crop Disease' : 'తెగులు గుర్తించండి'}
            </button>
          </div>
        </div>

        {/* Floating micro stats display */}
        <div className="hidden lg:block absolute bottom-12 right-12 bg-white/10 backdrop-blur-md p-5 rounded-[24px] border border-white/15 max-w-xs shadow-xl text-xs space-y-2">
          <p className="font-bold text-green-300 flex items-center gap-1">💡 Today Weather Warning</p>
          <p className="text-white/95 font-medium">Moderate rain showers expected around Guntur district. Postpone dry top-dressing sprays.</p>
        </div>
      </div>

      {/* 2. Welcome and Profile quick-card */}
      {profile && (
        <div id="home-welcome-profile" className="bg-stone-100/60 p-6 rounded-[24px] border border-stone-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] text-green-800 font-extrabold uppercase tracking-wider font-display">Farmer Overview Dashboard</span>
            <h3 className="text-lg font-bold text-stone-900 font-display mt-0.5">
              {language === 'en' ? 'Welcome back, ' + profile.name : 'సుస్వాగతం, ' + profile.name}!
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Land Location: <span className="font-bold text-green-700">{profile.location}</span> • Registered Soil: <span className="font-bold text-green-700">{profile.soilType}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              id="dash-kisan-chatbot"
              onClick={() => setActiveTab('chatbot')}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-white text-stone-800 border border-stone-200 hover:bg-stone-50 transition-colors shadow-sm cursor-pointer"
            >
              💬 {language === 'en' ? 'Talk to Kisan Mitra' : 'చాట్ చేయండి'}
            </button>
            <button
              id="dash-add-crop"
              onClick={() => setActiveTab('marketplace')}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md cursor-pointer"
            >
              🛒 {language === 'en' ? 'Sell Your Harvest' : 'పంట అమ్మకానికి'}
            </button>
          </div>
        </div>
      )}

      {/* Real-time Weather Alerts Notification System */}
      <WeatherAlertSystem 
        language={language} 
        userLocation={profile?.location} 
        onActiveAlertCountChange={(count) => setAlertCount(count)} 
      />

      {/* 3. Stat counters widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="home-statistics">
        {[
          { icon: <Users className="text-indigo-600" />, num: '42,000+', title: 'Active Farmers' },
          { icon: <CheckCircle className="text-green-600" />, num: '32%', title: 'Crop Yield Boost' },
          { icon: <Award className="text-yellow-600" />, num: '₹45 Lakhs', title: 'Pesticide Savings' },
          { icon: <Sprout className="text-teal-600" />, num: '14,500+', title: 'Successful Scans' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-[24px] border border-stone-150/80 text-center space-y-1.5 shadow-sm hover:translate-y-[-2px] transition-transform duration-200">
            <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-1">
              {stat.icon}
            </div>
            <h4 className="font-extrabold text-stone-900 font-display text-lg md:text-xl tracking-tight">{stat.num}</h4>
            <p className="text-[10px] md:text-xs font-bold text-stone-400 uppercase tracking-widest">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 4. Grid of main service shortcut selections */}
      <div>
        <h3 className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-4 font-display">
          {language === 'en' ? 'Core Agricultural Modules' : 'వ్యవసాయ విభాగాల సహాయపట్టిక'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'recommend',
              title: activeTrans.menuCropRecommend,
              desc: 'Select optimal soil category, financial budget boundaries, and local states to determine cash yield.',
              color: 'border-l-4 border-l-green-600 border-t border-r border-b border-stone-150'
            },
            {
              id: 'disease',
              title: activeTrans.menuDiseaseDetect,
              desc: 'Upload crop leaves or test diseased templates to detect bacterial diseases instantly.',
              color: 'border-l-4 border-l-red-500 border-t border-r border-b border-stone-150'
            },
            {
              id: 'marketplace',
              title: activeTrans.menuMarketplace,
              desc: 'Trade harvested paddy, wheat, chilli, groundnut, and cotton directly without middle-men commissions.',
              color: 'border-l-4 border-l-blue-500 border-t border-r border-b border-stone-150'
            },
            {
              id: 'schemes',
              title: activeTrans.menuSchemes,
              desc: 'Get direct details on PM-KISAN installations or verify eligibility limits on agricultural loan programs.',
              color: 'border-l-4 border-l-yellow-500 border-t border-r border-b border-stone-150'
            },
            {
              id: 'prices',
              title: activeTrans.menuPriceTrends,
              desc: 'Track local mandi pricing tickers and review AreaChart price projection trends.',
              color: 'border-l-4 border-l-indigo-500 border-t border-r border-b border-stone-150'
            },
            {
              id: 'rental',
              title: activeTrans.menuRental,
              desc: 'Register cooperative harvesters or high pressure sprayers at cheap subsidized daily quote packages.',
              color: 'border-l-4 border-l-teal-500 border-t border-r border-b border-stone-150'
            }
          ].map((srv) => (
            <button
              key={srv.id}
              id={`service-shortcut-${srv.id}`}
              onClick={() => setActiveTab(srv.id)}
              className={`p-6 rounded-[24px] bg-white text-left flex flex-col justify-between hover:shadow-md hover:border-r-stone-300 transition-all cursor-pointer h-44 shadow-sm ${srv.color}`}
            >
              <div>
                <h4 className="font-bold text-stone-900 font-display text-sm md:text-base leading-tight">{srv.title}</h4>
                <p className="text-xs text-stone-500 mt-2 line-clamp-3 leading-relaxed">{srv.desc}</p>
              </div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest flex items-center gap-1 mt-2">
                <span>Configure</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Farmer Testimonials / Success stories */}
      <div id="home-testimonials" className="bg-stone-100/50 p-8 rounded-[32px] border border-stone-200/60 shadow-sm">
        <h3 className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-4 font-display">
          {language === 'en' ? 'Success Stories of Smallholders' : 'రైతుల విజయ గాథలు'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[24px] border border-stone-100 shadow-sm flex gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm">
              RM
            </div>
            <div>
              <p className="text-xs italic text-stone-600 leading-relaxed font-semibold font-sans">
                "I used the Crop Advisor to switch from traditional rainfed sorghum to groundnuts on my sandy soil in Anantapur. The nitrogen top-dressing advisory increased my net profit by ₹42,000 this season!"
              </p>
              <h5 className="font-bold text-stone-800 text-xs mt-2 font-display">— R. Mallaiah, Anantapur (Andhra Pradesh)</h5>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-stone-100 shadow-sm flex gap-4 font-semibold text-xs text-stone-600">
            <div className="w-12 h-12 bg-green-600 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm">
              TK
            </div>
            <div>
              <p className="text-xs italic text-stone-605 leading-relaxed font-semibold">
                "When brown spots appeared overnight in my paddy field, I scanned it with the Crop Disease tool. It instantly diagnosed Rice Blast and suggested an copper-based spray recipe, which saved my field from complete ruin."
              </p>
              <h5 className="font-bold text-stone-800 text-xs mt-2 font-display">— T. Kripal Singh, Bhatinda (Punjab)</h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <div 
      className={`min-h-screen flex flex-col justify-between transition-all duration-300 ${highContrast ? 'bg-zinc-950 text-white' : 'bg-stone-50 text-stone-900'} ${fontSize === 'small' ? 'text-xs' : fontSize === 'large' ? 'text-base' : 'text-sm'}`}
      id="agriconnect-platform"
    >
      {/* 1. TOP BAR FOR LANGUAGE, ACCESSIBILITY, PROFILE */}
      <div className={`py-2.5 px-4 shadow-sm relative z-30 flex flex-wrap justify-between items-center gap-3 ${highContrast ? 'bg-zinc-900 border-b border-zinc-805 text-white' : 'bg-stone-100 border-b border-stone-200 text-stone-700'}`} id="accessibility-top-bar">
        
        {/* Left: accessibility font sizes and Contrast togglers */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="opacity-75 font-semibold text-[10px] uppercase tracking-wider font-display">{activeTrans.accessibilityA}:</span>
            <div className="inline-flex overflow-hidden rounded-lg border border-stone-200 bg-white text-[10px] font-bold shadow-xs">
              <button
                id="font-size-small-btn"
                onClick={() => setFontSize('small')}
                className={`py-1 px-3 cursor-pointer transition-colors ${fontSize === 'small' ? 'bg-green-600 text-white' : 'hover:bg-stone-100 text-stone-705'}`}
              >
                A-
              </button>
              <button
                id="font-size-med-btn"
                onClick={() => setFontSize('medium')}
                className={`py-1 px-3 cursor-pointer transition-colors ${fontSize === 'medium' ? 'bg-green-600 text-white' : 'hover:bg-stone-100 text-stone-705'}`}
              >
                A
              </button>
              <button
                id="font-size-lg-btn"
                onClick={() => setFontSize('large')}
                className={`py-1 px-3.5 cursor-pointer transition-colors ${fontSize === 'large' ? 'bg-green-600 text-white' : 'hover:bg-stone-100 text-stone-705'}`}
              >
                A+
              </button>
            </div>
          </div>

          <button
            id="high-contrast-toggle-btn"
            onClick={() => setHighContrast(!highContrast)}
            className="text-[10px] bg-white border border-stone-200 py-1 px-3 rounded-lg font-bold cursor-pointer hover:bg-stone-50 flex items-center gap-1 text-stone-700 shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-green-600" />
            <span>{activeTrans.accessibilityB}</span>
          </button>
        </div>

        {/* Right: Language switch list, Profile authentication trigger */}
        <div className="flex items-center gap-3">
          {/* Language toggler widget */}
          <div className="inline-flex overflow-hidden rounded-full border border-stone-250 bg-stone-200/50 p-0.5 text-[10px] font-bold">
            <button
              id="lang-switch-en"
              onClick={() => setLanguage('en')}
              className={`py-1 px-3.5 rounded-full cursor-pointer transition-all ${language === 'en' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
            >
              EN
            </button>
            <button
              id="lang-switch-te"
              onClick={() => setLanguage('te')}
              className={`py-1 px-3.5 rounded-full cursor-pointer transition-all ${language === 'te' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
            >
              తెలుగు
            </button>
            <button
              id="lang-switch-hi"
              onClick={() => setLanguage('hi')}
              className={`py-1 px-3.5 rounded-full cursor-pointer transition-all ${language === 'hi' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
            >
              हिन्दी
            </button>
          </div>

          {/* Profile controls */}
          <AuthModal 
            language={language}
            onProfileUpdate={(p) => setProfile(p)}
            currentProfile={profile}
          />
        </div>

      </div>

      {/* 2. MAIN LOGO HEADER AND NAVIGATION SHAFTS */}
      <header className={`sticky top-0 z-20 py-4.5 px-4 shadow-sm shrink-0 transition-all ${highContrast ? 'bg-zinc-950 border-b border-zinc-800 text-white' : 'bg-white/90 backdrop-blur-md border-b border-stone-200 text-stone-900 font-semibold'}`} id="main-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand layout logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left cursor-pointer grow-0 shrink-0 select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-green-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-green-100">
              <Sprout className="w-5.5 h-5.5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold font-display tracking-tight leading-none text-green-900">{activeTrans.brandName}</h1>
              <p className="text-[10px] text-stone-400 mt-1 leading-none font-bold uppercase tracking-wider">{activeTrans.brandTagline}</p>
            </div>
          </button>

          {/* Nav Links Rail for computer desktop */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-stone-100/65 p-1 rounded-full border border-stone-200/80 text-xs font-semibold select-none">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`py-2 px-3 rounded-full cursor-pointer hover:bg-stone-200/40 hover:text-stone-900 transition-all flex items-center gap-1.5 ${activeTab === item.id ? 'bg-green-600 text-white shadow-md shadow-green-100/80' : 'text-stone-700'}`}
              >
                {item.icon}
                <span>{getTabLabel(item.id)}</span>
              </button>
            ))}
          </nav>

          {/* Notification bell & Mobile hamburger button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="header-weather-alerts-bell"
              onClick={() => {
                setActiveTab('home');
                setTimeout(() => {
                  const targetEl = document.getElementById('weather-alert-system-container');
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 100);
              }}
              className="p-2 text-stone-800 hover:bg-stone-200/80 rounded-xl cursor-pointer shadow-xs transition-colors flex items-center justify-center relative bg-stone-100 border border-stone-200/60"
              title={`${alertCount} Active Weather Alerts`}
            >
              <Bell className={`w-4.5 h-4.5 ${alertCount > 0 ? 'text-red-600 animate-pulse' : 'text-stone-600'}`} />
              {alertCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {alertCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger button */}
            <button
              id="mobile-drawer-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-xl cursor-pointer shadow-xs transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Responsive Mobile burger panel (Replaced with animated side drawer and background dim) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop Overlay to dim background content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs z-40"
                id="mobile-drawer-backdrop"
              />

              {/* Sliding Mobile navigation drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white text-stone-900 border-l border-stone-200 shadow-2xl z-50 p-6 flex flex-col"
                id="mobile-navigation-drawer"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between pb-5 border-b border-stone-150">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center text-white shrink-0">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 font-display leading-tight">{activeTrans.brandName}</h3>
                      <p className="text-[9px] text-stone-400 font-extrabold uppercase tracking-wider mt-0.5">{language === 'en' ? 'Smart Kisan Hub' : 'రైతు సేవలు'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-600 cursor-pointer"
                    id="mobile-drawer-close-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer body - list of menu options */}
                <div className="flex-1 overflow-y-auto py-6 space-y-2 select-none">
                  {menuItems.map((item) => {
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`mobile-nav-${item.id}`}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full py-3 px-4 rounded-xl cursor-pointer text-xs font-bold flex items-center justify-between transition-all ${
                          isSelected 
                            ? 'bg-green-600 text-white shadow-md shadow-green-150/50' 
                            : 'bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-stone-750'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{getTabLabel(item.id)}</span>
                        </div>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-40'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Drawer footer / Quick controls */}
                <div className="pt-4 border-t border-stone-150 space-y-4 shrink-0">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider text-center">{language === 'en' ? 'Select Language' : 'భాషను ఎంచుకోండి'}</div>
                  <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-bold justify-between gap-1">
                    <button 
                      onClick={() => setLanguage('en')}
                      className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${language === 'en' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => setLanguage('te')}
                      className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${language === 'te' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                      తెలుగు
                  </button>
                  <button 
                    onClick={() => setLanguage('hi')}
                    className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${language === 'hi' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-700'}`}
                  >
                    हिन्दी
                  </button>
                </div>
                
                <p className="text-[10px] text-stone-400 font-semibold text-center italic mt-1">
                  AgriConnect AI India • 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      </header>

      {/* Real-time Crop Price Alerts Ticker Tape */}
      <TickerTape language={language} district={profile?.location} />

      {/* 3. CORE ADVISORY STUDY LABELS PANEL */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 relative z-10 select-text">
        {renderContent()}
      </main>

      {/* 4. ACCESSIBILITY VOICE FLOATER */}
      <VoiceAssistant 
        language={language}
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t)}
      />

      <VoicePlayerWidget language={language} />

      {/* 5. FOOTER */}
      <footer className={`py-10 px-4 border-t shrink-0 text-center text-xs font-bold ${highContrast ? 'bg-zinc-910 border-zinc-800 text-zinc-400' : 'bg-stone-900 border-stone-850 text-stone-300'}`} id="main-footer">
        <div id="footer-logo-panel" className="flex items-center justify-center gap-1.5 opacity-80 mb-2">
          <Sprout className="w-4 h-4 text-green-400" />
          <span>AgriConnect AI Portal • {language === 'en' ? 'Smart Kisan Hub' : 'రైతు సేవా కేంద్రం'}</span>
        </div>
        <p className="opacity-65 text-[10px] tracking-wide font-medium">
          © 2026 AgriConnect AI India Inc. All Rights Reserved. Devised under Ministry of Agronomy guidelines. Voice Assistant integrated via Web Speech synthesis vectors.
        </p>
      </footer>
    </div>
  );
}
