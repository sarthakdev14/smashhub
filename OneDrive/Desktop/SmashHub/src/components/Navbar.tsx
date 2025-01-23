import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, currentPage, onNavigate }) => {
  return (
    <nav className={`fixed w-full z-50 p-4 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} shadow-lg backdrop-blur-sm transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold transform hover:scale-105 transition-transform duration-300">
          SmashHub
        </h1>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('home')}
            className={`font-medium transition-colors duration-300 ${
              currentPage === 'home' 
                ? (darkMode ? 'text-blue-400' : 'text-blue-600') 
                : 'hover:text-blue-500'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('courts')}
            className={`font-medium transition-colors duration-300 ${
              currentPage === 'courts' 
                ? (darkMode ? 'text-blue-400' : 'text-blue-600') 
                : 'hover:text-blue-500'
            }`}
          >
            Courts
          </button>
          <button
            onClick={() => onNavigate('bookings')}
            className={`font-medium transition-colors duration-300 ${
              currentPage === 'bookings' 
                ? (darkMode ? 'text-blue-400' : 'text-blue-600') 
                : 'hover:text-blue-500'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } transition-all duration-300 hover:rotate-12`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;