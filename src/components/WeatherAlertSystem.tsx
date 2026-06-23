import React, { useState, useEffect } from 'react';
import { SupportedLanguage } from '../utils/translator';
import { 
  AlertTriangle, 
  Bell, 
  CloudRain, 
  ShieldAlert, 
  Volume2, 
  X, 
  Check, 
  VolumeX, 
  Info, 
  Play, 
  Zap, 
  Flame, 
  Wind, 
  CheckSquare, 
  Square,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface WeatherAlertSystemProps {
  language: SupportedLanguage;
  userLocation?: string;
  onActiveAlertCountChange?: (count: number) => void;
}

export interface WeatherAlert {
  id: string;
  severity: 'critical' | 'severe' | 'warning';
  title: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
  region: Record<SupportedLanguage, string>;
  timeIssued: string;
  category: 'flood' | 'hail' | 'heat' | 'cyclone';
  precautions: Record<SupportedLanguage, string[]>;
  acknowledged: boolean;
}

// Low-level web audio synthesizer for realistic real-time chime notification sounds
const playNativeAlertChime = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // Play a friendly triple-beep high-fidelity notification ring
    const now = ctx.currentTime;
    const freqs = [587.33, 659.25, 880.00]; // D5, E5, A5 warm arpeggio
    
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const startTime = now + idx * 0.12;
      const duration = 0.25;
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    });
  } catch (err) {
    console.warn("Web Audio API not supported or blocked by user gesture:", err);
  }
};

const INITIAL_ALERTS: WeatherAlert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    title: {
      en: 'Extreme Rain & Flash Flood Warning',
      te: 'తీవ్రమైన భారీ వర్షం & ఆకస్మిక వరద హెచ్చరిక',
      hi: 'अत्यधिक बारिश और अचानक बाढ़ की चेतावनी'
    },
    description: {
      en: 'Severe convective cloud bursts will generate 120mm+ rainfall in low-lying zones. Extreme risk of crop lodging and soil erosion.',
      te: 'తక్కువ ఎత్తులో ఉన్న ప్రాంతాలలో 120 మి.మీ కంటే ఎక్కువ వర్షపాతం కురుస్తుంది. పంటలు పడిపోవడం మరియు నేల కోతకు గురయ్యే తీవ్ర ప్రమాదం ముప్పు ఉంది.',
      hi: 'निचले इलाकों में 120 मिमी से अधिक बारिश होने की संभावना है। फसल गिरने और मिट्टी के कटाव का अत्यधिक खतरा है।'
    },
    region: {
      en: 'Andhra Coastal & Bhatinda Belt',
      te: 'ఆంధ్ర తీరప్రాంతం & భటిండా ప్రాంతాలు',
      hi: 'आंध्र तटीय और भटिंडा क्षेत्र'
    },
    timeIssued: 'Just Now',
    category: 'flood',
    precautions: {
      en: [
        'Postpone all insecticide top-dressing and chemical sprays.',
        'Dig deep channels along field perimeters to drain logged water.',
        'Protect stored grains in elevated community sheds.'
      ],
      te: [
        'వెంటనే ఎలాంటి ఎరువులు మరియు పురుగుల మందు పిచికారీ పనులను నిలిపివేయండి.',
        'పొలం చుట్టూ లోతైన గుంతలు తవ్వి నీరు త్వరగా బయటకు పోయేలా చేయండి.',
        'కోసిన ధాన్యాన్ని ఎత్తైన సామాజిక వేదికల మీదకు తరలించండి.'
      ],
      hi: [
        'कीटनाशकों और रासायनिक छिड़काव को तुरंत स्थगित करें।',
        'जमा पानी निकालने के लिए खेत के चारों ओर गहरी नालियां बनाएं।',
        'कटी हुई फसल को ऊंचे सामुदायिक शेड में सुरक्षित रखें।'
      ]
    },
    acknowledged: false
  },
  {
    id: 'alert-2',
    severity: 'severe',
    title: {
      en: 'High Speed Winds & Hailstorm Forecast',
      te: 'గాలుల తీవ్రత & వడగండ్ల వాన ప్రమాద ముప్పు',
      hi: 'तेज हवाएं और ओलावृष्टि का पूर्वानुमान'
    },
    description: {
      en: 'Gusty winds exceeding 65km/h combined with severe local hail will impact standing sorghum, sugarcane, and early vegetables.',
      te: 'గంటకు 65 కి.మీ మించిన వేగంతో కూడిన ఈదురు గాలులు, వడగండ్లు నిలబడి ఉన్న జొన్న, చెరకు మరియు కూరగాయలపై పడే అవకాశం ఉంది.',
      hi: '65 किमी/घंटे से अधिक की तेज़ हवाओं के साथ ओलावृष्टि से ज्वार, गन्ना और सब्जियों को नुकसान होने की आशंका है।'
    },
    region: {
      en: 'Guntur, Krishna, and Malwa Districts',
      te: 'గుంటూరు, కృష్ణా మరియు మాల్వా జిల్లాలు',
      hi: 'गुंटूर, कृष्णा और मालवा जिले'
    },
    timeIssued: '15 Minutes Ago',
    category: 'hail',
    precautions: {
      en: [
        'Construct bamboo props/stakes to support high-growth sugarcane stalks.',
        'Keep multi-layer windbreakers and nursery shading nets securely fastened.',
        'Park tractors, harvesters, and high-pressure sprayers indoors.'
      ],
      te: [
        'చెరకు పిలకలు పడిపోకుండా వెంటనే వెదురు కర్రల ఆధారాలను అమర్చండి.',
        'నర్సరీ రక్షణ షేడింగ్ నెట్లను గట్టిగా కట్టి ఉంచండి.',
        'ట్రాక్టర్లు, హార్వెస్టర్లు మరియు విలువైన పరికరాలను షెడ్లలో ఉంచండి.'
      ],
      hi: [
        'गन्ने को गिरने से बचाने के लिए बांस या लकड़ी का सहारा दें।',
        'नर्सरी के शेडिंग नेट को मजबूती से बांध कर रखें।',
        'ट्रैक्टर और अन्य कृषि उपकरणों को शेड के अंदर रखें।'
      ]
    },
    acknowledged: false
  }
];

// Pool of extra alerts for simulating dynamic push events
const SIMULATION_ALERTS_POOL: Omit<WeatherAlert, 'id' | 'acknowledged'>[] = [
  {
    severity: 'critical',
    title: {
      en: 'Chittoor Red Alert: Imminent Tropical Cyclone Impact',
      te: 'చిత్తూరు రెడ్ అలర్ట్: తీవ్ర వాయుగుండం తుఫాను ప్రభావం',
      hi: 'चित्तूर रेड अलर्ट: भीषण चक्रवाती तूफान का खतरा'
    },
    description: {
      en: 'Heavy storm surges expected. Wind speeds will peak at 85km/h. All open field harvesting operations must halt immediately.',
      te: 'తీవ్ర సముద్ర అలలు మరియు గంటకు 85 కి.మీ వేగంతో బలమైన గాలులు వీస్తాయి. పంట కోత కోసే పనులను నిలిపివేయండి.',
      hi: 'भीषण चक्रवाती तूफान के साथ 85 किमी/घंटे की रफ्तार से हवाएं चलेंगी। खुले खेत में कटाई के काम को तुरंत रोकें।'
    },
    region: {
      en: 'Nelapattu, Chittoor & Nellore Coastline',
      te: 'నేలపట్టు, చిత్తూరు & నెల్లూరు తీరప్రాంతం',
      hi: 'नेलापट्टू, चित्तूर और नेल्लोर तटीय क्षेत्र'
    },
    timeIssued: 'Just Now (Real-Time Push)',
    category: 'cyclone',
    precautions: {
      en: [
        'Reinforce plastic sheeting over freshly stored onion and groundnut crop piles.',
        'Ensure power supply and electrical farm motors are disconnected from flooded sheds.',
        'Stay indoors and tune to village emergency audio speakers.'
      ],
      te: [
        'ఇటీవల నిల్వ చేసిన ఉల్లి మరియు వేరుశనగ రాశుల పై ప్లాస్టిక్ కవర్లను గట్టిగా కప్పి ఉంచండి.',
        'పొలాల్లో మోటార్లు మరియు విద్యుత్ కనెక్షన్లను నిలిపివేయండి.',
        'గ్రామ వాయిస్ స్పీకర్ల ద్వారా వచ్చే విపత్తుల సమాచారాన్ని నిత్యం గమనించండి.'
      ],
      hi: [
        'प्याज और मूंगफली के ढेर को तिरपाल या प्लास्टिक से मजबूती से ढकें।',
        'खेतों में बिजली के पंपों और उपकरणों का कनेक्शन तुरंत काट दें।',
        'सुरक्षित स्थान पर बने रहें और स्थानीय समाचारों को सुनें।'
      ]
    }
  },
  {
    severity: 'warning',
    title: {
      en: 'Prolonged Extreme Heatwave (47°C)',
      te: 'తీవ్రమైన ఎండ వేడిమి (వడగాల్పులు - 47°C) హెచ్చరిక',
      hi: 'भीषण लू (हीटवेव - 47°C) की चेतावनी'
    },
    description: {
      en: 'Relative humidity below 20% with soaring daytime temperatures causes moisture shock to chilli buds and cotton pods.',
      te: 'పగటి ఉష్ణోగ్రతలు చాలా ఎక్కువ పెరగడం మరియు గాలిలో తేమ 20% కంటే తగ్గడం వల్ల పత్తి, మిరప పిందెలు లేదా పూత రాలిపోతుంది.',
      hi: 'दिन का तापमान बढ़ने और आर्द्रता 20% से नीचे आने से मिर्च और कपास के पौधों में नमी की कमी हो सकती है।'
    },
    region: {
      en: 'Guntur District & Central Telangana',
      te: 'గుంటూరు జిల్లా & మధ్య తెలంగాణ',
      hi: 'गुंटूर जिला और मध्य तेलंगाना'
    },
    timeIssued: 'Just Now (Real-Time Push)',
    category: 'heat',
    precautions: {
      en: [
        'Adopt micro-sprinkler or drip irrigation during night or early morning hours.',
        'Apply light straw mulching over crop rows to prevent rapid evapotranspiration.',
        'Apply foliar potassium sprays to reinforce moisture retention capacity.'
      ],
      te: [
        'రాత్రి వేళల్లో లేదా ఉదయం పూట మాత్రమే బిందు సేద్యం (డ్రిప్) లేదా స్ప్రింక్లర్ల ద్వారా నీరు అందించండి.',
        'భూమి నుండి తేమ ఆవిరి కాకుండా పంటల మధ్య ఎండిన గడ్డితో రక్షణ పొర (మల్చింగ్) వేయండి.',
        'పంటల తేమ నిలుపుదల సామర్థ్యం పెంచడానికి తగిన పొటాషియం మిశ్రమాలు పిచికారీ చేయండి.'
      ],
      hi: [
        'रात में या सुबह जल्दी सूक्ष्म-फव्वारा या ड्रिप सिंचाई तकनीक अपनाएं।',
        'मिट्टी की नमी बनाए रखने के लिए फसल की क्यारियों में सूखी घास (मल्चिंग) बिछाएं।',
        'पौधों को मुरझाने से बचाने के लिए पोटेशियम युक्त छिड़काव का उपयोग करें।'
      ]
    }
  }
];

export default function WeatherAlertSystem({ 
  language, 
  userLocation,
  onActiveAlertCountChange 
}: WeatherAlertSystemProps) {
  const [alerts, setAlerts] = useState<WeatherAlert[]>(INITIAL_ALERTS);
  const [expandedAlert, setExpandedAlert] = useState<string | null>('alert-1');
  const [checkedPreca, setCheckedPreca] = useState<Record<string, boolean>>({});
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  
  // Simulation control state
  const [simulationAlertPoolIndex, setSimulationAlertPoolIndex] = useState(0);
  const [lastNotificationToast, setLastNotificationToast] = useState<WeatherAlert | null>(null);

  // Sync active alert count to parent (App.tsx / header bell badge)
  const activeCount = alerts.filter(a => !a.acknowledged).length;

  useEffect(() => {
    if (onActiveAlertCountChange) {
      onActiveAlertCountChange(activeCount);
    }
  }, [activeCount, onActiveAlertCountChange]);

  // Hook up sound listener and handle speech updates
  useEffect(() => {
    const handleSpeechStateChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail.isSpeaking || detail.isPaused) {
        setActiveSpeechId(null);
      }
    };
    window.addEventListener('speech-state-changed', handleSpeechStateChange);
    return () => {
      window.removeEventListener('speech-state-changed', handleSpeechStateChange);
    };
  }, []);

  // Trigger voice guidance 
  const handleVoiceReadAlert = (alert: WeatherAlert) => {
    if (activeSpeechId === alert.id) {
      window.dispatchEvent(new CustomEvent('speech-state-changed', {
        detail: { isSpeaking: false, isPaused: false }
      }));
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }

    setActiveSpeechId(alert.id);
    const title = alert.title[language];
    const desc = alert.description[language];
    const region = alert.region[language];
    const precaList = alert.precautions[language].join('. ');

    let fullSpeechText = '';
    if (language === 'te') {
      fullSpeechText = `భయంకరమైన వాతావరణ హెచ్చరిక! ${title}. ప్రాంతం: ${region}. వివరాలు: ${desc}. దయచేసి ఈ నివారణ చర్యలు పాటించండి: ${precaList}`;
    } else if (language === 'hi') {
      fullSpeechText = `मौसम चेतावनी! ${title}. क्षेत्र: ${region}. विवरण: ${desc}. कृपया ये सावधानियां अपनाएं: ${precaList}`;
    } else {
      fullSpeechText = `Critical weather alert! ${title}. Target zone is ${region}. Detailed warning: ${desc}. Please observe the following crop safety precautions: ${precaList}`;
    }

    window.dispatchEvent(new CustomEvent('play-speech', {
      detail: {
        text: fullSpeechText,
        title: language === 'en' ? 'Weather Warning' : language === 'te' ? 'వాతావరణ హెచ్చరిక' : 'मौसम चेतावनी',
        language
      }
    }));
  };

  // Precaution Checklist completion tracker
  const togglePrecaution = (key: string) => {
    setCheckedPreca(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Acknowledge custom alert
  const handleAcknowledge = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
    if (expandedAlert === id) {
      setExpandedAlert(null);
    }
  };

  // Simulate an incoming push alert in real-time
  const triggerSimulationPush = () => {
    const alertData = SIMULATION_ALERTS_POOL[simulationAlertPoolIndex];
    const newId = `sim-alert-${Date.now()}`;
    
    const newAlert: WeatherAlert = {
      ...alertData,
      id: newId,
      acknowledged: false,
      title: {
        en: `${alertData.title.en} (${userLocation || 'Your Region'})`,
        te: `${alertData.title.te} (${userLocation || 'మీ ప్రాంతం'})`,
        hi: `${alertData.title.hi} (${userLocation || 'आपका क्षेत्र'})`
      }
    };

    // Append to active alerts list
    setAlerts(prev => [newAlert, ...prev]);
    setExpandedAlert(newId);
    
    // Play sweet triple synthesizer audio ding
    playNativeAlertChime();

    // Show temporary floating full-width push notification overlay toast
    setLastNotificationToast(newAlert);
    
    // Cycle simulation array index circular
    setSimulationAlertPoolIndex(prev => (prev + 1) % SIMULATION_ALERTS_POOL.length);
  };

  // Auto-dismiss push notification toast slider after 8 seconds
  useEffect(() => {
    if (lastNotificationToast) {
      const timer = setTimeout(() => {
        setLastNotificationToast(null);
      }, 9500);
      return () => clearTimeout(timer);
    }
  }, [lastNotificationToast]);

  return (
    <div className="space-y-6" id="weather-alert-system-container">
      
      {/* Dynamic Pop-in Toast Simulation for PROACTIVE push styles */}
      {lastNotificationToast && (
        <div 
          id="realtime-push-warning-toast"
          className="fixed top-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-stone-900 border-2 border-red-500 rounded-3xl text-white p-5 shadow-2xl z-50 animate-bounce transition-all flex gap-3.5"
        >
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 mt-0.5 animate-pulse">
            <Zap className="w-5.5 h-5.5" />
          </div>
          <div className="flex-1 space-y-1.5 pr-2">
            <div className="flex items-center gap-1.5">
              <span className="bg-red-500 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md animate-ping">
                🔴 PUSH
              </span>
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide tracking-wider">
                {language === 'en' ? 'URGENT EXTREME ALERT' : language === 'te' ? 'అత్యవసర వాతావరణ అలర్ట్' : 'आपातकालीन चेतावनी'}
              </span>
            </div>
            <h4 className="text-xs md:text-sm font-bold text-stone-50 font-display">
              {lastNotificationToast.title[language]}
            </h4>
            <p className="text-[11px] text-stone-300 leading-relaxed font-medium">
              {lastNotificationToast.description[language]}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                id="toast-voice-btn"
                onClick={() => handleVoiceReadAlert(lastNotificationToast)}
                className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-green-300 font-extrabold text-[10px] uppercase py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Announce Aloud' : 'వాయిస్ ప్రసంగం'}</span>
              </button>
              <button
                id="toast-dismiss-btn"
                onClick={() => setLastNotificationToast(null)}
                className="text-stone-400 hover:text-white font-extrabold text-[10px] uppercase py-1.5 px-2 cursor-pointer"
              >
                {language === 'en' ? 'Close' : 'మూసివేయి'}
              </button>
            </div>
          </div>
          <button 
            id="toast-cross-btn"
            onClick={() => setLastNotificationToast(null)}
            className="text-stone-400 hover:text-white self-start"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* CORE ALERTS CONTAINER BANNER CARD */}
      <div className="bg-white rounded-[32px] border border-stone-200 overflow-hidden shadow-xs hover:shadow-sm transition-all">
        
        {/* Banner header bar indicating system is real-time connected */}
        <div className="bg-stone-900 text-white p-4 px-6 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-extrabold tracking-widest uppercase text-red-500 font-display">
                {language === 'en' ? 'PROACTIVE EXTREME WEATHER WARNINGS' : language === 'te' ? 'తీవ్రమైన వాతావరణ అలర్ట్ ప్యానెల్' : 'सक्रिय चरम मौसम सावधानी प्रणाल'}
              </h3>
              <p className="text-[10px] text-stone-400 font-semibold tracking-wide">
                {language === 'en' ? 'Live connected to IMD agrometeorological advisory broadcasts' : 'ఇండియన్ మెటీరియాలజికల్ డిపార్ట్మెంట్ తక్షణ సమాచార శ్రేణి'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {/* Simulation push button directly on UI to let user prove it! */}
            <button
              id="simulate-realtime-push-btn"
              onClick={triggerSimulationPush}
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-[10px] uppercase py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-red-900/10 cursor-pointer border border-red-500/30"
              title="Click here to emulate a live incoming extreme weather push notification."
            >
              <Zap className="w-3.5 h-3.5 animate-flash" />
              <span>{language === 'en' ? 'Simulate Real-Time Alert' : 'లవ్ అలర్ట్ సిమ్యులేట్'}</span>
            </button>
          </div>
        </div>

        {/* Content Section listing active alerts */}
        <div className="p-6">
          {activeCount === 0 ? (
            <div id="no-weather-alerts-placeholder" className="text-center py-8 space-y-3.5">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 text-sm font-display">
                  {language === 'en' ? 'All Clear! No Extreme Weather Warnings' : language === 'te' ? 'వాతావరణం ప్రశాంతంగా ఉంది! ఎటువంటి ప్రమాదాలు లేవు' : 'मौसम साफ़ है! कोई चेतावनी नहीं'}
                </h4>
                <p className="text-xs text-stone-500 font-medium">
                  {language === 'en' ? 'Feel free to continue scheduled transplantation and field weeding activities safely.' : 'ఈరోజు మీ వ్యవసాయ పనులను సురక్షితంగా నిర్వహించుకోవచ్చు.'}
                </p>
              </div>
              <button
                id="reset-simulation-alerts-btn"
                onClick={() => {
                  setAlerts(INITIAL_ALERTS);
                  setExpandedAlert('alert-1');
                }}
                className="text-[11px] font-bold text-green-700 bg-green-50 hover:bg-green-100 py-2 px-4 rounded-xl cursor-pointer transition-colors"
              >
                🔄 {language === 'en' ? 'Reload Sample Warnings' : 'నమూనా హెచ్చరికలను లోడ్ చేయి'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side: Alert listings */}
              <div className="lg:col-span-5 space-y-3" id="alerts-listing-rail">
                <span className="text-[10px] text-stone-400 font-extrabold uppercase tracking-widest pl-1">
                  {language === 'en' ? `Active Warning Feeds (${activeCount})` : `సచేతన ప్రమాద నివేదికలు (${activeCount})`}
                </span>
                
                {alerts.map((alert) => {
                  if (alert.acknowledged) return null;
                  const isExp = expandedAlert === alert.id;
                  
                  return (
                    <div
                      key={alert.id}
                      id={`alert-card-item-${alert.id}`}
                      onClick={() => setExpandedAlert(alert.id)}
                      className={`p-4 rounded-2xl border transition-all text-left cursor-pointer relative overflow-hidden ${
                        isExp 
                          ? 'bg-stone-50 border-stone-800 ring-1 ring-stone-900 shadow-sm' 
                          : 'bg-white border-stone-200 hover:bg-stone-50/50 shadow-xs'
                      }`}
                    >
                      {/* Warning highlight left ribbon strip */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                        alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'severe' ? 'bg-amber-500' : 'bg-yellow-400'
                      }`} />

                      <div className="pl-2 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                            alert.severity === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {alert.severity}
                          </span>
                          <span className="text-[10px] text-stone-400 font-bold">{alert.timeIssued}</span>
                        </div>

                        <h4 className="font-bold text-stone-900 text-xs md:text-sm font-display tracking-tight leading-tight mt-1.5">
                          {alert.title[language]}
                        </h4>
                        
                        <p className="text-[10px] font-bold text-stone-550 flex items-center gap-1">
                          📍 {alert.region[language]}
                        </p>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] text-green-700 font-bold hover:underline">
                            {isExp ? (language === 'en' ? 'Viewing Guide' : 'చూస్తున్నాము') : (language === 'en' ? 'Tap to view safety precautions' : 'క్లిక్ చేయండి')}
                          </span>
                          <button
                            id={`ack-button-${alert.id}`}
                            onClick={(e) => handleAcknowledge(alert.id, e)}
                            className="text-[9px] bg-stone-100 dark:bg-stone-200 hover:bg-stone-200 font-extrabold uppercase px-2 py-1 rounded-lg text-stone-600 transition-colors"
                            title={language === 'en' ? 'Mute/Dismiss' : 'ఆపు'}
                          >
                            {language === 'en' ? 'Mute' : 'సమ్మతించు'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Side: PRECATIONARY STEPS AND AUDIO GUIDELINE DRAWER FOR SELECTED WARNING */}
              <div className="lg:col-span-7 bg-stone-50 border border-stone-200/85 rounded-3xl p-5" id="alert-action-pane">
                {expandedAlert ? (
                  (() => {
                    const alert = alerts.find(a => a.id === expandedAlert);
                    if (!alert) return <div className="text-xs text-stone-400 text-center py-12">Select an alert feed to investigate</div>;

                    const isSpeechActive = activeSpeechId === alert.id;

                    return (
                      <div className="space-y-4">
                        
                        {/* Title details bar */}
                        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-stone-200">
                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Agricultural Mitigation Precaution Manual</span>
                            <h3 className="text-sm md:text-base font-extrabold text-stone-900 font-display mt-0.5">
                              {alert.title[language]}
                            </h3>
                          </div>

                          <div className="flex gap-2">
                            {/* Speech Announce Button */}
                            <button
                              id="alert-pane-speak-btn"
                              onClick={() => handleVoiceReadAlert(alert)}
                              className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                                isSpeechActive 
                                  ? 'bg-red-500 text-white animate-pulse' 
                                  : 'bg-green-600 hover:bg-green-700 text-white'
                              }`}
                            >
                              {isSpeechActive ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              <span>{isSpeechActive ? (language === 'en' ? 'Mute Speech' : 'ఆపు') : (language === 'en' ? 'Read Warning Out Loud' : 'సలహా వినండి')}</span>
                            </button>
                          </div>
                        </div>

                        {/* Summary Block */}
                        <div className="bg-white/60 p-4 rounded-2xl border border-stone-150 relative overflow-hidden">
                          <p className="text-xs md:text-sm font-semibold text-stone-700 leading-relaxed italic">
                            "{alert.description[language]}"
                          </p>
                          <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold text-stone-500">
                            <span className="text-red-500">⚠ STATUS: ACTIVE WARNING</span>
                            <span>•</span>
                            <span>📍 target: {alert.region[language]}</span>
                          </div>
                        </div>

                        {/* Interactive Precaution Action Checklists */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-extrabold uppercase text-stone-400 tracking-wider">
                            🛡 {language === 'en' ? 'Crop Precaution Checklist for Farmers' : 'రైతు ప్రాధమిక రక్షణ చర్యల క్రమ పట్టిక'}
                          </h4>

                          <div className="space-y-2">
                            {alert.precautions[language].map((preca, index) => {
                              const uniqueKey = `${alert.id}-preca-${index}`;
                              const isChecked = !!checkedPreca[uniqueKey];
                              return (
                                <div
                                  key={index}
                                  onClick={() => togglePrecaution(uniqueKey)}
                                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                                    isChecked 
                                      ? 'bg-green-50/50 border-green-200 text-stone-650 line-through decoration-green-400 decoration-2' 
                                      : 'bg-white border-stone-200 hover:border-stone-300 text-stone-850'
                                  }`}
                                >
                                  <div className="shrink-0 mt-0.5">
                                    {isChecked ? (
                                      <div className="w-4.5 h-4.5 bg-green-600 rounded-full flex items-center justify-center text-white">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                      </div>
                                    ) : (
                                      <div className="w-4.5 h-4.5 border-2 border-stone-350 rounded-md hover:border-stone-500 transition-colors" />
                                    )}
                                  </div>
                                  <span className="text-xs font-bold leading-relaxed">
                                    {preca}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Advisory footnote */}
                        <div className="bg-stone-100 p-3 rounded-xl flex items-center gap-1.5 text-[10px] font-extrabold text-stone-400">
                          <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>Ensure immediate compliance. Share these details locally using farmer cooperative radio or offline announcements.</span>
                        </div>

                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-24 space-y-2 text-stone-400">
                    <ShieldAlert className="w-10 h-10 mx-auto opacity-40 animate-pulse text-stone-400" />
                    <p className="text-xs font-bold uppercase tracking-wider">{language === 'en' ? 'No Alert Card Selected' : 'ప్రమాద నివేదికను ఎంచుకోండి'}</p>
                    <p className="text-[11px] leading-relaxed max-w-xs mx-auto">
                      {language === 'en' ? 'Click on any of the left severe weather cards to investigate safety strategies and activate voice announcement modes.' : 'వివరాలు పొందటానికి ఎడమ వైపున గల ఏదైనా ఒక అలర్టును ట్యాప్ చేయండి.'}
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
