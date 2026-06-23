import React, { useState } from 'react';
import { SupportedLanguage } from '../utils/translator';
import { Phone, Mail, MapPin, Send, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  language: SupportedLanguage;
}

export default function ContactPage({ language }: ContactPageProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !issue) return;

    // Simulate record saving to localStorage database
    const savedInquiries = localStorage.getItem('agri_contact_inquiries');
    const existing = savedInquiries ? JSON.parse(savedInquiries) : [];
    existing.push({
      id: Date.now().toString(),
      name,
      phone,
      issue,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('agri_contact_inquiries', JSON.stringify(existing));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setIssue('');
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto font-sans" id="contact-us-page">
      <div className="mb-8 pb-4 border-b border-gray-150 text-center">
        <span className="bg-emerald-105 text-emerald-800 font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Kisan Panchayat helpline</span>
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-gray-800">
          {language === 'en' ? 'Get Direct Agricultural Expert Support' : language === 'te' ? 'వ్యవసాయ నిపుణులతో సంప్రదించండి' : 'कृषि विशेषज्ञ सीधे सहायता'}
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-xl mx-auto">
          {language === 'en' ? 'Connect with state agronomists, Rythu Seva Kendras, and block officers instantly for ground clearing details' : 'మీ వ్యవసాయ డౌట్లు తీరునట్లుగా నేరుగా సహాయక కేంద్రాన్ని సంప్రదించవచ్చు.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* official Contact Channels details */}
        <div className="space-y-6">
          <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/60 shadow-xs relative overflow-hidden">
            <h3 className="font-extrabold text-gray-800 text-base md:text-lg mb-4">
              {language === 'en' ? 'Direct Toll-Free Kisan Call Centers' : 'ఉచిత కిసాన్ సహాయక విచారణ కేబిన్'}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase">National Call Center</h4>
                  <a href="tel:18001801551" className="text-emerald-800 font-extrabold text-base md:text-lg hover:underline">
                    1800-180-1551
                  </a>
                  <p className="text-[10px] text-gray-500 font-semibold leading-tight mt-0.5">
                    {language === 'en' ? 'Free Toll-Free support speaking English, Hindi, Telugu, and 12 other languages (6 AM to 10 PM daily)' : 'ఉదయం 6 నుండి రాత్రి 10 గంటల వరకు అన్ని భాషల్లో నిపుణుల సేవ ఉచితం.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase">Agronomist Email Support</h4>
                  <a href="mailto:support@agriconnect-ai.in" className="text-emerald-800 font-extrabold text-sm md:text-base hover:underline block">
                    support@agriconnect-ai.in
                  </a>
                  <p className="text-[10px] text-gray-500 font-semibold mt-0.5">
                    Send leaves or soil report files for deep scientific analysis. Response within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase">Cooperative Headquarters</h4>
                  <p className="text-xs text-gray-800 font-bold leading-normal">
                    Rythu Seva Bhavan, Guntur Main Rd, Near Town Hall, Andhra Pradesh, India - 522003
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-150 text-xs flex gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-gray-800 block mb-0.5">Emergency Pest Outbreaks?</span>
              <p className="text-gray-500 font-semibold leading-relaxed leading-tight text-[11px]">
                {language === 'en'
                  ? 'If you observe sudden massive locust swarms or fast plant withering, immediately contact local Rythu Bharosa Kendra officers or dial toll-free for drone sprayer arrangements.'
                  : 'పంట చేనుకు పురుగుల బెడద తీవ్రంగా ఉంటే వెంటనే స్థానిక మండల వ్యవసాయ సహాయ నిపుణులను కలవండి.'}
              </p>
            </div>
          </div>
        </div>

        {/* HELP REQUEST FORM */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-emerald-100 shadow-md">
          {submitted ? (
            <div id="contact-success-card" className="text-center py-10 space-y-3.5">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="font-extrabold text-emerald-950 text-base">
                {language === 'en' ? 'Inquiry Submitted Successfully!' : 'సందేశం విజయవంతంగా సమర్పించబడింది!'}
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                {language === 'en'
                  ? 'A designated block agrologist has been scheduled to review your crops. Check back shortly!'
                  : 'వ్యవసాయ నిపుణులు శీఘ్రంగా మీ మొబైల్ నెంబర్ తో కాంటాక్ట్ అవుతారు.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-xs text-gray-700">
              <h3 className="font-extrabold text-gray-800 text-base mb-3 border-b border-gray-50 pb-2 shrink-0">
                {language === 'en' ? 'Submit Farm Issue Inquiry Card' : 'మీ చేను సమస్యను మాకు తెలపండి'}
              </h3>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  {language === 'en' ? 'Farmer Full Name' : 'రైతు పూర్తి పేరు'} *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full text-xs bg-gray-50 border border-gray-200 py-2.5 px-4 rounded-xl outline-none focus:border-emerald-500 focus:bg-white font-semibold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  {language === 'en' ? 'Mobile Phone Number' : 'మొబైల్ ఫోన్ సంఖ్య'} *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 9876543210"
                  className="w-full text-xs bg-gray-50 border border-gray-200 py-2.5 px-4 rounded-xl outline-none focus:border-emerald-500 focus:bg-white font-bold font-mono text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  {language === 'en' ? 'Describe your farm soil or crop pest issue...' : 'సమస్య వివరణ (e.g. మిరపలో ఆకు ముడత బెడద తీవ్రంగా ఉంది)'} *
                </label>
                <textarea
                  id="contact-issue"
                  required
                  rows={4}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder={language === 'en' ? 'Describe leaf color changes, stem rotting details, or water problems...' : 'వ్యాధి వచ్చిన ప్రదేశం, ఎరుపు ఆకుల రంగు మార్పులు రాయండి...'}
                  className="w-full text-xs bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl outline-none focus:border-emerald-500 focus:bg-white font-medium text-gray-700 leading-relaxed"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow transition-colors cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Send className="w-4.5 h-4.5" />
                <span>{language === 'en' ? 'Submit Inquiry Ticket' : 'సమర్పించండి'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
