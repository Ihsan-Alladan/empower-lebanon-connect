
import { supabase } from '@/integrations/supabase/client';
import { Workshop } from '@/types/workshop';

// Get all workshops
export const getAllWorkshops = async (): Promise<Workshop[]> => {
  try {
    const { data, error } = await supabase
      .from('workshops')
      .select(`
        *,
        workshop_time_slots(*)
      `)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching workshops:', error);
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      date: new Date(item.date).toISOString(),
      timeSlots: item.workshop_time_slots || [],
      location: item.location,
      instructor: item.instructor,
      category: item.category as any, // Cast to WorkshopCategory
      imageUrl: item.image_url,
      availableSeats: item.available_seats,
    })) as Workshop[];
  } catch (error) {
    console.error('Error in getAllWorkshops:', error);
    return [];
  }
};

// Get workshops by category
export const getWorkshopsByCategory = async (category: string): Promise<Workshop[]> => {
  try {
    const { data, error } = await supabase
      .from('workshops')
      .select(`
        *,
        workshop_time_slots(*)
      `)
      .eq('category', category)
      .order('date', { ascending: true });

    if (error) {
      console.error(`Error fetching workshops for category ${category}:`, error);
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      date: new Date(item.date).toISOString(),
      timeSlots: item.workshop_time_slots || [],
      location: item.location,
      instructor: item.instructor,
      category: item.category as any, // Cast to WorkshopCategory
      imageUrl: item.image_url,
      availableSeats: item.available_seats,
    })) as Workshop[];
  } catch (error) {
    console.error(`Error in getWorkshopsByCategory for ${category}:`, error);
    return [];
  }
};

// Register for a workshop
export const registerForWorkshop = async (workshopId: string, userId: string, timeSlot: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('workshop_registrations')
      .insert([{
        workshop_id: workshopId,
        user_id: userId,
        time_slot: timeSlot
      }]);

    if (error) {
      console.error('Error registering for workshop:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in registerForWorkshop:', error);
    return false;
  }
};

// Check if user is registered for a workshop
export const isUserRegistered = async (workshopId: string, userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('workshop_registrations')
      .select('*')
      .eq('workshop_id', workshopId)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found - user is not registered
        return false;
      }
      console.error('Error checking workshop registration:', error);
      return false;
    }

    return data ? true : false;
  } catch (error) {
    console.error('Error in isUserRegistered:', error);
    return false;
  }
};
