import React, { useState, useEffect } from 'react';
import { SupportedLanguage } from '../utils/translator';
import { EquipmentItem, RentalBooking } from '../types';
import { Calendar, Layers, Phone, User, CheckCircle, Clock, ShieldCheck, X } from 'lucide-react';

interface EquipmentRentalProps {
  language: SupportedLanguage;
}

export default function EquipmentRental({ language }: EquipmentRentalProps) {
  const [machines, setMachines] = useState<EquipmentItem[]>([]);
  const [bookings, setBookings] = useState<RentalBooking[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<EquipmentItem | null>(null);

  // Booking Form state
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(1);
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const initialEquipment: EquipmentItem[] = [
    {
      id: 'eq_1',
      name: 'John Deere Tractor 5050D',
      type: 'Tractors',
      pricePerDay: 1800,
      imageUrl: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&q=80&w=600',
      description: 'Powerful 50 HP power steering tractor, ideal for critical deep ploughing, puddling, and heavy tillage operations.',
      specs: ['50 HP Engine', 'Dual Clutch', 'Power Steering', '8 Forward + 4 Reverse gears']
    },
    {
      id: 'eq_2',
      name: 'Kubota Paddy Combine Harvester',
      type: 'Harvesters',
      pricePerDay: 4500,
      imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600',
      description: 'High-speed track harvester. Minimizes grain loss significantly. Supports quick reaping, threshing, and cleaning.',
      specs: ['Rubber Crawler track', '70L Fuel capacity', '2.0-meter cutting width', 'Low ground pressure']
    },
    {
      id: 'eq_3',
      name: 'Pneumatic 4-Row Seed Drill',
      type: 'Seed drills',
      pricePerDay: 850,
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
      description: 'Ensures absolute uniformity in depth and row-spacing. Boosts germination rate by 25%. Safely treats seeds.',
      specs: ['4-Row Pneumatic operation', 'Universal seed rotor', 'Uniform depth gauge', 'Low draft requirement']
    },
    {
      id: 'eq_4',
      name: 'High Pressure Power Boom Sprayer',
      type: 'Sprayers',
      pricePerDay: 600,
      imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600',
      description: 'Wheel-driven high dispersion pressure boom sprayer. Ideal for pest-control and liquid organic bio-manure top dressing.',
      specs: ['600 Liter Tank', '12-Meter mist boom', 'Triplex piston pump', 'Pressure control lock']
    },
    {
      id: 'eq_5',
      name: 'Greaves Kirloskar Water Pump 5HP',
      type: 'Water pumps',
      pricePerDay: 400,
      imageUrl: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=600',
      description: 'Heavy duty, low diesel consumption water pump. Perfect for canal lifting and rapid flood irrigation management.',
      specs: ['5 HP engine', '3x3 inch suction delivery', 'Self-priming setup', '7 Hours continuous run']
    }
  ];

  // Retrieve current active bookings and equipment profiles
  useEffect(() => {
    setMachines(initialEquipment);
    const saved = localStorage.getItem('agri_rental_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {}
    }

    const activeUser = localStorage.getItem('agri_farmer_profile');
    if (activeUser) {
      try {
        const u = JSON.parse(activeUser);
        setFarmerName(u.name);
        setFarmerPhone(u.phone);
      } catch (e) {}
    }

    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMachine || !startDate || !farmerName || !farmerPhone) return;

    const totalCost = selectedMachine.pricePerDay * days;

    const newBooking: RentalBooking = {
      id: 'bk_' + Date.now().toString().slice(-4),
      equipmentId: selectedMachine.id,
      equipmentName: selectedMachine.name,
      startDate,
      days,
      totalCost,
      farmerName,
      farmerPhone,
      status: 'confirmed'
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('agri_rental_bookings', JSON.stringify(updated));

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedMachine(null);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto font-sans" id="rental-section">
      <div className="mb-6 pb-4 border-b border-gray-150">
        <h2 className="text-xl md:text-2xl font-black text-gray-800 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-emerald-600" />
          <span>{language === 'en' ? 'Machinery & Equipment Rental' : language === 'te' ? 'యంత్ర పరికరాల అద్దె కేంద్రం' : 'कृषि उपकरण किराया केंद्र'}</span>
        </h2>
        <p className="text-xs text-gray-500">
          {language === 'en' ? 'Book high-quality cooperative tractors, seed drills and sprayers nearby at subsidized daily rates' : 'పంచాయతీ మరియు సహకార సొసైటీ యంత్రాలు తక్కువ ధరకు అద్దెకు బుక్ చేసుకోండి.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((item, idx) => (
          <div key={item.id || idx} id={`rental-item-${item.id}`} className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-44 bg-gray-100 overflow-hidden relative shrink-0">
              <img referrerPolicy="no-referrer" src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-white/95 border border-emerald-100 backdrop-blur-xs py-1 px-3 rounded-full text-xs font-black text-emerald-800 shadow">
                ₹{item.pricePerDay} / day
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase font-bold inline-block">
                  {item.type}
                </span>
                <h3 className="font-extrabold text-gray-850 text-base mt-2">{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1 lines-2 leading-relaxed">{item.description}</p>
              </div>

              {/* Machinery specifications */}
              <div className="my-3.5 pt-2 border-t border-gray-50">
                <span className="text-[9px] text-gray-400 font-bold uppercase block mb-1">Specifications</span>
                <div className="flex flex-wrap gap-1">
                  {item.specs.map((sp, i) => (
                    <span key={i} className="text-[10px] bg-gray-50 border border-gray-100 rounded-md py-0.5 px-2 font-semibold text-gray-600">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <button
                id={`book-now-trigger-${item.id}`}
                onClick={() => { setSelectedMachine(item); }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl cursor-pointer text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                {language === 'en' ? 'Book Now' : 'అద్దెకు బుక్ చేయి'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RENTAL RESERVATION MODAL */}
      {selectedMachine && (
        <div id="booking-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedMachine(null)}></div>
          
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden border border-emerald-100 transform scale-100 transition-all">
            
            {/* Header banner */}
            <div className="bg-emerald-700 p-5 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] bg-white/20 text-yellow-300 font-extrabold px-3 py-0.5 rounded-full uppercase">
                  {selectedMachine.type}
                </span>
                <h3 className="text-base font-bold mt-1.5">{selectedMachine.name}</h3>
              </div>
              <button 
                id="close-booking-modal"
                onClick={() => setSelectedMachine(null)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {bookingSuccess ? (
                <div id="booking-confirmed-card" className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="font-extrabold text-emerald-950 text-base">
                    {language === 'en' ? 'Rental Booking Confirmed!' : 'బుకింగ్ విజయవంతంగా నమోదయింది!'}
                  </h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                    {language === 'en' 
                      ? 'Our Agronomist agent will call you within 2 hours to coordinate drops. Booking ID: ' + 'BK_' + Math.floor(Math.random() * 900)
                      : 'పరికరం లభ్యత మరియు డ్రాప్ టైం కోఆర్డినేట్ చేయుటకు నిపుణులు మీ నెంబర్ కి కాల్ చేస్తారు.'}
                  </p>
                </div>
              ) : (
                // BOOKING CONFIRMATION FORM
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{language === 'en' ? 'Start Date' : 'ప్రారంభ తేదీ'}</span>
                      </label>
                      <input
                        id="book-start-date"
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full text-xs bg-gray-50 border border-gray-200 py-2 px-3 rounded-xl outline-none focus:border-emerald-500 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-gray-400" />
                        <span>{language === 'en' ? 'Rental Days' : 'అద్దె రోజులు'}</span>
                      </label>
                      <input
                        id="book-days"
                        type="number"
                        min={1}
                        max={14}
                        required
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="w-full text-xs bg-gray-50 border border-gray-200 py-2 px-3 rounded-xl outline-none focus:border-emerald-500 font-extrabold font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>{language === 'en' ? 'Farmer Full Name' : 'రైతు పేరు'}</span>
                      </label>
                      <input
                        id="book-farmer-name"
                        type="text"
                        required
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="w-full text-xs bg-gray-50 border border-gray-200 py-2.5 px-3 rounded-xl text-gray-800 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{language === 'en' ? 'Contact Mobile No' : 'మొబైల్ ఫోన్'}</span>
                      </label>
                      <input
                        id="book-farmer-phone"
                        type="tel"
                        required
                        maxLength={10}
                        value={farmerPhone}
                        onChange={(e) => setFarmerPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-xs bg-gray-50 border border-gray-200 py-2.5 px-3 rounded-xl font-bold font-mono tracking-wider"
                      />
                    </div>
                  </div>

                  {/* Calculations summary */}
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between text-xs mt-2">
                    <div>
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Estimated Quote Rate</span>
                      <p className="text-gray-500 mt-0.5">₹{selectedMachine.pricePerDay} × {days} days</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Total Reservation Sum</span>
                      <p className="text-emerald-700 text-lg font-black truncate mt-0.5">₹{(selectedMachine.pricePerDay * days).toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <button
                    id="submit-rental-booking-btn"
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>{language === 'en' ? 'Confirm Rental Booking' : 'అద్దె బుకింగ్‌ను ధృవీకరించు'}</span>
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* USER BOOKINGS HISTORY */}
      {bookings.length > 0 && (
        <div className="mt-10 bg-emerald-50/20 p-5 rounded-2xl border border-emerald-100/60 font-sans">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            {language === 'en' ? 'Your Registered Cooperative Bookings' : 'మీరు అద్దెకు బుక్ చేసుకున్న పరికరాల హిస్టరీ'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bookings.map((bk, i) => (
              <div key={bk.id || i} id={`booking-item-${bk.id}`} className="bg-white border border-gray-150 p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-xs">
                <div>
                  <h5 className="text-xs font-extrabold text-emerald-850 truncate leading-tight">{bk.equipmentName}</h5>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Start: <span className="font-bold text-gray-700">{bk.startDate}</span> • Days: <span className="font-bold text-gray-700">{bk.days}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full font-bold uppercase tracking-wider inline-block">
                    {bk.status}
                  </span>
                  <p className="text-xs font-black text-emerald-700 mt-1">₹{bk.totalCost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
