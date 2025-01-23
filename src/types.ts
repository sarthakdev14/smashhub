export interface Booking {
  id: number;
  date: string;
  time: string;
  court: string;
  price: number;
  isPaid: boolean;
  isProcessing?: boolean;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export interface Court {
  id: string;
  name: string;
  type: 'Professional' | 'Match-Ready' | 'Training' | 'Casual';
  description: string;
  features: string[];
  imageUrl: string;
  price: number;
}