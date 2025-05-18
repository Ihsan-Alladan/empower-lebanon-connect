
import { supabase } from '@/integrations/supabase/client';

// Process a donation
export const processDonation = async (
  amount: number, 
  currency: string = 'USD',
  message?: string,
  isAnonymous: boolean = false,
  paymentMethod?: string
): Promise<boolean> => {
  // Get current user if not anonymous
  let userId = null;
  if (!isAnonymous) {
    const { data } = await supabase.auth.getUser();
    userId = data.user?.id;
  }
  
  // Insert donation record
  const { error } = await supabase
    .from('donations')
    .insert([{ 
      amount, 
      currency,
      message,
      is_anonymous: isAnonymous,
      payment_method: paymentMethod,
      user_id: userId
    }]);

  if (error) {
    console.error('Error processing donation:', error);
    throw error;
  }

  return true;
};

// Get recent donations
export const getRecentDonations = async (limit: number = 10): Promise<any[]> => {
  const { data, error } = await supabase
    .from('donations')
    .select(`
      id,
      amount,
      currency,
      message,
      is_anonymous,
      created_at,
      profiles:user_id (first_name, last_name)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent donations:', error);
    throw error;
  }

  return data.map(donation => {
    let donorName = 'Anonymous';
    
    if (!donation.is_anonymous && donation.profiles) {
      const firstName = donation.profiles?.first_name || '';
      const lastName = donation.profiles?.last_name || '';
      if (firstName || lastName) {
        donorName = `${firstName} ${lastName}`.trim();
      }
    }
    
    return {
      id: donation.id,
      amount: donation.amount,
      currency: donation.currency,
      message: donation.message,
      isAnonymous: donation.is_anonymous,
      donorName,
      date: donation.created_at
    };
  });
};
