
import { supabase } from '@/integrations/supabase/client';
import { Workshop } from '@/types/workshop';

// Fetch all workshops
export const fetchWorkshops = async (): Promise<Workshop[]> => {
  const { data, error } = await supabase
    .from('workshops')
    .select(`
      *,
      workshop_time_slots (time_slot)
    `);

  if (error) {
    console.error('Error fetching workshops:', error);
    throw error;
  }

  // Transform data to match Workshop interface
  return data.map(workshop => {
    const timeSlots = workshop.workshop_time_slots?.map((slot: any) => slot.time_slot) || [];

    return {
      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      date: workshop.date,
      timeSlots: timeSlots,
      location: workshop.location,
      instructor: workshop.instructor,
      category: workshop.category,
      imageUrl: workshop.image_url,
      availableSeats: workshop.available_seats
    };
  });
};

// Fetch workshops by category
export const fetchWorkshopsByCategory = async (category: string): Promise<Workshop[]> => {
  const { data, error } = await supabase
    .from('workshops')
    .select(`
      *,
      workshop_time_slots (time_slot)
    `)
    .eq('category', category);

  if (error) {
    console.error(`Error fetching ${category} workshops:`, error);
    throw error;
  }

  // Transform data (same logic as fetchWorkshops)
  return data.map(workshop => {
    const timeSlots = workshop.workshop_time_slots?.map((slot: any) => slot.time_slot) || [];

    return {
      id: workshop.id,
      title: workshop.title,
      description: workshop.description,
      date: workshop.date,
      timeSlots: timeSlots,
      location: workshop.location,
      instructor: workshop.instructor,
      category: workshop.category,
      imageUrl: workshop.image_url,
      availableSeats: workshop.available_seats
    };
  });
};

// Register for workshop
export const registerForWorkshop = async (
  workshopId: string, 
  timeSlot: string
): Promise<boolean> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error('User not authenticated');
  }
  
  const { error } = await supabase
    .from('workshop_registrations')
    .insert([
      { 
        workshop_id: workshopId, 
        user_id: userData.user.id,
        time_slot: timeSlot
      }
    ]);

  if (error) {
    console.error('Error registering for workshop:', error);
    throw error;
  }

  // Update available seats count if needed
  // This could be handled by a trigger in the database

  return true;
};

// Check if user is registered for a workshop
export const isRegisteredForWorkshop = async (workshopId: string): Promise<boolean> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    return false;
  }
  
  const { data, error } = await supabase
    .from('workshop_registrations')
    .select('id')
    .eq('workshop_id', workshopId)
    .eq('user_id', userData.user.id);

  if (error) {
    console.error('Error checking workshop registration:', error);
    return false;
  }

  return data && data.length > 0;
};
