import React from 'react';
import { Trash2, CreditCard } from 'lucide-react';
import { Booking } from '../types';

interface BookingListProps {
  bookings: Booking[];
  onCancel: (id: number) => void;
  onPayment: (booking: Booking) => void;
  darkMode: boolean;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onCancel, onPayment, darkMode }) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No bookings yet. Book a court to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          } transition-all duration-300 transform hover:scale-[1.02]`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Court {booking.court}</h3>
              <p className="text-sm text-gray-500">
                {new Date(booking.date).toLocaleDateString()} at {booking.time}
              </p>
              <p className={`text-sm mt-1 ${booking.isPaid ? 'text-green-500' : 'text-yellow-500'}`}>
                {booking.isPaid ? '✓ Paid' : `Pending Payment: ₹${booking.price}`}
              </p>
            </div>
            <div className="flex space-x-2">
              {!booking.isPaid && (
                <button
                  onClick={() => onPayment(booking)}
                  disabled={booking.isProcessing}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-400'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                  } transition-colors duration-300 ${
                    booking.isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  title="Pay now"
                >
                  {booking.isProcessing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  ) : (
                    <CreditCard className="w-5 h-5" />
                  )}
                </button>
              )}
              <button
                onClick={() => onCancel(booking.id)}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400'
                    : 'bg-red-100 hover:bg-red-200 text-red-600'
                } transition-colors duration-300`}
                title="Cancel booking"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingList;