// Robust Speech Engine for Agri-Connect Voice Companion
import { SupportedLanguage } from './translator';

export type SpeechSpeed = 'slow' | 'normal' | 'fast';

export interface SpeechRequest {
  text: string;
  title: string;
  lang: SupportedLanguage;
}

export interface SpeechEngineState {
  currentTitle: string;
  currentText: string;
  isSpeaking: boolean;
  isPaused: boolean;
  speed: SpeechSpeed;
  lang: SupportedLanguage;
}

// Map speed name to actual numerical SpeechSynthesisUtterance rate
export const SPEED_MAP: Record<SpeechSpeed, number> = {
  slow: 0.9,     // 0.9x prevents slurring and is extremely legible
  normal: 1.0,   // standard crisp performance
  fast: 1.15,    // 1.15x for fast but clear pacing
};

let listeners: ((state: SpeechEngineState) => void)[] = [];
let voiceState: SpeechEngineState = {
  currentTitle: '',
  currentText: '',
  isSpeaking: false,
  isPaused: false,
  speed: 'normal',
  lang: 'en',
};

// Auto-lookup for Natural Indian Female Voices with smart multi-lingual priorities
export function getIndianFemaleVoice(lang: SupportedLanguage): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const femaleKeywords = [
    'veena', 'heera', 'raveena', 'zira', 'swara', 'lata', 'priya', 'sangeeta', 
    'vani', 'samantha', 'hazel', 'kalpana', 'swarna', 'shruti', 'mohan',
    'female', 'woman', 'girl'
  ];

  // Helper to score a voice based on how clear, natural, and native it sounds
  const rateVoice = (v: SpeechSynthesisVoice, targetLang: string): number => {
    let score = 0;
    const vLang = v.lang.toLowerCase().replace('_', '-');
    const vName = v.name.toLowerCase();

    // Determine country code match
    const isEnIndia = targetLang === 'en' && (vLang === 'en-in' || vLang.startsWith('en-in'));
    const isTeIndia = targetLang === 'te' && (vLang === 'te-in' || vLang.startsWith('te-in') || vLang.startsWith('tel'));
    const isHiIndia = targetLang === 'hi' && (vLang === 'hi-in' || vLang.startsWith('hi-in') || vLang.startsWith('hin'));
    const isEnGeneral = targetLang === 'en' && vLang.startsWith('en-');

    if (targetLang === 'te') {
      if (isTeIndia) score += 1000;
      else if (vLang.startsWith('te')) score += 500;
      else if (isHiIndia) score += 100; // Hindi possesses highly similar phonetic sounds as telugu
    } else if (targetLang === 'hi') {
      if (isHiIndia) score += 1000;
      else if (vLang.startsWith('hi')) score += 500;
      else if (isTeIndia) score += 100; // Telugu contains similar indian speech patterns (Sanskrit-derived phonemes)
    } else if (targetLang === 'en') {
      if (isEnIndia) score += 1000;
      else if (isEnGeneral) score += 500;
    }

    // Google Online voices are premium high quality text-to-speech models, extremely clear!
    if (vName.includes('google') || vName.includes('natural') || vName.includes('online')) {
      score += 50;
    }

    // Prefer a native speaker rather than an English speaker speaking another language
    if ((targetLang === 'te' && vLang.startsWith('te')) || 
        (targetLang === 'hi' && vLang.startsWith('hi')) ||
        (targetLang === 'en' && vLang.startsWith('en'))) {
      score += 200;
    }

    // Female voice preference if specified in keywords for soft acoustic profile
    if (femaleKeywords.some((kw) => vName.includes(kw))) {
      score += 30;
    }

    // Microsoft / Google Local High-quality voice premium
    if (vName.includes('microsoft') || vName.includes('narrator')) {
      score += 10;
    }

    return score;
  };

  // Rank all voices
  const rankedVoices = voices
    .map((v) => ({ voice: v, score: rateVoice(v, lang) }))
    .filter((v) => v.score > 0)
    .sort((a, b) => b.score - a.score);

  if (rankedVoices.length > 0) {
    return rankedVoices[0].voice;
  }

  // Fallback 1: Any Indian locale match
  const indianVoices = voices.filter((v) => {
    const vLang = v.lang.toLowerCase();
    return vLang.includes('-in') || vLang.includes('_in');
  });
  if (indianVoices.length > 0) {
    return indianVoices[0];
  }

  // Fallback 2: Any English/English-like default voice that has high clarity
  const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  if (englishVoices.length > 0) {
    return englishVoices[0];
  }

  // Fallback 3: Return default voice
  return voices[0] || null;
}

// Trigger state updates to all live React controllers
function notifyState() {
  listeners.forEach((l) => l({ ...voiceState }));
  
  // Dispatch standard domestic CustomEvent for simple triggers
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('speech-state-changed', { detail: voiceState })
    );
  }
}

let activeUtterance: SpeechSynthesisUtterance | null = null;

// Clean up actual system synthesis
function cancelSystemSpeech() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (activeUtterance) {
    activeUtterance.onend = null;
    activeUtterance.onerror = null;
    activeUtterance = null;
  }
}

export const VoiceEngine = {
  subscribe(callback: (state: SpeechEngineState) => void) {
    listeners.push(callback);
    callback({ ...voiceState });
    return () => {
      listeners = listeners.filter((v) => v !== callback);
    };
  },

  getState() {
    return { ...voiceState };
  },

  play(text: string, title: string, lang: SupportedLanguage) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    cancelSystemSpeech();

    // Clean up carriage returns/formatting tags
    const cleanedText = text.replace(/[*#_`~]/g, ' ').replace(/\s+/g, ' ').trim();

    voiceState.currentTitle = title;
    voiceState.currentText = cleanedText;
    voiceState.lang = lang;
    voiceState.isSpeaking = true;
    voiceState.isPaused = false;
    notifyState();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    activeUtterance = utterance;

    // Set proper language tag FIRST to assist browsers with proper phoneme initialization
    if (lang === 'te') {
      utterance.lang = 'te-IN';
    } else if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    // Direct voice configuration SECOND
    const femaleVoice = getIndianFemaleVoice(lang);
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    // Explicitly enforce full volume and natural default pitch for high fidelity acoustics
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Set speed rate
    utterance.rate = SPEED_MAP[voiceState.speed];

    utterance.onend = () => {
      voiceState.isSpeaking = false;
      voiceState.isPaused = false;
      activeUtterance = null;
      notifyState();
    };

    utterance.onerror = () => {
      voiceState.isSpeaking = false;
      voiceState.isPaused = false;
      activeUtterance = null;
      notifyState();
    };

    window.speechSynthesis.speak(utterance);
  },

  pause() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
      voiceState.isPaused = true;
      notifyState();
    }
  },

  resume() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
      voiceState.isPaused = false;
      voiceState.isSpeaking = true;
      notifyState();
    }
  },

  stop() {
    cancelSystemSpeech();
    voiceState.isSpeaking = false;
    voiceState.isPaused = false;
    voiceState.currentText = '';
    voiceState.currentTitle = '';
    notifyState();
  },

  setSpeed(speed: SpeechSpeed) {
    voiceState.speed = speed;
    notifyState();
    
    // Re-synthesize at new rate if currently speaking
    if (voiceState.isSpeaking && voiceState.currentText) {
      const savedText = voiceState.currentText;
      const savedTitle = voiceState.currentTitle;
      const savedLang = voiceState.lang;
      const savedPaused = voiceState.isPaused;
      
      this.play(savedText, savedTitle, savedLang);
      
      if (savedPaused) {
        this.pause();
      }
    }
  }
};

// Polyfill to load voices list early on startup for Google Chrome and Safari
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}
