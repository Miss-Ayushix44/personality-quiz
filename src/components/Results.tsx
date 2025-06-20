import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Share2, 
  RotateCcw, 
  Heart, 
  Eye, 
  Palette, 
  Brain, 
  MapPin, 
  Clock,
  Sparkles,
  Crown,
  Scroll
} from 'lucide-react';
import { Persona } from '../App';
import StatBar from './StatBar';

interface ResultsProps {
  persona: Persona;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ persona, onRestart }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const statConfig = [
    { key: 'emotional', label: 'Emotional Damage Resistance', icon: Heart, color: 'from-red-500 to-pink-500' },
    { key: 'social', label: 'Social Stealth', icon: Eye, color: 'from-blue-500 to-cyan-500' },
    { key: 'creative', label: 'Creative Chaos', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { key: 'wisdom', label: 'Wisdom Accumulation', icon: Brain, color: 'from-green-500 to-teal-500' },
    { key: 'adventure', label: 'Adventure Seeking', icon: MapPin, color: 'from-orange-500 to-red-500' },
    { key: 'procrastination', label: 'Procrastination Mastery', icon: Clock, color: 'from-yellow-500 to-orange-500' }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My RPG Persona: ${persona.title}`,
          text: `I just discovered I'm a ${persona.title}! ${persona.backstory}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const text = `My RPG Persona: ${persona.title}\n\n${persona.backstory}\n\nGenerated at ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Persona copied to clipboard!');
    });
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 1000;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1e1b4b');
    gradient.addColorStop(0.5, '#312e81');
    gradient.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(persona.title, canvas.width / 2, 100);

    // Stats
    let y = 200;
    ctx.font = '24px Arial';
    statConfig.forEach((stat) => {
      const value = persona.stats[stat.key as keyof typeof persona.stats];
      ctx.fillText(`${stat.label}: ${value}`, canvas.width / 2, y);
      y += 40;
    });

    // Backstory
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    const words = persona.backstory.split(' ');
    let line = '';
    y = 500;
    const maxWidth = 720;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, 40, y);
        line = words[i] + ' ';
        y += 30;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 40, y);

    // Download
    const link = document.createElement('a');
    link.download = `${persona.title.replace(/\s+/g, '_')}_persona.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-4">
            <Crown className="w-16 h-16 text-yellow-400 animate-bounce" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Behold Your Persona!
          </h1>
          <p className="text-purple-200 text-xl">Your magical character has been revealed</p>
        </div>

        {/* Character Title Card */}
        <div className={`bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 mb-8 transition-all duration-1000 delay-300 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-pink-400 animate-spin" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{persona.title}</h2>
            <div className="inline-block bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/50 rounded-full px-6 py-2">
              <span className="text-pink-300 font-medium capitalize">{persona.dominantTrait} Specialist</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`grid md:grid-cols-2 gap-6 mb-8 transition-all duration-1000 delay-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {statConfig.map((stat, index) => (
            <div key={stat.key} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} mr-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{stat.label}</h3>
                  <p className="text-purple-200 text-sm">Level {persona.stats[stat.key as keyof typeof persona.stats]}</p>
                </div>
              </div>
              <StatBar 
                value={persona.stats[stat.key as keyof typeof persona.stats]} 
                gradient={stat.color}
                delay={index * 200}
              />
            </div>
          ))}
        </div>

        {/* Backstory */}
        <div className={`bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 mb-8 transition-all duration-1000 delay-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center mb-6">
            <Scroll className="w-8 h-8 text-yellow-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Your Epic Backstory</h3>
          </div>
          <p className="text-purple-100 text-lg leading-relaxed">{persona.backstory}</p>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-900 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={handleShare}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Persona</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download Image</span>
          </button>
          
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Create New Persona</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;