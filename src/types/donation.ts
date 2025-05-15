
export type DonationStatus = 'completed' | 'pending' | 'refunded' | 'flagged';
export type PaymentMethod = 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'Cash' | 'Other';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

export interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  currency: Currency | string;
  payment_method: PaymentMethod | string;
  cause: string;
  date: string;
  is_anonymous: boolean;
  status: DonationStatus;
  message?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export interface DonationCause {
  id: string;
  name: string;
  description: string;
  target_amount: number;
  current_amount: number;
  image_url: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DonationStatistics {
  totalThisMonth: number;
  totalAllTime: number;
  donorCount: number;
  averageDonation: number;
  monthlyTrends?: { month: string; amount: number }[];
  causeDistribution?: { cause: string; amount: number }[];
  anonymousPercentage?: number;
}
