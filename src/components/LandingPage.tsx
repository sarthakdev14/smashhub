import React from 'react';
import { ArrowRight, Shield, Trophy, Users } from 'lucide-react';
import Spline from '@splinetool/react-spline';

interface LandingPageProps {
  darkMode: boolean;
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ darkMode, onGetStarted }) => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Spline
            scene="https://prod.spline.design/Sct0TiRTPuS9vWmy/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white pointer-events-none">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Experience the Perfect <br />
            <span className="text-blue-400">Badminton Court</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Professional courts, world-class facilities, and a vibrant community of players.
            Book your court today and elevate your game.
          </p>
          <button
            onClick={onGetStarted}
            className="group flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 pointer-events-auto"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg transition-transform duration-300 hover:scale-105`}>
              <Trophy className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Courts</h3>
              <p className="text-gray-500">
                International standard courts with perfect lighting and professional flooring.
              </p>
            </div>
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg transition-transform duration-300 hover:scale-105`}>
              <Shield className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Facilities</h3>
              <p className="text-gray-500">
                Changing rooms, equipment rental, and dedicated warm-up areas.
              </p>
            </div>
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg transition-transform duration-300 hover:scale-105`}>
              <Users className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Active Community</h3>
              <p className="text-gray-500">
                Join tournaments, find playing partners, and improve your game.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;