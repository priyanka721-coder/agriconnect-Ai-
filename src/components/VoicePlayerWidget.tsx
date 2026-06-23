import { useState, useEffect } from 'react';
import { VoiceEngine, SpeechEngineState, SpeechSpeed } from '../utils/voiceEngine';
import { SupportedLanguage } from '../utils/translator';
import { Play, Pause, Square, Volume2, Snail, Bolt, ChevronRight, Activity, HelpCircle } from 'lucide-react';

interface VoicePlayerWidgetProps {
  language: SupportedLanguage;
}

export default function VoicePlayerWidget({ language }: VoicePlayerWidgetProps) {
  const [state, setState] = useState<SpeechEngineState>(VoiceEngine.getState());

  useEffect(() => {
    // Subscribe to VoiceEngine changes
    const unsubscribe = VoiceEngine.subscribe((newState) => {
      setState(newState);
    });

    // Support standard dynamic 'play-speech' event triggers across all files
    const handleGlobalTrigger = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.text) {
        VoiceEngine.play(detail.text, detail.title || 'Agricultural Advisory', detail.language || language);
      }
    };

    window.addEventListener('play-speech', handleGlobalTrigger);
    return () => {
      unsubscribe();
      window.removeEventListener('play-speech', handleGlobalTrigger);
    };
  }, [language]);

  // Handle Play/Pause trigger toggling
  const handleTogglePlay = () => {
    if (state.isSpeaking) {
      if (state.isPaused) {
        VoiceEngine.resume();
      } else {
        VoiceEngine.pause();
      }
    } else if (state.currentText) {
      VoiceEngine.play(state.currentText, state.currentTitle, state.lang);
    }
  };

  const handleStop = () => {
    VoiceEngine.stop();
  };

  const handleSpeedChange = (speed: SpeechSpeed) => {
    VoiceEngine.setSpeed(speed);
  };

  // Do not occupy screen space if there is no audio being synthesized
  if (!state.isSpeaking && !state.currentText) {
    return null;
  }

  // Multi-lingual labels
  const getSpeedLabel = (sp: SpeechSpeed) => {
    if (language === 'te') {
      if (sp === 'slow') return 'మెల్లగా (0.8x)';
      if (sp === 'normal') return 'సాధారణ (1.0x)';
      return 'వేగంగా (1.2x)';
    }
    if (language === 'hi') {
      if (sp === 'slow') return 'धीमी (0.8x)';
      if (sp === 'normal') return 'सामान्य (1.0x)';
      return 'तेज (1.2x)';
    }
    if (sp === 'slow') return 'Slow (0.8x)';
    if (sp === 'normal') return 'Normal (1.0x)';
    return 'Fast (1.2x)';
  };

  const getStatusLabel = () => {
    if (state.isPaused) {
      return language === 'te' ? 'ఆడియో నిలిపివేయబడింది' : language === 'hi' ? 'आवाज रुकी हुई है' : 'Audio Paused';
    }
    return language === 'te' ? 'ఆడియో చదువుతోంది...' : language === 'hi' ? 'आवाज चल रही है...' : 'Speaking aloud...';
  };

  return (
    <div 
      id="voice-companion-player-bar"
      className="fixed bottom-24 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:w-full md:max-w-xl bg-stone-900 border border-stone-800 text-white rounded-3xl p-4 shadow-2xl z-50 transition-all duration-300 animate-slide-up"
    >
      <div className="flex flex-col gap-3">
        {/* Header containing metadata playing info */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <span className="absolute animate-ping inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <Volume2 className="w-4 h-4 text-green-450 shrink-0 animate-bounce" />
            <span className="text-[10px] uppercase font-black tracking-widest text-green-400 font-display">
              {state.currentTitle || 'Agri Companion'}
            </span>
            <ChevronRight className="w-3 h-3 text-stone-600" />
            <span className="text-[10px] font-bold text-stone-400 truncate max-w-[140px] md:max-w-[180px]">
              {getStatusLabel()}
            </span>
          </div>

          {/* Prompt/Guide hint */}
          <span className="text-[9px] text-stone-500 font-bold hidden md:inline-flex items-center gap-1 font-display">
            <HelpCircle className="w-3 h-3" />
            Indian Female Voice Voiceover Customizer Enabled
          </span>
        </div>

        {/* Core Media Progress / Controls Line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Controls Cluster */}
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              id="global-voice-play-pause"
              onClick={handleTogglePlay}
              className={`h-9 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                state.isPaused 
                  ? 'bg-green-600 hover:bg-green-500 text-white shadow-md shadow-green-900/30' 
                  : 'bg-stone-800 hover:bg-stone-750 text-white border border-stone-700'
              }`}
              title={state.isPaused ? 'Resume playing' : 'Pause speech'}
            >
              {state.isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5 fill-white text-white" />}
              <span>{state.isPaused ? (language === 'te' ? 'పునఃప్రారంభించు' : language === 'hi' ? 'शुरू करें' : 'Resume') : (language === 'te' ? 'ఆపు (పాజ్)' : language === 'hi' ? 'रोकें' : 'Pause')}</span>
            </button>

            {/* Stop Button */}
            <button
              id="global-voice-stop"
              onClick={handleStop}
              className="bg-red-650 hover:bg-red-600 text-white h-9 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-red-900/10 border border-red-500/20"
              title="Stop entirely"
            >
              <Square className="w-3 h-3 fill-white" />
              <span>{language === 'te' ? 'పూర్తిగా ఆపు' : language === 'hi' ? 'बंद करें' : 'Stop'}</span>
            </button>
          </div>

          {/* Speed settings selectors */}
          <div className="flex items-center gap-1 bg-stone-950/80 p-0.5 rounded-xl border border-stone-800 self-start sm:self-auto">
            {(['slow', 'normal', 'fast'] as SpeechSpeed[]).map((sp) => {
              const active = state.speed === sp;
              return (
                <button
                  key={sp}
                  id={`global-voice-speed-${sp}`}
                  onClick={() => handleSpeedChange(sp)}
                  className={`py-1.5 px-3 rounded-lg text-[10px] font-extrabold tracking-wider transition-all cursor-pointer uppercase flex items-center gap-1 ${
                    active 
                      ? 'bg-green-600 text-white font-black shadow-sm' 
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {sp === 'slow' && <Snail className="w-3 h-3 shrink-0" />}
                  <span>{getSpeedLabel(sp)}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Display subtitle visualizer box */}
        <div className="bg-stone-950/40 border border-stone-850 p-2.5 rounded-xl text-xs leading-relaxed max-h-16 overflow-y-auto font-sans font-semibold text-stone-300">
          <p className="line-clamp-2 italic">
            "{state.currentText}"
          </p>
        </div>

      </div>
    </div>
  );
}
