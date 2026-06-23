import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { SupportedLanguage } from '../utils/translator';
import { User, Phone, MapPin, Check, PlusCircle, LogIn, RefreshCw } from 'lucide-react';

interface AuthModalProps {
  language: SupportedLanguage;
  onProfileUpdate: (profile: UserProfile | null) => void;
  currentProfile: UserProfile | null;
}

export default function AuthModal({ language, onProfileUpdate, currentProfile }: AuthModalProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Registration form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('Andhra Pradesh');
  const [soilType, setSoilType] = useState('Red Soil');
  const [primaryCrop, setPrimaryCrop] = useState('Paddy');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [msg, setMsg] = useState('');

  // Check for pre-existing session
  useEffect(() => {
    const saved = localStorage.getItem('agri_farmer_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        onProfileUpdate(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !location) {
      setMsg(language === 'en' ? 'Please fill out all basic fields' : language === 'te' ? 'దయచేసి అన్ని వివరాలు నింపండి' : 'कृपया सभी विवरण भरें');
      return;
    }
    
    const newProfile: UserProfile = {
      id: 'farmer_' + Date.now().toString().slice(-6),
      name,
      phone,
      email: name.toLowerCase().replace(/\s+/g, '') + '@agriconnect.com',
      role: 'Farmer',
      location,
      state,
      soilType,
      primaryCrop,
      preferredLanguage: language
    };

    localStorage.setItem('agri_farmer_profile', JSON.stringify(newProfile));
    
    // Also seed a default farmer record list to simulated database if none exists
    const existingFarmers = localStorage.getItem('agri_farmers_list');
    const list = existingFarmers ? JSON.parse(existingFarmers) : [];
    list.push(newProfile);
    localStorage.setItem('agri_farmers_list', JSON.stringify(list));

    onProfileUpdate(newProfile);
    setMsg(language === 'en' ? 'Profile Registered Successfully!' : language === 'te' ? 'ఖాతా విజయవంతంగా సృష్టించబడింది!' : 'प्रोफ़ाइल सफलतापूर्वक बनाई गई!');
    setTimeout(() => {
      setIsOpen(false);
      setMsg('');
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone) {
      setMsg(language === 'en' ? 'Please enter your phone number' : language === 'te' ? 'దయచేసి మీ ఫోన్ నెంబర్ నమోదు చేయండి' : 'कृपया अपना फोन नंबर दर्ज करें');
      return;
    }

    const savedList = localStorage.getItem('agri_farmers_list');
    const farmers: UserProfile[] = savedList ? JSON.parse(savedList) : [];
    const found = farmers.find(f => f.phone === loginPhone);

    if (found) {
      localStorage.setItem('agri_farmer_profile', JSON.stringify(found));
      onProfileUpdate(found);
      setMsg(language === 'en' ? 'Welcome back, ' + found.name + '!' : language === 'te' ? 'మళ్ళీ స్వాగతం, ' + found.name + '!' : 'स्वागत है, ' + found.name + '!');
      setTimeout(() => {
        setIsOpen(false);
        setMsg('');
      }, 1500);
    } else {
      // Create a dummy active profile if none was found in history, to make user testing friendly!
      const fallbackProfile: UserProfile = {
        id: 'farmer_demo',
        name: 'Kishan Kumar',
        phone: loginPhone,
        email: 'farmer@agriconnect.com',
        role: 'Farmer',
        location: 'Vijayawada / Guntur',
        state: 'Andhra Pradesh',
        soilType: 'Black Cotton Soil',
        primaryCrop: 'Chilli',
        preferredLanguage: language
      };
      
      localStorage.setItem('agri_farmer_profile', JSON.stringify(fallbackProfile));
      // Save in registry too
      farmers.push(fallbackProfile);
      localStorage.setItem('agri_farmers_list', JSON.stringify(farmers));

      onProfileUpdate(fallbackProfile);
      setMsg(language === 'en' ? 'Demo account created for ' + loginPhone : 'డెమో ఖాతా విజయవంతంగా సృష్టించబడింది');
      setTimeout(() => {
        setIsOpen(false);
        setMsg('');
      }, 1500);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('agri_farmer_profile');
    onProfileUpdate(null);
  };

  return (
    <div className="relative inline-block" id="auth-section">
      {currentProfile ? (
        <div className="flex items-center gap-2.5 bg-stone-100 border border-stone-200 py-1.5 px-3 rounded-full shadow-xs">
          <div className="w-7.5 h-7.5 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {currentProfile.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-left hidden sm:block leading-none">
            <p className="text-xs font-bold text-stone-800">{currentProfile.name}</p>
            <p className="text-[9px] text-stone-500 font-mono mt-0.5">{currentProfile.phone}</p>
          </div>
          <button 
            id="logout-btn"
            onClick={handleLogout}
            className="text-[10px] bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold py-1 px-3 rounded-full transition-colors ml-1 cursor-pointer"
          >
            {language === 'en' ? 'Logout' : language === 'te' ? 'లాగౌట్' : 'लॉगआउट'}
          </button>
        </div>
      ) : (
        <button
          id="login-trigger-btn"
          onClick={() => { setIsOpen(true); setMsg(''); }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 shadow-md shadow-green-100/80 text-xs uppercase tracking-wider flex items-center gap-2 rounded-full cursor-pointer transition-all duration-200"
        >
          <LogIn className="w-4 h-4" />
          <span>{language === 'en' ? 'Farmer Login' : language === 'te' ? 'రైతు లాగిన్' : 'किसान लॉगिन'}</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsOpen(false)}></div>
          
          <div id="auth-modal-card" className="bg-white rounded-[28px] w-full max-w-md shadow-2xl relative z-10 overflow-hidden border border-stone-200 transform scale-100 transition-all duration-300">
            {/* Header banner */}
            <div className="bg-stone-900 h-24 p-6 flex items-end relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-15">
                <User className="w-24 h-24 text-stone-400 -mr-4 -mt-4" />
              </div>
              <div className="text-white z-10">
                <h3 className="text-lg font-bold font-display text-white">
                  {isRegistering 
                    ? (language === 'en' ? 'Farmer Registration' : language === 'te' ? 'కొత్త రైతు నమోదు' : 'किसान पंजीकरण')
                    : (language === 'en' ? 'Farmer Portal Login' : language === 'te' ? 'రైతు ఖాతా లాగిన్' : 'किसान लोगिन')}
                </h3>
                <p className="text-xs text-stone-300 mt-1 font-medium">
                  {isRegistering 
                    ? (language === 'en' ? 'Create a free profile to track your crops' : language === 'te' ? 'ఉచిత రైతు ప్రొఫైల్ సృష్టించండి' : 'खेती के लिए निःशुल्क खाता बनाएं')
                    : (language === 'en' ? 'Access crop advisor & buy/sell options' : language === 'te' ? 'మీ సేవలను ఇక్కడ పొందండి' : 'व्यक्तिगत फसल सेवाओं का उपयोग करें')}
                </p>
              </div>
            </div>

            <div className="p-6">
              {msg && (
                <div className={`p-3 rounded-xl mb-4 text-xs font-semibold text-center ${msg.includes('Success') || msg.includes('విజయవంతంగా') || msg.includes('सफलतापूर्वक') ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-rose-50 text-rose-850 border border-rose-100'}`}>
                  {msg}
                </div>
              )}

              {isRegistering ? (
                // REGISTRATION FORM
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5 font-display uppercase tracking-wider">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      {language === 'en' ? 'Full Name' : language === 'te' ? 'రైతు పూర్తి పేరు' : 'पूरा नाम'} *
                    </label>
                    <input
                      id="reg-name"
                      type="text"
                      required
                      placeholder={language === 'en' ? 'Enter your name' : language === 'te' ? 'పేరు వ్రాయండి' : 'अपना नाम दर्ज करें'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all font-semibold text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5 font-display uppercase tracking-wider">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      {language === 'en' ? 'Mobile Number' : language === 'te' ? 'మొబైల్ సంఖ్య' : 'मोबाइल नंबर'} *
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      maxLength={10}
                      placeholder={language === 'en' ? '10 digit mobile number' : language === 'te' ? '10 అంకెల నెంబర్' : '10 अंकों का फोन नंबर'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-xs px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all font-semibold font-mono tracking-wider text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5 font-display uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {language === 'en' ? 'Village / Town' : language === 'te' ? 'గ్రామం / పట్టణం' : 'गाँव / शहर'} *
                      </label>
                      <input
                        id="reg-location"
                        type="text"
                        required
                        placeholder={language === 'en' ? 'Village' : language === 'te' ? 'ప్రాంతం' : 'गाँव का नाम'}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full text-xs px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all font-semibold text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1 font-display uppercase tracking-wider">
                        {language === 'en' ? 'State' : language === 'te' ? 'రాష్ట్రం' : 'राज्य'}
                      </label>
                      <select
                        id="reg-state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full text-xs px-3 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-green-500 focus:bg-white font-semibold text-stone-800"
                      >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Rajasthan">Rajasthan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1 font-display uppercase tracking-wider">
                        {language === 'en' ? 'Soil Type' : language === 'te' ? 'నేల రకం' : 'मिट्टी का प्रकार'}
                      </label>
                      <select
                        id="reg-soil"
                        value={soilType}
                        onChange={(e) => setSoilType(e.target.value)}
                        className="w-full text-xs px-3 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-green-500 focus:bg-white font-semibold text-stone-800"
                      >
                        <option value="Red Soil">Red Soil</option>
                        <option value="Black Cotton Soil">Black Cotton Soil</option>
                        <option value="Sandy Soil">Sandy Loam</option>
                        <option value="Clay Alluvial">Clay/Alluvial</option>
                        <option value="Laterite Soil">Laterite Soil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1 font-display uppercase tracking-wider">
                        {language === 'en' ? 'Primary Crop' : language === 'te' ? 'ప్రధాన పంట' : 'मुख्य फसल'}
                      </label>
                      <select
                        id="reg-crop"
                        value={primaryCrop}
                        onChange={(e) => setPrimaryCrop(e.target.value)}
                        className="w-full text-xs px-3 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-green-500 focus:bg-white font-semibold text-stone-800"
                      >
                        <option value="Paddy">Paddy / Rice</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Chilli">Chilli</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Groundnut">Groundnut</option>
                        <option value="Millets">Millets</option>
                      </select>
                    </div>
                  </div>

                  <button
                    id="submit-reg"
                    type="submit"
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>{language === 'en' ? 'Register Profile' : language === 'te' ? 'ప్రొఫైల్ సృష్టించండి' : 'पंजीकरण पूरा करें'}</span>
                  </button>
                  
                  <div className="pt-2 text-center text-xs">
                    <button
                      id="toggle-login"
                      type="button"
                      onClick={() => setIsRegistering(false)}
                      className="text-green-700 hover:underline font-bold cursor-pointer"
                    >
                      {language === 'en' ? 'Already registered? Login here' : language === 'te' ? 'ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి' : 'पहले से पंजीकृत हैं? यहाँ लॉगिन करें'}
                    </button>
                  </div>
                </form>
              ) : (
                // LOGIN FORM
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-750 mb-1.5 flex items-center gap-1.5 font-display uppercase tracking-wider">
                      <Phone className="w-4 h-4 text-green-600" />
                      {language === 'en' ? 'Enter Mobile Number' : language === 'te' ? 'మీ మొబైల్ నెంబర్ వ్రాయండి' : 'अपना मोबाइल नंबर दर्ज करें'}
                    </label>
                    <p className="text-[11px] text-stone-500 mb-2">
                      {language === 'en' ? 'Access your pre-configured farmer dashboard profile immediately.' : language === 'te' ? 'మీ ప్రొఫైల్ సేవలను లోడ్ చేయడానికి మీ మొబైల్ నెంబర్ టైప్ చేయండి.' : 'अपनी किसान सेवाओं को लोड करने के लिए मोबाइल दर्ज करें।'}
                    </p>
                    <input
                      id="login-phone"
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="e.g. 9876543210"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-base px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all font-mono tracking-wider text-center text-stone-900"
                    />
                  </div>

                  <button
                    id="submit-login"
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>{language === 'en' ? 'Login Now' : language === 'te' ? 'లాగిన్ చేయండి' : 'लॉगिन करें'}</span>
                  </button>

                  <div className="pt-2 text-center text-xs">
                    <button
                      id="toggle-reg"
                      type="button"
                      onClick={() => setIsRegistering(true)}
                      className="text-green-700 hover:underline font-bold cursor-pointer"
                    >
                      {language === 'en' ? 'New Farmer? Register a Profile here' : language === 'te' ? 'కొత్త వ్యసాయ అకౌంట్? నమోదు చేసుకోండి' : 'नए किसान? यहाँ निःशुल्क पंजीकरण करें'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="bg-stone-50 p-4 border-t border-stone-100 flex justify-end">
              <button
                id="close-auth-modal"
                onClick={() => setIsOpen(false)}
                className="text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold py-1.5 px-4 rounded-full transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Close' : language === 'te' ? 'మూసివేయి' : 'बंद करें'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
