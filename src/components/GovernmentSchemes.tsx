import React, { useState } from 'react';
import { SupportedLanguage } from '../utils/translator';
import { SchemeInfo } from '../types';
import { Landmark, Search, CheckCircle, Calculator, FileText, ChevronRight, Award, Sparkles, HelpCircle } from 'lucide-react';

interface GovernmentSchemesProps {
  language: SupportedLanguage;
}

export default function GovernmentSchemes({ language }: GovernmentSchemesProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'calc'>('info');
  const [searchQuery, setSearchQuery] = useState('');

  // Eligibility Calculator states
  const [landOwned, setLandOwned] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [isTaxPayee, setIsTaxPayee] = useState('no');
  const [calcResult, setCalcResult] = useState<Array<{ name: string; eligible: boolean; benefit: string; desc: string }>>([]);
  const [calcSubmitted, setCalcSubmitted] = useState(false);

  // Core Government Schemes Information
  const schemes: SchemeInfo[] = [
    {
      id: 'scheme_pmkisan',
      name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      localName: 'పీఎం కిసాన్ సమ్మాన్ నిధి / पीएम-किसान',
      description: 'An initiative by the Government of India that guarantees direct income support of ₹6,000 per year in three equal installments directly into the bank accounts of all landholding farmer families.',
      benefits: [
        '₹6,000 yearly cash support transmitted directly to Aadhaar seeded bank accounts',
        'Distributed as ₹2,000 cash installments every 4 months',
        'Protects small farmers from falling into informal seed money debts'
      ],
      eligibility: [
        'All small and marginal landholding farmer families in India',
        'Must possess cultivable agricultural land registered in their name',
        'Excludes institutional land holders and active income tax payers'
      ],
      howToApply: [
        'Apply online at pmkisan.gov.in official portal',
        'Produce land patta papers, Aadhaar Card, Passport photo and Bank Passbook',
        'Verify identity at nearest village Common Service Center (CSC) or Rythu Bharosa Kendra'
      ],
      officialUrl: 'https://pmkisan.gov.in'
    },
    {
      id: 'scheme_pmfby',
      name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
      localName: 'ఫసల్ బీమా యోజన (పంట బీమా) / पीएम फसल बीमा योजना',
      description: 'Government sponsored crop insurance program integrating yield protection. Secures farmer assets against natural disasters, rainfall deficits, pests, droughts and localized crop failures.',
      benefits: [
        'Comprehensive financial insurance coverage for crop losses from sowing to post-harvest',
        'Very low premium payable by farmers: strictly capped at 2% for Kharif and 1.5% for Rabi crops',
        'Fast institutional claims processing using real-time satellite crop imagery'
      ],
      eligibility: [
        'All Indian farmers growing notified food, oilseeds and commercial/horticulture crops',
        'Both owner-cultivators and tenant farmers are eligible to purchase coverage',
        'Farmers with active Kisan Credit Card (KCC) loans are automatically enrolled'
      ],
      howToApply: [
        'Enroll through your bank branch holding the crop loan card, or via official pmfby.gov.in portal',
        'Upload Sowing Certificate signed by local Revenue Officer, Land records, and bank accounts',
        'Pay premium before specified sowing deadlines'
      ],
      officialUrl: 'https://pmfby.gov.in'
    },
    {
      id: 'scheme_shc',
      name: 'Soil Health Card Scheme',
      localName: 'భూసార పరీక్ష కేంద్రం పథకం / मृदा स्वास्थ्य कार्ड योजना',
      description: 'Provides customized cards detailing nutrient status (chemical elements like Nitrogen, Phosphorus, Potassium, Zinc, pH level) of farm fields, combined with exact fertilizer dosing recommendations.',
      benefits: [
        'Saves up to ₹10,000 per acre by preventing excessive chemical fertilizer application',
        'Boosts overall grain output by replenishing targeted micronutrient deficiencies',
        'Saves soil quality and ground-water tables from chemical acidic damage'
      ],
      eligibility: [
        'All land-holding farmers across every state in India are eligible to receive soil analysis cards for free of cost'
      ],
      howToApply: [
        'Local Agriculture Officers will periodically collect soil samples directly from your farm',
        'Farmers can manually register custom soil samples on official soilhealth.dac.gov.in portal',
        'Test results and custom cards are printed and handed over within 3 weeks'
      ],
      officialUrl: 'https://soilhealth.dac.gov.in'
    },
    {
      id: 'scheme_kcc',
      name: 'Kisan Credit Card (KCC) Scheme',
      localName: 'కిసాన్ క్రెడిట్ కార్డ్ రుణాలు / किसान क्रेडिट कार्ड',
      description: 'Provides farmers with single-window access to incredibly cheap credit (loans) for seeds, fertilizer procurement, tractor costs, and post-harvest household expenses with simplified bank overdraft facilities.',
      benefits: [
        'Flexible crop loans up to ₹3,00,000 with highly subsidized interest rates as low as 4% yearly',
        'Includes accidental insurance cover up to ₹50,000',
        'No collateral security required for crop loans up to ₹1.6 Lakhs'
      ],
      eligibility: [
        'All active cultivators, owner-cultivators, tenant farmers, and oral lessees',
        'Self Help Groups (SHGs) or Joint Liability Groups of farmers'
      ],
      howToApply: [
        'Apply at any commercial, rural or cooperative bank near your village',
        'Provide Land ownership documents (B1/Adangal records), Aadhaar card, and crop sowing plans',
        'Card issued with credit limit matching your cultivable acreage and crop pattern'
      ]
    }
  ];

  const handleCalculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!landOwned || !annualIncome) return;

    const acres = Number(landOwned);
    const income = Number(annualIncome);

    const outcomes = [
      {
        name: 'PM-KISAN Cash Support',
        eligible: income < 180000 && isTaxPayee === 'no' && acres > 0,
        benefit: '₹6,000 Bank Cash Transfer (₹2,000 every four months)',
        desc: 'Provides cash flow backing to buy seeds and organic components annually.'
      },
      {
        name: 'Kisan Credit Card (Low Interest Crop Loan)',
        eligible: acres > 0,
        benefit: 'Up to ₹' + Math.min(300000, Math.round(acres * 40000)) + ' Loan Limit at 4% Interest Rate',
        desc: 'Easy credit backing to buy inputs, hire workers or finance sprayers.'
      },
      {
        name: 'PM Fasal Bima Yojana (Crop Insurance)',
        eligible: acres > 0,
        benefit: 'Yield Loss Insurance Capped at 2% premium payment',
        desc: 'Protects against dry spells, heavy rains, insect outbreaks and localized washouts.'
      },
      {
        name: 'Free Soil Health Card analysis',
        eligible: acres > 0,
        benefit: 'Soil sample testing and fertilizer prescription card completely free',
        desc: 'Identifies exact NPK deficiencies to optimize crop yield.'
      }
    ];

    setCalcResult(outcomes);
    setCalcSubmitted(true);
  };

  const filteredSchemes = schemes.filter(sc => {
    return sc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (sc.localName && sc.localName.toLowerCase().includes(searchQuery.toLowerCase())) ||
           sc.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto font-sans" id="schemes-section">
      {/* Tab Controller headers */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
          <button
            id="scheme-tab-info"
            onClick={() => { setActiveTab('info'); }}
            className={`py-2 px-5 rounded-xl font-bold text-xs md:text-sm cursor-pointer transition-all ${activeTab === 'info' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-emerald-800'}`}
          >
            📋 {language === 'en' ? 'Explore Govt Schemes' : ' పథకాల వివరాలు'}
          </button>
          <button
            id="scheme-tab-calc"
            onClick={() => { setActiveTab('calc'); setCalcSubmitted(false); }}
            className={`py-2 px-5 rounded-xl font-bold text-xs md:text-sm cursor-pointer transition-all ${activeTab === 'calc' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-emerald-800'}`}
          >
            🧮 {language === 'en' ? 'Eligibility Calculator' : ' నేను అర్హుడనా? బహుమతి కాలిక్యులేటర్'}
          </button>
        </div>
      </div>

      {activeTab === 'info' ? (
        // INFO GRID
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-800 flex items-center gap-2">
                <Landmark className="w-6 h-6 text-emerald-600" />
                <span>{language === 'en' ? 'Government Farmer Subsidies' : 'ప్రభుత్వ సహాయక పథకాలు & రాయితీలు'}</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'en' ? 'Get accurate guidelines and application details for Indian Ministry of Agriculture initiatives' : 'రైతుల కోసం భారత ప్రభుత్వం రూపొందించిన ఉపయోగకర సహాయక పథకాలు సాకారం చేసుకోండి.'}
              </p>
            </div>

            {/* Search scheme */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                id="search-schemes-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'en' ? 'Search schemes...' : 'పథకాలు వెతకండి...'}
                className="text-xs bg-white border border-gray-200 py-2.5 pl-9 pr-4 rounded-xl outline-none focus:border-emerald-500 w-52 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchemes.map((sc, index) => (
              <div key={sc.id || index} id={`scheme-card-${sc.id}`} className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
                
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Landmark className="w-32 h-32 text-emerald-800" />
                </div>

                <div className="relative z-10">
                  <h4 className="font-extrabold text-emerald-900 text-sm md:text-base">{sc.name}</h4>
                  {sc.localName && (
                    <span className="bg-emerald-50 text-emerald-800 font-bold text-[10px] py-0.5 px-2.5 rounded-md inline-block mt-1">
                      {sc.localName}
                    </span>
                  )}
                  <p className="text-xs text-gray-600 leading-relaxed mt-2.5">{sc.description}</p>

                  <div className="mt-4 space-y-3.5">
                    {/* Benefits list */}
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase mb-1">🎁 Core Benefits</span>
                      <ul className="space-y-1">
                        {sc.benefits.map((b, i) => (
                          <li key={i} className="text-xs font-semibold text-emerald-800 flex items-start gap-1.5 leading-tight">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Eligibility List */}
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase mb-1">⚖️ Eligibility Criteria</span>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-gray-600 font-semibold leading-tight">
                        {sc.eligibility.map((el, i) => <li key={i}>{el}</li>)}
                      </ul>
                    </div>

                    {/* How to Apply */}
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase mb-1">✍️ How to Enroll</span>
                      <ol className="list-decimal pl-4 space-y-1 text-xs text-gray-600 leading-tight">
                        {sc.howToApply.map((step, i) => <li key={i}>{step}</li>)}
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Application links */}
                {sc.officialUrl && (
                  <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end">
                    <a
                      id={`apply-link-${sc.id}`}
                      href={sc.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{language === 'en' ? 'Official Portal' : 'వెబ్సైట్ కి వెళ్ళు'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      ) : (
        // ELIGIBILITY CALCULATOR FORM & RESULT
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-emerald-100 shadow-md max-w-2xl mx-auto">
          <div className="flex items-center gap-3-mb-4 pb-4 border-b border-gray-150 mb-4 justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-emerald-600" />
              <h3 className="font-extrabold text-gray-800 text-base md:text-lg">
                {language === 'en' ? 'Agricultural Eligibility Checker' : 'సహాయక పథకాల అర్హత గణన కేంద్రం'}
              </h3>
            </div>
            <span className="bg-yellow-100 text-yellow-800 font-bold text-[10px] rounded-full py-1 px-3 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
              <span>Instantly calculated</span>
            </span>
          </div>

          <form onSubmit={handleCalculateEligibility} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === 'en' ? 'How many Cultivatable Acres owned?' : 'మీ పేరు మీద ఉన్న రిజిస్టర్ వ్యవసాయ భూమి (ఎకరాలలో)'} *
                </label>
                <input
                  id="calc-land-input"
                  type="number"
                  step={0.1}
                  required
                  placeholder="e.g. 2.5"
                  value={landOwned}
                  onChange={(e) => setLandOwned(e.target.value)}
                  className="w-full text-xs bg-gray-50 border border-gray-200 py-2.5 px-4 rounded-xl outline-none focus:border-emerald-500 font-bold font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === 'en' ? 'Estimated Family Farming Income (₹ / Annual)' : 'కుటుంబ వార్షిక వ్యవసాయ వ్యయ ఆదాయము (₹)'} *
                </label>
                <input
                  id="calc-income-input"
                  type="number"
                  step={5000}
                  required
                  placeholder="e.g. 120000"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full text-xs bg-gray-50 border border-gray-200 py-2.5 px-4 rounded-xl outline-none focus:border-emerald-500 font-bold font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                {language === 'en' ? 'Are you or anyone in family paying active Income Tax?' : 'మీ కుటుంబంలో ఎవరైనా ఆదాయపు పన్ను (Income Tax) చెల్లిస్తున్నారా?'}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-gray-700">
                  <input
                    id="calc-tax-no"
                    type="radio"
                    name="isTax"
                    value="no"
                    checked={isTaxPayee === 'no'}
                    onChange={() => setIsTaxPayee('no')}
                    className="accent-emerald-600 w-4 h-4 cursor-pointer"
                  />
                  <span>No (లేదు)</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-gray-700">
                  <input
                    id="calc-tax-yes"
                    type="radio"
                    name="isTax"
                    value="yes"
                    checked={isTaxPayee === 'yes'}
                    onChange={() => setIsTaxPayee('yes')}
                    className="accent-emerald-600 w-4 h-4 cursor-pointer"
                  />
                  <span>Yes (అవును)</span>
                </label>
              </div>
            </div>

            <button
              id="calc-submit-btn"
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Award className="w-5 h-5 animate-bounce" />
              <span>{language === 'en' ? 'Verify My Eligible Cash & Insurance Programs' : 'నా అర్హతలు తనిఖీ చేయి'}</span>
            </button>
          </form>

          {/* Results display */}
          {calcSubmitted && (
            <div id="calculator-outcomes" className="mt-6 pt-6 border-t border-gray-150 space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {language === 'en' ? 'Your Tailored Eligible Government assistances' : 'మీరు అర్హత సాధించిన ప్రభుత్వ సాయ వివరాలు'}:
              </h4>

              <div className="grid grid-cols-1 gap-3.5">
                {calcResult.map((res, i) => (
                  <div key={i} id={`calc-res-${i}`} className={`p-4 rounded-2xl border flex flex-col justify-between ${res.eligible ? 'bg-emerald-50/50 border-emerald-100/80' : 'bg-gray-50 border-gray-250 opacity-60'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h5 className="text-xs md:text-sm font-extrabold text-emerald-900">{res.name}</h5>
                        <p className="text-[11px] text-gray-500 mt-0.5">{res.desc}</p>
                      </div>
                      <span className={`text-[10px] font-bold py-0.5 px-2.5 rounded-full uppercase shrink-0 ${res.eligible ? 'bg-emerald-100 text-emerald-850' : 'bg-red-50 text-red-750'}`}>
                        {res.eligible ? 'Eligible' : 'Not Qualified'}
                      </span>
                    </div>

                    {res.eligible && (
                      <div className="mt-3 bg-white p-2.5 rounded-xl border border-emerald-100/60 text-xs">
                        <span className="text-[10px] font-bold text-emerald-700 block uppercase">💰 Estimated Benefit Package</span>
                        <p className="font-extrabold text-emerald-900 mt-0.5">{res.benefit}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="bg-red-50 text-red-900 p-3 rounded-lg text-[10px] font-medium leading-relaxed flex items-center gap-1.5 mt-4">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Please match details with primary village Adangal (land title deed records) at nearest Rythu Bharosa Kendra for physical application filings.</span>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
