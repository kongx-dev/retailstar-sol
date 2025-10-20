import React, { useState } from 'react';
import SEOHead from '../../components/SEOHead';

const ArchetypeQuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What's your ideal domain vibe?",
      options: [
        "Dark and mysterious",
        "Bright and energetic", 
        "Professional and clean",
        "Chaotic and meme-y"
      ]
    },
    {
      question: "How do you approach Web3?",
      options: [
        "I'm here for the tech",
        "I'm here for the money",
        "I'm here for the community",
        "I'm here for the memes"
      ]
    },
    {
      question: "What's your favorite domain type?",
      options: [
        "Short and punchy (3-5 chars)",
        "Descriptive and clear (6-10 chars)",
        "Brandable and unique (any length)",
        "Meme-worthy and viral (any length)"
      ]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getArchetype = () => {
    const score = answers.reduce((sum, answer) => sum + answer, 0);
    
    if (score <= 2) return {
      name: "Tech Architect",
      description: "You build the infrastructure. Clean, professional domains that mean business.",
      domains: ["deploydeck.sol", "commandhub.sol", "rigbuilder.sol"],
      color: "cyan"
    };
    if (score <= 5) return {
      name: "Alpha Hunter", 
      description: "You find the gems before anyone else. Strategic domains with high potential.",
      domains: ["alphastalker.sol", "alphatracker.sol", "bagcultist.sol"],
      color: "green"
    };
    if (score <= 8) return {
      name: "Community Builder",
      description: "You bring people together. Social domains that build connections.",
      domains: ["loungeprotocol.sol", "retailverse.sol", "mallprotocol.sol"],
      color: "purple"
    };
    return {
      name: "Meme Lord",
      description: "You understand the culture. Viral domains that capture the zeitgeist.",
      domains: ["copevendor.sol", "fudscience.sol", "jpegdealer.sol"],
      color: "pink"
    };
  };

  if (showResults) {
    const archetype = getArchetype();
    
    return (
      <>
        <SEOHead 
          target="retailstar.sol"
          pageType="tool"
          customTitle="Archetype Quiz Results | Your Domain Personality"
          customDescription={`Discover your domain archetype: ${archetype.name}. Find domains that match your Web3 personality and style.`}
          canonicalUrl="https://retailstar.xyz/tools/archetype-quiz"
        />
        
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
          
          <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
                🎭 Your Domain Archetype
              </h1>
            </div>

            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-8 text-center">
              <div className={`w-24 h-24 bg-${archetype.color}-600 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-4xl">🎯</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">{archetype.name}</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {archetype.description}
              </p>

              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Recommended Domains</h3>
                <div className="space-y-2">
                  {archetype.domains.map((domain, index) => (
                    <div key={index} className="text-lg font-mono text-cyan-300">
                      {domain}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setShowResults(false);
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Take Quiz Again
                </button>
                <a
                  href="/directory"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Browse All Domains
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="tool"
        customTitle="Domain Archetype Quiz | Discover Your .sol Personality"
        customDescription="Find your perfect domain archetype with our personality quiz. Get personalized .sol domain recommendations based on your Web3 style."
        canonicalUrl="https://retailstar.xyz/tools/archetype-quiz"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
              🎭 Domain Archetype Quiz
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover your domain personality and get personalized .sol recommendations that match your Web3 vibe.
            </p>
          </div>

          <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Question {currentQuestion + 1} of {questions.length}</span>
                <span className="text-sm text-cyan-400">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-cyan-500 rounded-lg p-4 text-left transition-colors"
                  >
                    <span className="text-cyan-400 font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchetypeQuizPage;
