
import { supabase } from '@/integrations/supabase/client';
import { Event, SupabaseEvent } from '@/types/event';

// Get all events
export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_images (*),
        event_speakers (*),
        event_highlights (*)
      `)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }

    return transformEvents(data);
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    return [];
  }
};

// Get events by category
export const getEventsByCategory = async (category: string): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_images (*),
        event_speakers (*),
        event_highlights (*)
      `)
      .eq('category', category)
      .order('date', { ascending: true });

    if (error) {
      console.error(`Error fetching events for category ${category}:`, error);
      return [];
    }

    return transformEvents(data);
  } catch (error) {
    console.error(`Error in getEventsByCategory for ${category}:`, error);
    return [];
  }
};

// Get event by ID
export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_images (*),
        event_speakers (*),
        event_highlights (*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      return null;
    }

    if (!data) return null;

    const events = transformEvents([data]);
    return events.length > 0 ? events[0] : null;
  } catch (error) {
    console.error(`Error in getEventById for ${id}:`, error);
    return null;
  }
};

// Register for an event
export const registerForEvent = async (eventId: string, userId: string): Promise<boolean> => {
  try {
    // First, register the user for the event
    const { error: registrationError } = await supabase
      .from('event_registrations')
      .insert([{
        event_id: eventId,
        user_id: userId
      }]);

    if (registrationError) {
      console.error('Error registering for event:', registrationError);
      return false;
    }

    try {
      // Fix: Use the rpc method correctly with the function name as a string parameter
      const { error } = await supabase.rpc('increment_event_attendees', {
        event_id: eventId
      });

      if (error) {
        console.error('Error incrementing attendee count:', error);
        // We don't return false here, as the user is still registered
      }
    } catch (functionError) {
      console.error('Error calling increment_event_attendees function:', functionError);
    }

    return true;
  } catch (error) {
    console.error('Error in registerForEvent:', error);
    return false;
  }
};

// Check if user is registered for an event
export const isUserRegistered = async (eventId: string, userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking event registration:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in isUserRegistered:', error);
    return false;
  }
};

// Helper function to transform event data
const transformEvents = (data: SupabaseEvent[]): Event[] => {
  return data.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    capacity: event.capacity,
    registeredAttendees: event.registered_attendees,
    category: event.category,
    imageUrl: event.image_url,
    images: event.event_images?.map(img => img.url) || [],
    speakers: event.event_speakers || [],
    highlights: event.event_highlights?.map(h => h.highlight) || []
  }));
};
