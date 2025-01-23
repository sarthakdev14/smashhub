import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { Booking } from '../types';

interface BookingFormProps {
  onSubmit: (booking: Booking) => void;
  darkMode: boolean;
  courtId: string | null;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, darkMode, courtId, onCancel }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculatePrice = (courtNumber: string, timeString: string) => {
    const hour = parseInt(timeString.split(':')[0]);
    const basePrice = 500; // Base price ₹500
    const peakHourMultiplier = (hour >= 17 && hour <= 21) ? 1.5 : 1; // 50% more during peak hours
    const premiumCourtMultiplier = parseInt(courtNumber) <= 2 ? 1.2 : 1; // 20% more for premium courts
    return Math.round(basePrice * peakHourMultiplier * premiumCourtMultiplier);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const price = calculatePrice(courtId || '1', time);
    onSubmit({
      date,
      time,
      court: courtId || '1',
      id: 0,
      price,
      isPaid: false
    });
    
    setDate('');
    setTime('');
    setIsLoading(false);
  };

  const inputClass = `w-full p-2 rounded-lg ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
      : 'bg-gray-50 border-gray-300 focus:border-blue-600'
  } border focus:ring-2 focus:ring-blue-500 transition-colors duration-300`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Book Court {courtId}</h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Select Date</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${inputClass} pl-10`}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Select Time</label>
        <div className="relative">
          <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`${inputClass} pl-10`}
            min="06:00"
            max="22:00"
          />
        </div>
      </div>

      {time && courtId && (
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-gray-700' : 'bg-gray-100'
        } mb-4`}>
          <div className="flex justify-between items-center">
            <span>Estimated Price:</span>
            <span className="text-xl font-bold">₹{calculatePrice(courtId, time)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {parseInt(courtId) <= 2 && '✨ Premium court surcharge applied'}
            {time && parseInt(time.split(':')[0]) >= 17 && parseInt(time.split(':')[0]) <= 21 && 
              ' • 🌙 Peak hours rate applied'}
          </p>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className={`flex-1 py-3 px-4 rounded-lg font-medium ${
            darkMode
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-200 hover:bg-gray-300'
          } transition-colors duration-300`}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 py-3 px-4 rounded-lg font-medium relative overflow-hidden ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors duration-300 ${
            isLoading ? 'cursor-not-allowed opacity-80' : ''
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="ml-2">Processing...</span>
            </div>
          ) : (
            'Book Court'
          )}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;