import { useState, useEffect, useMemo } from 'react';
import { SupportedLanguage } from '../utils/translator';
import { TrendingUp, TrendingDown, ArrowRight, BellRing } from 'lucide-react';

interface TickerTapeProps {
  language: SupportedLanguage;
  district?: string;
}

interface CropAlert {
  id: string;
  enName: string;
  teName: string;
  hiName: string;
  basePrice: number;
  currentPrice: number;
  change: number; // percentage change, e.g. +1.4
  trend: 'up' | 'down' | 'stable';
}

export default function TickerTape({ language, district }: TickerTapeProps) {
  // Normalize the district
  const activeDistrict = useMemo(() => {
    return district || 'Guntur';
  }, [district]);

  // Translate crop dictionary
  const getTranslatedCrop = (alert: CropAlert) => {
    if (language === 'te') return alert.teName;
    if (language === 'hi') return alert.hiName;
    return alert.enName;
  };

  // Define crop seed data tailored to specific popular districts
  const districtCrops = useMemo<CropAlert[]>(() => {
    const loc = activeDistrict.toLowerCase();

    if (loc.includes('guntur') || loc.includes('vijayawada')) {
      return [
        { id: 'chilli', enName: 'Chilli', teName: 'మిరప', hiName: 'मिर्च', basePrice: 19500, currentPrice: 19500, change: 1.8, trend: 'up' },
        { id: 'paddy', enName: 'Rice (Paddy)', teName: 'వరి (ధాన్యం)', hiName: 'धान', basePrice: 2450, currentPrice: 2450, change: 0.5, trend: 'up' },
        { id: 'cotton', enName: 'Cotton', teName: 'పత్తి', hiName: 'कपास', basePrice: 7800, currentPrice: 7800, change: 0, trend: 'stable' },
        { id: 'turmeric', enName: 'Turmeric', teName: 'పసుపు', hiName: 'हल्दी', basePrice: 12100, currentPrice: 12100, change: 3.4, trend: 'up' },
        { id: 'maize', enName: 'Maize', teName: 'మొక్కజొన్న', hiName: 'मक्का', basePrice: 2150, currentPrice: 2150, change: -1.2, trend: 'down' },
      ];
    } else if (loc.includes('anantapur')) {
      return [
        { id: 'groundnut', enName: 'Groundnut', teName: 'వేరుశెనగ', hiName: 'मूंगफली', basePrice: 6200, currentPrice: 6200, change: 2.1, trend: 'up' },
        { id: 'millets', enName: 'Millets', teName: 'సజ్జలు', hiName: 'बाजरा', basePrice: 3400, currentPrice: 3400, change: 1.1, trend: 'up' },
        { id: 'orange', enName: 'Sweet Orange', teName: 'నారింజ', hiName: 'संतरा', basePrice: 4500, currentPrice: 4500, change: 0.8, trend: 'up' },
        { id: 'maize', enName: 'Maize', teName: 'మొక్కజొన్న', hiName: 'मक्का', basePrice: 2100, currentPrice: 2100, change: -0.5, trend: 'down' },
        { id: 'paddy', enName: 'Rice (Paddy)', teName: 'వరి (ధాన్యం)', hiName: 'धान', basePrice: 2400, currentPrice: 2400, change: 0.2, trend: 'up' },
      ];
    } else if (loc.includes('bhatinda') || loc.includes('punjab')) {
      return [
        { id: 'wheat', enName: 'Wheat', teName: 'గోధుమలు', hiName: 'गेहूं', basePrice: 2650, currentPrice: 2650, change: -0.8, trend: 'down' },
        { id: 'paddy', enName: 'Rice (Paddy)', teName: 'వరి (ధాన్యం)', hiName: 'धान', basePrice: 2450, currentPrice: 2450, change: 0.9, trend: 'up' },
        { id: 'cotton', enName: 'Cotton', teName: 'పత్తి', hiName: 'कपास', basePrice: 7600, currentPrice: 7600, change: 0, trend: 'stable' },
        { id: 'mustard', enName: 'Mustard', teName: 'ఆవాలు', hiName: 'सरसों', basePrice: 5450, currentPrice: 5450, change: 1.4, trend: 'up' },
        { id: 'barley', enName: 'Barley', teName: 'బార్లీ', hiName: 'जौ', basePrice: 2180, currentPrice: 2180, change: -0.4, trend: 'down' },
      ];
    } else {
      // General fallback district
      return [
        { id: 'paddy', enName: 'Rice (Paddy)', teName: 'వరి (ధాన్యం)', hiName: 'धान', basePrice: 2450, currentPrice: 2450, change: 0.6, trend: 'up' },
        { id: 'wheat', enName: 'Wheat', teName: 'గోధుమలు', hiName: 'गेहूं', basePrice: 2650, currentPrice: 2650, change: -0.3, trend: 'down' },
        { id: 'cotton', enName: 'Cotton', teName: 'పత్తి', hiName: 'कपास', basePrice: 7800, currentPrice: 7800, change: 0.1, trend: 'up' },
        { id: 'chilli', enName: 'Chilli', teName: 'మిరప', hiName: 'मिर्च', basePrice: 19500, currentPrice: 19500, change: 2.2, trend: 'up' },
        { id: 'millets', enName: 'Millets', teName: 'సజ్జలు', hiName: 'बाजరా', basePrice: 3400, currentPrice: 3400, change: 1.5, trend: 'up' },
        { id: 'maize', enName: 'Maize', teName: 'మొక్కజొన్న', hiName: 'मक्का', basePrice: 2150, currentPrice: 2150, change: -1.0, trend: 'down' },
      ];
    }
  }, [activeDistrict]);

  const [alerts, setAlerts] = useState<CropAlert[]>([]);

  // Initialize and simulate real-time price tick fluctuations
  useEffect(() => {
    // Map initial state
    setAlerts(
      districtCrops.map((c) => ({
        ...c,
        currentPrice: Math.round(c.basePrice * (1 + (Math.random() * 0.02 - 0.01))),
      }))
    );

    const interval = setInterval(() => {
      setAlerts((prev) =>
        prev.map((alert) => {
          // 30% chance of price drift
          if (Math.random() > 0.3) {
            const shift = Math.random() > 0.5 ? 1 : -1;
            const absoluteChange = Math.round(alert.basePrice * (Math.random() * 0.003)) * shift;
            const newPrice = Math.max(100, alert.currentPrice + absoluteChange);
            const rawDiff = ((newPrice - alert.basePrice) / alert.basePrice) * 100;
            const roundedDiff = Math.round(rawDiff * 10) / 10;
            const newTrend = roundedDiff > 0.1 ? 'up' : roundedDiff < -0.1 ? 'down' : 'stable';

            return {
              ...alert,
              currentPrice: newPrice,
              change: roundedDiff,
              trend: newTrend,
            };
          }
          return alert;
        })
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [districtCrops]);

  // Text translation indicators
  const labelText = () => {
    if (language === 'te') return 'ప్రత్యక్ష మార్కెట్ ధరలు - జిల్లా';
    if (language === 'hi') return 'लाइव मंडी भाव - जिला';
    return 'Live Price Alerts - District';
  };

  const getPricePerQty = (price: number) => {
    return '₹' + price.toLocaleString('en-IN') + '/Qtl';
  };

  return (
    <div 
      id="ticker-tape-container" 
      className="bg-stone-900 border-b border-stone-850 text-stone-200 select-none overflow-hidden relative flex items-center h-11"
    >
      {/* 1. Header prefix tag, absolutely positioned on the left with shadow boundary */}
      <div 
        id="ticker-leader-badge" 
        className="bg-green-600 text-white font-extrabold text-[10px] md:text-xs px-4 h-full flex items-center gap-2 z-10 shrink-0 shadow-[4px_0_12px_rgba(0,0,0,0.5)] uppercase tracking-wider font-display border-r border-green-500"
      >
        <BellRing className="w-3.5 h-3.5 animate-bounce text-yellow-300" />
        <span className="truncate max-w-[150px] md:max-w-none">
          {labelText()}: <span className="text-yellow-200 font-black">{activeDistrict}</span>
        </span>
      </div>

      {/* 2. Scrolling text wrapper */}
      <div className="relative w-full overflow-hidden flex items-center h-full">
        {/* Style block for smooth marquee looping */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-marquee-loop {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee-loop:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Duplicate items list to create infinite seamless loop */}
        <div className="animate-marquee-loop py-1.5 flex items-center gap-10 whitespace-nowrap">
          {/* First sequence */}
          {alerts.map((al) => (
            <div 
              key={`alert-1-${al.id}`} 
              id={`ticker-item-1-${al.id}`}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
            >
              <span className="text-stone-300 font-extrabold font-display">
                {getTranslatedCrop(al)}
              </span>
              <span className="font-mono text-white text-xs font-bold">
                {getPricePerQty(al.currentPrice)}
              </span>

              {al.trend === 'up' && (
                <span className="flex items-center gap-0.5 text-green-400 text-[10px] font-black bg-green-500/10 px-1.5 py-0.5 rounded-md border border-green-500/20">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span>+{al.change.toFixed(1)}%</span>
                </span>
              )}
              {al.trend === 'down' && (
                <span className="flex items-center gap-0.5 text-red-400 text-[10px] font-black bg-red-500/10 px-1.5 py-0.5 rounded-md border border-red-500/20">
                  <TrendingDown className="w-3 h-3 text-red-400" />
                  <span>{al.change.toFixed(1)}%</span>
                </span>
              )}
              {al.trend === 'stable' && (
                <span className="text-stone-400 text-[10px] font-bold bg-stone-700/30 px-1.5 py-0.5 rounded-md">
                  ▬ Stable
                </span>
              )}
            </div>
          ))}

          {/* Second sequence for seamless wrap */}
          {alerts.map((al) => (
            <div 
              key={`alert-2-${al.id}`} 
              id={`ticker-item-2-${al.id}`}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
            >
              <span className="text-stone-300 font-extrabold font-display">
                {getTranslatedCrop(al)}
              </span>
              <span className="font-mono text-white text-xs font-bold">
                {getPricePerQty(al.currentPrice)}
              </span>

              {al.trend === 'up' && (
                <span className="flex items-center gap-0.5 text-green-400 text-[10px] font-black bg-green-500/10 px-1.5 py-0.5 rounded-md border border-green-500/20">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span>+{al.change.toFixed(1)}%</span>
                </span>
              )}
              {al.trend === 'down' && (
                <span className="flex items-center gap-0.5 text-red-400 text-[10px] font-black bg-red-500/10 px-1.5 py-0.5 rounded-md border border-red-500/20">
                  <TrendingDown className="w-3 h-3 text-red-400" />
                  <span>{al.change.toFixed(1)}%</span>
                </span>
              )}
              {al.trend === 'stable' && (
                <span className="text-stone-400 text-[10px] font-bold bg-stone-700/30 px-1.5 py-0.5 rounded-md">
                  ▬ Stable
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
