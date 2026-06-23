import { useState, useEffect } from 'react';
import { SupportedLanguage } from '../utils/translator';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, Navigation, X, HelpCircle } from 'lucide-react';

interface VoiceAssistantProps {
  language: SupportedLanguage;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAnnounceMessage?: string; // Read changes if custom trigger is sent
}

export default function VoiceAssistant({ language, activeTab, setActiveTab, onAnnounceMessage }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechMessage, setSpeechMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setSpeechSupported(true);
    } else {
      setSpeechSupported(false);
    }

    const handleSpeechState = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setIsReadingAloud(detail.isSpeaking && !detail.isPaused);
      }
    };

    window.addEventListener('speech-state-changed', handleSpeechState);
    return () => {
      window.removeEventListener('speech-state-changed', handleSpeechState);
    };
  }, []);

  // Centralized high-clarity multi-lingual Speech Dispatcher
  const speakText = (text: string) => {
    if (!text) return;
    window.dispatchEvent(
      new CustomEvent('play-speech', {
        detail: {
          text,
          title: language === 'en' ? 'Voice Assistant' : language === 'te' ? 'వాయిస్ సహాయకుడు' : 'कृषि आवाज मित्र',
          language: language,
        },
      })
    );
  };

  const stopSpeaking = () => {
    window.dispatchEvent(
      new CustomEvent('speech-state-changed', {
        detail: { isSpeaking: false, isPaused: false },
      })
    );
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Announce page changes automatically for accessibility
  useEffect(() => {
    let msg = '';
    if (language === 'en') {
      msg = `You are on the ${activeTab} page.`;
    } else if (language === 'te') {
      msg = `మీరు ప్రస్తుతం ${getTabNameInTelugu(activeTab)} విభాగంలో ఉన్నారు.`;
    } else if (language === 'hi') {
      msg = `आप अभी ${getTabNameInHindi(activeTab)} पेज पर हैं।`;
    }
    
    // Optionally speak on load if assistant pane is open, or just display assistant help
    if (isOpen) {
      speakText(msg);
    }
  }, [activeTab]);

  // Handle voice commands
  const handleVoiceCommand = (commandText: string) => {
    setIsListening(true);
    setSpeechMessage(language === 'en' ? `Processing command: "${commandText}"` : language === 'te' ? `ప్రాసెస్ చేస్తున్నాము: "${commandText}"` : `आदेश संसाधित कर रहा है: "${commandText}"`);

    setTimeout(() => {
      const normalized = commandText.toLowerCase();
      let matchFound = false;
      let reply = '';

      if (normalized.includes('recommend') || normalized.includes('crop') || normalized.includes('సలహా') || normalized.includes('పంట') || normalized.includes('सलाह')) {
        setActiveTab('recommend');
        reply = language === 'en' ? 'Opening AI Crop Recommendation Advisor.' : language === 'te' ? 'పంట సలహాదారు విభాగం ఓపెన్ చేయబడింది.' : 'फसल सलाहकार पेज खोला जा रहा है।';
        matchFound = true;
      } else if (normalized.includes('disease') || normalized.includes('diagnose') || normalized.includes('తెగులు') || normalized.includes('बीमारी') || normalized.includes('कीट')) {
        setActiveTab('disease');
        reply = language === 'en' ? 'Disease Scanner console loaded.' : language === 'te' ? 'వ్యాధి మరియు తెగుళ్ళు గుర్తింపు సెక్షన్ లోడ్ చేయబడింది.' : 'फसल बीमारी निदान स्कैनर खोला गया।';
        matchFound = true;
      } else if (normalized.includes('chat') || normalized.includes('kisan') || normalized.includes('బాట్') || normalized.includes('चैट')) {
        setActiveTab('chatbot');
        reply = language === 'en' ? 'Kisan AI Chatbot at your service.' : language === 'te' ? 'కిసాన్ AI చాట్‌బాట్ సేవకు సిద్ధంగా ఉంది.' : 'किसान चैटबॉट चालू है।';
        matchFound = true;
      } else if (normalized.includes('weather') || normalized.includes('rain') || normalized.includes('వాతావరణం') || normalized.includes('मौसम')) {
        setActiveTab('weather');
        reply = language === 'en' ? 'Weather and Rain conditions panel is open.' : language === 'te' ? 'వాతావరణం సమాచారం ఇక్కడ ఉంది.' : 'मौसम और बारिश की जानकारी देखें।';
        matchFound = true;
      } else if (normalized.includes('market') || normalized.includes('price') || normalized.includes('దర') || normalized.includes('खरीद') || normalized.includes('दाम')) {
        setActiveTab('marketplace');
        reply = language === 'en' ? 'Welcome to Farmer Marketplace.' : language === 'te' ? 'రైతు పంటల మార్కెట్ కి స్వాగతం.' : 'फसल मंडी बाजार में आपका स्वागत है।';
        matchFound = true;
      } else if (normalized.includes('rent') || normalized.includes('tractor') || normalized.includes('అద్దె') || normalized.includes('किराया')) {
        setActiveTab('rental');
        reply = language === 'en' ? 'Equipment Rental listings active.' : language === 'te' ? 'వ్యవసాయ పరికరాల అద్దె విభాగం సిద్ధంగా ఉంది.' : 'किराये के उपकरण का विवरण लोड किया गया।';
        matchFound = true;
      } else if (normalized.includes('scheme') || normalized.includes('kisan') || normalized.includes('పథకాలు') || normalized.includes('योजना')) {
        setActiveTab('schemes');
        reply = language === 'en' ? 'Government agricultural support programs loaded.' : language === 'te' ? 'ప్రభుత్వ వ్యవసాయ పథకాలు ఇక్కడ చూడవచ్చు.' : 'सरकारी योजनाओं की सूची खुली है।';
        matchFound = true;
      }

      if (matchFound) {
        speakText(reply);
        setSpeechMessage(reply);
      } else {
        const fallback = language === 'en' 
          ? `Could not fully match "${commandText}". Try saying Crop Advisor, Disease Scanner, or Weather.` 
          : language === 'te' 
          ? `"${commandText}" గుర్తించబడలేదు. పంట సహాయం, తెగుళ్ల గుర్తింపు లేదా వాతావరణం అని చెప్పి ప్రయత్నించండి.`
          : `"${commandText}" समझ नहीं आया। 'फसल सलाहकार', 'बीमारी स्कैनर', या 'मौसम' बोलकर प्रयास करें।`;
        speakText(fallback);
        setSpeechMessage(fallback);
      }
      setIsListening(false);
    }, 1200);
  };

  // Trigger Native Speech Recognition (Web Speech API) if supported; otherwise trigger graceful simulators
  const startVoiceCapture = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);
        setSpeechMessage(language === 'en' ? 'Listening now... Click microphone to stop' : language === 'te' ? 'వింటున్నాము... మాట్లాడండి' : 'सुन रहा है... कृपया बोलें');
        
        recognition.start();

        recognition.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript;
          handleVoiceCommand(resultText);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech Recognition Error', event.error);
          setIsListening(false);
          // If microphone is blocked (common in embedded iframes), triggers simulated assistant immediately!
          triggerFallbackDictation();
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } catch (err) {
        triggerFallbackDictation();
      }
    } else {
      triggerFallbackDictation();
    }
  };

  const triggerFallbackDictation = () => {
    setIsListening(true);
    setSpeechMessage(language === 'en' ? 'Speech setup restricted inside browser container. Loading voice input assistant...' : 'వాయిస్ ఇన్పుట్ సహాయం లోడ్ అవుతోంది...');
    setIsOpen(true);
  };

  const getTabNameInTelugu = (tab: string) => {
    switch (tab) {
      case 'home': return 'ముఖ్య';
      case 'recommend': return 'పంట పెంపకం మరియు సలహాదారు';
      case 'disease': return 'తెగులు గుర్తింపు స్కానర్';
      case 'chatbot': return 'కిసాన్ AI సహాయం';
      case 'weather': return 'వాతావరణం మరియు సలహాలు';
      case 'marketplace': return 'రైతు మార్కెట్ కొనుగోలు అమ్మకం';
      case 'rental': return 'వ్యవసాయ యంత్రాల అద్దె';
      case 'schemes': return 'ప్రభుత్వ యోజనలు మరియు పథకాలు';
      case 'learning': return 'శిక్షణా కేంద్రం';
      case 'prices': return 'మార్కెట్ పంటల ధరల సూచిక';
      case 'contact': return 'నిపుణుల సంప్రదింపు కేబిన్';
      default: return 'అగ్రి కనెక్ట్';
    }
  };

  const getTabNameInHindi = (tab: string) => {
    switch (tab) {
      case 'home': return 'मुख्य';
      case 'recommend': return 'फसल सल्लाह सलाहकार';
      case 'disease': return 'फसल बीमारी स्केनर';
      case 'chatbot': return 'किसान एआई मित्र';
      case 'weather': return 'मौसम और बुवाई जानकारी';
      case 'marketplace': return 'फसल मंडी बाजार';
      case 'rental': return 'किराये के कृषि उपकरण';
      case 'schemes': return 'सरकारी कृषि योजनाएं';
      case 'learning': return 'कृषि ज्ञान केंद्र';
      case 'prices': return 'फसल मंडी बाजार भाव';
      case 'contact': return 'कृषि विशेषज्ञ संपर्क';
      default: return 'एग्री कनेक्ट';
    }
  };

  // Read current page instructions aloud based on current active tab
  const readPageAloud = () => {
    let contentToSpeak = '';
    
    if (activeTab === 'home') {
      contentToSpeak = language === 'en' 
        ? "Welcome to Agri-Connect AI, your smart farming web platform. This portal offers AI powered Crop advisors, Disease diagnosis, Weather warnings, equipment shares, and market rates. Press the buttons below to investigate."
        : language === 'te' 
        ? "స్మార్ట్ వ్యవసాయ పోర్టల్ అగ్రి కనెక్ట్ కు స్వాగతం. ఇక్కడ మీరు ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ సహాయంతో పంటల అంచనా, తెగుళ్ల నివారణ, ఉచిత వాతావరణ హెచ్చరికలు, యంత్రాల అద్దె మరియు మార్కెట్ రేట్లు తెలుసుకోవచ్చు."
        : "स्मार्ट खेती पोर्टल एग्री-कनेक्ट में आपका स्वागत है। यहाँ आप एआई की मदद से फसलों की सलाह, पत्तों की बीमारी का इलाज, मौसम रिपोर्ट, किराये के औजार और मंडी के भाव देख सकते हैं।";
    } else if (activeTab === 'recommend') {
      contentToSpeak = language === 'en'
        ? "Enter your soil category, seasonal period, water supply levels, and financial cultivation budget, then press Get AI Recommendations button to discover top yielding crops suggested by agronomist intelligence."
        : language === 'te'
        ? "మీ నేల రకము, వ్యవసాయ కాలం, నీటి సదుపాయం మరియు బడ్జెట్ నమోదు చేసి పొలంలో పండించడానికి అత్యంత లాభదాయకమైన పంటల వివరాలు తెలుసుకోండి."
        : "अपनी मिट्टी का प्रकार, मौसम, पानी की सुविधा और बजट का चयन करें और एआई फसल सलाहकार से सर्वोत्तम पैदावार वाली फसलों की सूची देखें।";
    } else if (activeTab === 'disease') {
      contentToSpeak = language === 'en'
        ? "Agricultural Disease Diagnoser page. Drag and drop plant leaf photos here or tap our interactive sample cards of diseased paddy, cotton, or chilli leaf to let Gemini AI diagnose pathogen symptoms and outline treatments."
        : language === 'te'
        ? "పంటలకు వచ్చే తెగుళ్ళ గుర్తింపు పేజీ. మీ జబ్బు పడిన ఆకుల ఫోటోలను ఇక్కడ అప్‌లోడ్ చేసి, వాటికి కావాల్సిన నివారణ చర్యలను పొందండి."
        : "फसल बीमारी स्कैनर। यहाँ अपनी पीड़ित फसल की पत्ती की तस्वीर अपलोड करें, या नीचे दिए गए नमूनों में से फसल चुनकर बीमारी का तुरंत पता लगाएं।";
    } else if (activeTab === 'chatbot') {
      contentToSpeak = language === 'en'
        ? "This is Kisan Mitra AI Chat assistance. Ask any question about seeds, tractor service, organic bio composts, or subsidy programs, and receive immediate multi-lingual farming guidelines."
        : language === 'te'
        ? "ఇది కిసాన్ మిత్ర నిపుణుల సేవ. మీ వ్యవసాయ సందేహాలను కింద ఉన్న చాట్ బాక్స్ లో టైప్ చేసి సమాధానాలు గెలుచుకోండి."
        : "यह किसान मित्र कृषि चैट सेवा है। यहाँ खाद, कीटनाशक, बीज, सिंचाई या सरकारी अनुदान की योजनाओं के बारे में कोई भी सवाल पूछें।";
    } else {
      contentToSpeak = language === 'en'
        ? `Viewing agricultural ${activeTab} dashboard. You can read current state info on-screen, toggling multi language script settings at any time.`
        : `వ్యవసాయ ${activeTab} సమాచారము. పైన ఉన్న బటన్ల సహాయంతో మీ ప్రాధాన్యతలను అనుకూల పరుచుకోవచ్చు.`;
    }

    speakText(contentToSpeak);
  };

  const interactiveCommands = [
    { en: "Recommend crops", te: "పంట పంటల సలహాదారు", hi: "फसल सलाहकार खोलें" },
    { en: "Scan crop disease", te: "తెగులు గుర్తింపు మార్గం", hi: "फसल रोग निदान" },
    { en: "Talk to chatbot", te: "కిసాన్ చాట్‌బాట్ సాయం", hi: "किसान चैटबॉट" },
    { en: "Check weather report", te: "వాతావరణం రేటు", hi: "मौसम की स्थिति देखें" },
    { en: "Show schemes list", te: "పథకాల వివరాలు", hi: "सरकारी योजनाएं" },
    { en: "Farmer market", te: "మార్కెట్ పంటల ధర", hi: "फसल मंडी भाव" }
  ];

  return (
    <div id="voice-assistant-dock" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
      
      {/* Expanded Interface panel */}
      {isOpen && (
        <div className="bg-white rounded-[28px] p-5 shadow-2xl border border-stone-200 w-80 max-w-xs transition-transform duration-300 transform scale-100">
          <div className="flex items-center justify-between pb-3 border-b-2 border-stone-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <h4 className="font-bold text-stone-900 font-display text-sm">
                {language === 'en' ? 'AI Voice Assistant' : language === 'te' ? 'కిసాన్ వాయిస్ సహాయకుడు' : 'कृषि आवाज मित्र'}
              </h4>
            </div>
            <button 
              id="close-voice-panel"
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Display message status */}
            <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-green-850 font-bold block mb-1">
                {isListening ? 'Assistant Listening' : 'System Messages'}
              </span>
              <p className="text-xs text-stone-750 leading-relaxed font-semibold">
                {speechMessage || (
                  language === 'en' ? 'Click mic or pick a quick option below to navigate AgriConnect AI.' :
                  language === 'te' ? 'వాయిస్ ప్రయోజనాలను పరీక్షించటానికి కింద ఉన్న ఆదేశాలపై క్లిక్ చేయండి.' :
                  'नीचे दिए गए किसी एक विकल्प पर क्लिक करें या आवाज सहायक से पूछें।'
                )}
              </p>
            </div>

            {/* Read Page Out Aloud Trigger */}
            <button
              id="speak-page-trigger"
              onClick={readPageAloud}
              className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all text-xs font-bold ${isReadingAloud ? 'bg-red-50 text-red-750 border border-red-200' : 'bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-100'}`}
            >
              {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isReadingAloud ? (language === 'en' ? 'Stop Speaking' : 'చదవడం ఆపు') : (language === 'en' ? 'Read Page Out Aloud' : 'ఈ పేజీని చదివి వినిపించు')}</span>
            </button>

            {/* Quick action buttons - highly helpful for rural/elderly farmers */}
            <div>
              <span className="text-[10px] text-stone-500 font-bold block mb-1.5 uppercase font-display tracking-wider">
                {language === 'en' ? 'Tap Speak Command' : language === 'te' ? 'ఆదేశాల జాబితా (క్లిక్ చేయండి)' : 'आवाज आदेश सूची (क्लिक करें)'}:
              </span>
              <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {interactiveCommands.map((item, idx) => {
                  const label = language === 'en' ? item.en : language === 'te' ? item.te : item.hi;
                  return (
                    <button
                      key={idx}
                      id={`voice-cmd-${idx}`}
                      onClick={() => handleVoiceCommand(item.en)}
                      className="bg-stone-50 hover:bg-green-50/50 text-left py-2 px-3 border border-stone-200 rounded-xl text-xs hover:border-green-300 text-stone-700 hover:text-green-900 transition-all font-semibold flex items-center justify-between cursor-pointer"
                    >
                      <span>{label}</span>
                      <Navigation className="w-3 h-3 text-green-600 rotate-45" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-150 flex items-center justify-between text-[10px] text-stone-400 font-bold font-display">
            <span>Powered by Gemini AI</span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-stone-400" />
              {language === 'en' ? 'Supports Telugu, Hindi' : 'తెలుగు మరియు హిందీ సదుపాయం'}
            </span>
          </div>
        </div>
      )}

      {/* Floating Microphone button */}
      <div className="flex items-center gap-2.5">
        <button
          id="main-voice-mic-btn"
          onClick={startVoiceCapture}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-transform hover:scale-105 active:scale-95 ${isListening ? 'bg-red-600 animate-pulse text-white shadow-lg' : 'bg-green-600 text-white hover:bg-green-700 shadow-md'}`}
          title={language === 'en' ? 'Kisan Voice Assistant' : 'వాయిస్ సహాయకుడు'}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        
        {/* Toggle expanded panel helper button */}
        <button
          id="toggle-voice-panel-btn"
          onClick={() => { setIsOpen(!isOpen); stopSpeaking(); }}
          className="bg-white text-stone-800 border border-stone-200 h-10 px-4 rounded-full text-xs font-bold shadow-md hover:bg-stone-50 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-green-600 animate-pulse" />
          <span>{isOpen ? (language === 'en' ? 'Close' : 'మూసివేయి') : (language === 'en' ? 'Voice Panel' : 'వాయిస్ ప్యానెల్')}</span>
        </button>
      </div>
      
    </div>
  );
}
