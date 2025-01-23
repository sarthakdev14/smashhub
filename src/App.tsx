import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CourtsPage from './components/CourtsPage';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import PaymentModal from './components/PaymentModal';
import { Booking } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'courts' | 'bookings'>('home');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addBooking = (booking: Booking) => {
    setBookings([...bookings, { ...booking, id: Date.now() }]);
    setShowBookingModal(false);
    setCurrentPage('bookings');
  };

  const cancelBooking = (id: number) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  const handlePayment = (booking: Booking) => {
    setSelectedBooking(booking);
    setBookings(bookings.map(b => 
      b.id === booking.id ? { ...b, isProcessing: true } : b
    ));
  };

  const handlePaymentComplete = () => {
    if (selectedBooking) {
      setBookings(bookings.map(booking =>
        booking.id === selectedBooking.id
          ? { ...booking, isPaid: true, isProcessing: false }
          : booking
      ));
      setSelectedBooking(null);
    }
  };

  const handleBookCourt = (courtId: string) => {
    setSelectedCourtId(courtId);
    setShowBookingModal(true);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <LandingPage 
            darkMode={darkMode} 
            onGetStarted={() => setCurrentPage('courts')} 
          />
        );
      case 'courts':
        return (
          <div className="min-h-screen">
            <CourtsPage 
              darkMode={darkMode} 
              onBookCourt={handleBookCourt} 
            />
          </div>
        );
      case 'bookings':
        return (
          <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8">Your Bookings</h2>
              <div className={`p-6 rounded-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}>
                <BookingList 
                  bookings={bookings} 
                  onCancel={cancelBooking} 
                  onPayment={handlePayment}
                  darkMode={darkMode} 
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        currentPage={currentPage}
        onNavigate={(page: string) => setCurrentPage(page as 'home' | 'courts' | 'bookings')}
      />

      {renderContent()}

      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md rounded-xl shadow-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-6 transform transition-all duration-300 scale-100`}>
            <h2 className="text-2xl font-bold mb-6">Book Your Court</h2>
            <BookingForm 
              onSubmit={addBooking} 
              darkMode={darkMode} 
              courtId={selectedCourtId}
              onCancel={() => setShowBookingModal(false)}
            />
          </div>
        </div>
      )}

      {selectedBooking && (
        <PaymentModal
          amount={selectedBooking.price}
          onClose={() => {
            setSelectedBooking(null);
            setBookings(bookings.map(b => 
              b.id === selectedBooking.id ? { ...b, isProcessing: false } : b
            ));
          }}
          onPaymentComplete={handlePaymentComplete}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;