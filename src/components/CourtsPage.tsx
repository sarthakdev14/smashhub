import React from 'react';
import { Court } from '../types';
import { Shield, Award, Target, Users } from 'lucide-react';

interface CourtsPageProps {
  darkMode: boolean;
  onBookCourt: (courtId: string) => void;
}

const courts: Court[] = [
  {
    id: '1',
    name: 'Pro Court',
    type: 'Professional',
    description: 'International standard court with premium maple wood flooring and professional lighting system.',
    features: ['Tournament-grade flooring', 'LED lighting', 'Electronic scoreboard', 'Player benches'],
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    price: 600
  },
  {
    id: '2',
    name: 'Match Court',
    type: 'Match-Ready',
    description: 'High-quality court perfect for competitive matches and serious training sessions.',
    features: ['Competition-grade flooring', 'Optimal lighting', 'Spectator seating', 'Equipment rental'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Badminton_at_the_2012_Summer_Olympics_9180.jpg',
    price: 500
  },
  {
    id: '3',
    name: 'Training Court',
    type: 'Training',
    description: 'Dedicated training court with practice equipment and coaching support.',
    features: ['Training aids', 'Ball machine access', 'Video analysis setup', 'Coach available'],
    imageUrl: 'https://i.ytimg.com/vi/d4QJMcvGfAc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAtpim32eLPr1x6E7JlxeNjBlCPpg',
    price: 400
  },
  {
    id: '4',
    name: 'Casual Court',
    type: 'Casual',
    description: 'Perfect for casual games and beginners looking to enjoy the sport.',
    features: ['Standard flooring', 'Basic equipment', 'Beginner-friendly', 'Flexible timing'],
    imageUrl: 'https://content.jdmagicbox.com/v2/comp/bangalore/e5/080pxx80.xx80.220610025143.c8e5/catalogue/game-point-badminton-arena-kereguddadahalli-bangalore-badminton-courts-ixftjr77oh.jpg',
    price: 300
  }
];

const getCourtIcon = (type: Court['type']) => {
  switch (type) {
    case 'Professional':
      return Shield;
    case 'Match-Ready':
      return Award;
    case 'Training':
      return Target;
    case 'Casual':
      return Users;
    default:
      return Shield;
  }
};

const CourtsPage: React.FC<CourtsPageProps> = ({ darkMode, onBookCourt }) => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Our Courts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courts.map((court) => {
            const Icon = getCourtIcon(court.type);
            return (
              <div
                key={court.id}
                className={`rounded-xl overflow-hidden ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg transition-all duration-300 hover:shadow-xl group`}
              >
                <div className="relative h-48">
                  <img
                    src={court.imageUrl}
                    alt={court.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      darkMode ? 'bg-blue-900/80 text-blue-100' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {court.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon className="w-6 h-6 text-blue-500" />
                    <h3 className="text-xl font-semibold">{court.name}</h3>
                  </div>
                  <p className="text-gray-500 mb-4">{court.description}</p>
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Features:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {court.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-500">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">₹{court.price}</span>
                    <button
                      onClick={() => onBookCourt(court.id)}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourtsPage;