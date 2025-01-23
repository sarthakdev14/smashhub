import React, { useState } from 'react';
import { CreditCard, X } from 'lucide-react';
import { PaymentDetails } from '../types';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onPaymentComplete: () => void;
  darkMode: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onClose, onPaymentComplete, darkMode }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onPaymentComplete();
  };

  const inputClass = `w-full p-2 rounded-lg ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
      : 'bg-gray-50 border-gray-300 focus:border-blue-600'
  } border focus:ring-2 focus:ring-blue-500 transition-colors duration-300`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md rounded-xl shadow-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } p-6 transform transition-all duration-300 scale-100`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Payment Details</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          } flex justify-between items-center`}>
            <span>Amount to Pay:</span>
            <span className="text-xl font-bold">₹{amount}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Card Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                maxLength={16}
                placeholder="1234 5678 9012 3456"
                className={`${inputClass} pl-10`}
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Expiry Date</label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                maxLength={5}
                className={inputClass}
                value={paymentDetails.expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2);
                  }
                  setPaymentDetails({
                    ...paymentDetails,
                    expiryDate: value
                  });
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">CVV</label>
              <input
                type="password"
                required
                maxLength={3}
                placeholder="123"
                className={inputClass}
                value={paymentDetails.cvv}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
                })}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Card Holder Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className={inputClass}
              value={paymentDetails.name}
              onChange={(e) => setPaymentDetails({
                ...paymentDetails,
                name: e.target.value
              })}
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-lg font-medium relative overflow-hidden ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors duration-300`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span className="ml-2">Processing...</span>
              </div>
            ) : (
              'Pay ₹' + amount
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;