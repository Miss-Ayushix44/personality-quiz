import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { Persona } from '../App';

interface Question {
  id: number;
  question: string;
  options: Array<{
    text: string;
    value: string;
  }>;
}

interface QuizProps {
  onComplete: (persona: Persona) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/questions');
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      generatePersona(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption('');
    }
  };

  const generatePersona = async (finalAnswers: string[]) => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate-persona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const persona = await response.json();
      
      // Add a delay for dramatic effect
      setTimeout(() => {
        onComplete(persona);
      }, 2000);
    } catch (error) {
      console.error('Error generating persona:', error);
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading magical questions...</div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🔮</div>
          <div className="text-white text-2xl font-bold mb-2">Crafting Your Persona...</div>
          <div className="text-purple-200">The magical algorithms are working their enchantment</div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-200 text-sm">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="text-purple-200 text-sm">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-8 text-center leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option.value)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                  selectedOption === option.value
                    ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border-2 border-pink-400 shadow-lg'
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                }`}
              >
                <div className="text-white text-lg leading-relaxed">{option.text}</div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                currentQuestionIndex === 0
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                selectedOption
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{currentQuestionIndex === questions.length - 1 ? 'Generate Persona' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;