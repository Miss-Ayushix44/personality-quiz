import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { Sparkles, Wand2 } from 'lucide-react';

export interface Persona {
  title: string;
  dominantTrait: string;
  stats: {
    emotional: number;
    social: number;
    creative: number;
    wisdom: number;
    adventure: number;
    procrastination: number;
  };
  backstory: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [persona, setPersona] = useState<Persona | null>(null);

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleQuizComplete = (generatedPersona: Persona) => {
    setPersona(generatedPersona);
    setCurrentView('results');
  };

  const handleRestart = () => {
    setPersona(null);
    setCurrentView('welcome');
  };

  if (currentView === 'quiz') {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  if (currentView === 'results' && persona) {
    return <Results persona={persona} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Wand2 className="w-16 h-16 text-yellow-400 animate-pulse" />
              <Sparkles className="w-6 h-6 text-pink-400 absolute -top-2 -right-2 animate-spin" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Persona Generator
          </h1>
          
          <p className="text-xl text-purple-200 mb-8 leading-relaxed">
            Discover your magical RPG character through our whimsical personality quiz! 
            Answer quirky questions and unlock your unique persona with custom stats, 
            a mystical title, and an enchanting backstory.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-sm">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-pink-400 font-medium">🎭 Creative Titles</div>
              <div className="text-purple-200 text-xs">Unique RPG classes</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-blue-400 font-medium">📊 Custom Stats</div>
              <div className="text-purple-200 text-xs">6 personality traits</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-green-400 font-medium">📖 Witty Backstory</div>
              <div className="text-purple-200 text-xs">Personalized tales</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-yellow-400 font-medium">💫 Animated Results</div>
              <div className="text-purple-200 text-xs">Magical reveals</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10 md:col-span-2">
              <div className="text-purple-400 font-medium">📱 Share & Download</div>
              <div className="text-purple-200 text-xs">Show off your character</div>
            </div>
          </div>
          
          <button
            onClick={handleStartQuiz}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto space-x-2"
          >
            <Sparkles className="w-6 h-6" />
            <span>Begin Your Quest</span>
            <Wand2 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;