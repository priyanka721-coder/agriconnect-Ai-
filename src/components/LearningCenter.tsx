import { useState } from 'react';
import { SupportedLanguage } from '../utils/translator';
import { BookOpen, Award, FileText, CheckCircle, HelpCircle, XCircle, ChevronRight } from 'lucide-react';

interface LearningCenterProps {
  language: SupportedLanguage;
}

interface Article {
  title: string;
  category: string;
  readTime: string;
  summary: string;
  details: string[];
}

export default function LearningCenter({ language }: LearningCenterProps) {
  const [activeTab, setActiveTab] = useState<'reading' | 'quiz'>('reading');
  const [activeArticle, setActiveArticle] = useState<number | null>(null);

  // Farming Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Structured Training Articles
  const articles: Article[] = [
    {
      title: 'A-Z Guide on Organic Bio-Composting',
      category: 'Organic Farming',
      readTime: '4 min read',
      summary: 'Learn how to transform agricultural waste, dry leaves, crop stalks and cow dung into high fertility organic compost.',
      details: [
        'Collect 60% dried biomass (leaves, straw, woody trimmings) and 40% green biomass (grass, vegetable leftovers, cow manure).',
        'Construct a 3x3x3 ft compost heap or dig a compost pit in a shaded area of the farm.',
        'Layer dry biomass first, then moist green biomass. Add thin layers of fertile farm soil in between to supply critical composting microbes.',
        'Moisten the heap weekly to maintain optimal damp sponge-like moisture level. Do not saturate with water.',
        'Aerate (turn) the compost heap once every 14 days with a pitchfork to supply oxygen.',
        'Within 60-90 days, the materials decompose into crumbly, dark black organic compost smelling of rich earth. Apply 5 tons/acre.'
      ]
    },
    {
      title: 'Optimal Drip Irrigation Setup & Subsidies',
      category: 'Smart Irrigation',
      readTime: '5 min read',
      summary: 'Save up to 60% of water, prevent weed growth, and feed liquid fertilizer directly to plant roots using drop systems.',
      details: [
        'Configure the main sub-surface pipe network linked to a sand/disc filter system to prevent emitter clogging.',
        'Calculate layout spacing matching crop lines: maintain 1.5 ft dripper spacing for narrow row crops (Chilli/Vegetables) and 4.0 ft for wide crops (Banana/Sugarcane).',
        'Operate drip cycles early in mornings (5 AM to 8 AM) to minimize evaporation water loss.',
        'Practice fertigation: dissolve liquid urea and soluble NPK fertilizers directly into irrigation tanks to save 30% fertilizer doses.',
        'Submit applications at local block development office to access up to 90% government subsidies for under privileged farmers.'
      ]
    },
    {
      title: 'Sustainable Pest Management (IPM) Techniques',
      category: 'Pesticides & Bio-control',
      readTime: '6 min read',
      summary: 'Protect cash crops from pink bollworms, sucking pests, spider mites and leaf miners without heavy chemical toxicity.',
      details: [
        'Deploy yellow sticky trap cards (10 traps per acre) to easily monitor and capture thrips, aphids and whiteflies early on.',
        'Configure pheromone trap buckets (5 per acre) in Chilli/Cotton plots to trap pink bollworm male moths and stop breeding cycles.',
        'Prepare organic 5% Neem Seed Kernel Extract (NSKE) spray mixture: smash neem seeds, soak in water overnight, filter and spray.',
        'Protect natural predators like ladybird beetles and lacewings which devour up to 50 aphids daily.',
        'Only spray chemical insecticides (like Spiromesifen/Imidacloprid) as a final resort when pest populations exceed Economic Threshold limits.'
      ]
    }
  ];

  // Quiz Questions Pool
  const quizQuestions = [
    {
      q: 'Which element is highly essential for strong leaf growth and healthy green foliage color early in crop duration?',
      options: ['Nitrogen (N) / యూరియా', 'Phosphorus (P)', 'Potassium (K)', 'Zinc'],
      answer: 0,
      ex: 'Nitrogen (contained in major doses in Urea) is responsible for chlorophyll synthesis, promoting rapid leafy vegetation early in crop lifecycle.'
    },
    {
      q: 'How can small holdings save up to 60% of irrigation water and prevent excessive weed seed germination?',
      options: ['Flood irrigation (పారకడం)', 'Drip Irrigation (బిందు సేద్యం)', 'Sprinklers', 'Manual Bucketing'],
      answer: 1,
      ex: 'Drip systems direct water solely drop-by-drop to plant roots, significantly cutting down evaporation loss and leaving dry corridors where weeds cannot grow.'
    },
    {
      q: 'Which of the following acts as an excellent, organic, non-toxic pesticide repellent against sucking aphids and mites?',
      options: ['Urea solution', 'Neem Seed Kernel Extract (NSKE)', 'Common Salt salt mist', 'Kerosene spray'],
      answer: 1,
      ex: 'Neem-based compounds contain Azadirachtin, which acts as a powerful feeding deterrent and disrupts the growth cycles of soft-bodied insect pests.'
    }
  ];

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto font-sans" id="learning-section">
      {/* Upper toggle tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
          <button
            id="learning-reading-tab"
            onClick={() => { setActiveTab('reading'); }}
            className={`py-2 px-5 rounded-xl font-bold text-xs md:text-sm cursor-pointer transition-all ${activeTab === 'reading' ? 'bg-emerald-600 text-white shadow' : 'text-gray-600 hover:text-emerald-800'}`}
          >
            📖 {language === 'en' ? 'Farming Articles' : 'వ్యవసాయ సాంకేతిక పాఠాలు'}
          </button>
          <button
            id="learning-quiz-tab"
            onClick={() => { setActiveTab('quiz'); restartQuiz(); }}
            className={`py-2 px-5 rounded-xl font-bold text-xs md:text-sm cursor-pointer transition-all ${activeTab === 'quiz' ? 'bg-emerald-600 text-white shadow' : 'text-gray-600 hover:text-emerald-800'}`}
          >
            🎓 {language === 'en' ? 'Take Knowledge Quiz' : 'రైతు శాస్త్రవేత్త క్విజ్'}
          </button>
        </div>
      </div>

      {activeTab === 'reading' ? (
        // ARTICLES MANUAL READ
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black text-gray-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              <span>{language === 'en' ? 'Farming Wisdom Center' : 'సహాయక వ్యవసాయ శిక్షణా సమాచారం'}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'en' ? 'Expert guidelines compiled in simple steps on sustainability, organic composting, and pest deterrents.' : 'అధిక దిగుబడి సాదించుటకు ఉపయోగకరమైన పద్ధతులు మరియు చిట్కాలు ఇక్కడ చదవండి..'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art, idx) => (
              <div key={idx} id={`article-card-${idx}`} className="bg-white p-5 rounded-2xl border border-gray-150 hover:shadow-md transition-shadow relative flex flex-col justify-between">
                <div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-800 font-extrabold py-0.5 px-2.5 rounded-full uppercase">
                    {art.category}
                  </span>
                  <h4 className="font-extrabold text-gray-800 text-sm md:text-base mt-2.5 leading-tight">{art.title}</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{art.summary}</p>
                </div>

                <div className="pt-4 border-t border-gray-50 mt-4 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                  <span>{art.readTime}</span>
                  <button
                    id={`read-article-btn-${idx}`}
                    onClick={() => { setActiveArticle(activeArticle === idx ? null : idx); }}
                    className="text-emerald-700 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>{activeArticle === idx ? (language === 'en' ? 'Close Details' : 'మూసివేయి') : (language === 'en' ? 'Read Now' : 'ఇక్కడ చదువు')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Expanded Article detail card */}
          {activeArticle !== null && (
            <div id="expanded-article-panel" className="bg-emerald-50/50 p-6 rounded-3xl border-2 border-emerald-100 max-w-2xl mx-auto mt-8 relative">
              <span className="text-[10px] text-emerald-800 font-extrabold block uppercase tracking-wider mb-1">Active Study Guide</span>
              <h3 className="font-extrabold text-gray-800 text-lg">{articles[activeArticle].title}</h3>

              <ul className="space-y-3 mt-4">
                {articles[activeArticle].details.map((detail, stepId) => (
                  <li key={stepId} className="text-xs md:text-sm text-gray-700 leading-relaxed font-semibold flex items-start gap-2.5">
                    <span className="bg-emerald-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      {stepId + 1}
                    </span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        // INTERACTIVE MULTICHOICE FARMERS QUIZ
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-emerald-100 shadow-md max-w-xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-gray-150 mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-600 animate-bounce" />
              <h3 className="font-extrabold text-gray-800 text-base md:text-lg">
                {language === 'en' ? 'Agri-Smart Knowledge Quiz' : 'రైతు మేధస్సు క్విజ్ పోటీ'}
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold py-1 px-3 rounded-full uppercase">
              Q: {currentQuestion + 1} / {quizQuestions.length}
            </span>
          </div>

          {!quizFinished ? (
            // ACTIVE QUESTION SCREEN
            <div className="space-y-5">
              <h4 className="font-bold text-gray-800 text-sm md:text-base leading-relaxed">
                {quizQuestions[currentQuestion].q}
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {quizQuestions[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    id={`quiz-opt-${i}`}
                    onClick={() => handleAnswerSelect(i)}
                    className={`text-left text-xs md:text-sm py-3 px-4 rounded-xl border font-semibold block w-full transition-all cursor-pointer ${selectedAnswer === i ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-500' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 text-xs text-yellow-905">
                  <span className="font-bold block uppercase mb-0.5">💡 Expert Fact</span>
                  <p className="font-medium leading-relaxed">{quizQuestions[currentQuestion].ex}</p>
                </div>
              )}

              <button
                id="quiz-next-question-btn"
                disabled={selectedAnswer === null}
                onClick={handleNextQuestion}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer text-xs uppercase tracking-wider shrink-0"
              >
                {currentQuestion + 1 === quizQuestions.length ? (language === 'en' ? 'Finish Quiz' : 'ముగించు') : (language === 'en' ? 'Next Question' : 'తదుపరి ప్రశ్న')}
              </button>
            </div>
          ) : (
            // RESULTS SUMMARY SCOREBOARD
            <div id="quiz- scoreboard" className="text-center py-6 space-y-4 font-semibold text-xs md:text-sm text-gray-600">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mx-auto">
                <Award className="w-10 h-10 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h4 className="text-emerald-950 font-extrabold text-md md:text-lg">
                  {score === quizQuestions.length ? (language === 'en' ? 'Exceptional! Certified Krishi Expert' : 'శభాష్! వ్యవసాయ రంగ నిపుణుడు అవార్డు') : (language === 'en' ? 'Excellent Effort!' : 'అద్భుతమైన కృషి!')}
                </h4>
                <p className="text-xs text-gray-400">
                  {language === 'en' ? 'You completed the Agri-Smart quiz pool' : 'విజయవంతంగా క్విజ్ పూర్తి చేశారు'}
                </p>
                <div className="text-emerald-600 text-3xl font-black tracking-widest pt-2 font-mono">
                  {score} / {quizQuestions.length}
                </div>
              </div>

              <button
                id="quiz-restart-btn"
                onClick={restartQuiz}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-6 rounded-full cursor-pointer shadow hover:shadow-md transition-all text-xs font-bold uppercase tracking-wider inline-block mt-2"
              >
                {language === 'en' ? 'Test Again' : 'మరోసారి ప్రయత్నించు'}
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
