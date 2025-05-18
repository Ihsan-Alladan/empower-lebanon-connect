import { supabase } from '@/integrations/supabase/client';

// Subscribe to newsletter
export const subscribeToNewsletter = async (email: string, firstName?: string): Promise<boolean> => {
  // Check if already subscribed
  const { data: existing, error: checkError } = await supabase
    .from('newsletter_subscribers')
    .select('id')
    .eq('email', email);

  if (checkError) {
    console.error('Error checking existing subscription:', checkError);
    throw checkError;
  }

  // If already subscribed, update to active if needed
  if (existing && existing.length > 0) {
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({ is_active: true })
      .eq('email', email);

    if (updateError) {
      console.error('Error updating subscription:', updateError);
      throw updateError;
    }
    return true;
  }

  // Otherwise create new subscription
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ 
      email, 
      first_name: firstName 
    }]);

  if (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }

  return true;
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (email: string): Promise<boolean> => {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({ is_active: false })
    .eq('email', email);

  if (error) {
    console.error('Error unsubscribing from newsletter:', error);
    throw error;
  }

  return true;
};
