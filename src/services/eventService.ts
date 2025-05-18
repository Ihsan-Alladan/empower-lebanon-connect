
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/event';

// Fetch all events
export const fetchEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*');

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  // Transform data to match Event interface
  return data.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category,
    image: event.image_url,
    imageUrl: event.image_url,
    capacity: event.capacity,
    registeredAttendees: event.registered_attendees || 0,
    images: [],
    speakers: []
  }));
};

// Fetch events by category
export const fetchEventsByCategory = async (category: string): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error(`Error fetching ${category} events:`, error);
    throw error;
  }

  // Transform data (same logic as fetchEvents)
  return data.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category,
    image: event.image_url,
    imageUrl: event.image_url,
    capacity: event.capacity,
    registeredAttendees: event.registered_attendees || 0,
    images: [],
    speakers: []
  }));
};

// Register for event
export const registerForEvent = async (eventId: string): Promise<boolean> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error('User not authenticated');
  }
  
  const { error } = await supabase
    .from('event_registrations')
    .insert([
      { 
        event_id: eventId, 
        user_id: userData.user.id
      }
    ]);

  if (error) {
    console.error('Error registering for event:', error);
    throw error;
  }

  // Update registered attendees count using a stored procedure
  const { error: updateError } = await supabase.rpc('increment_event_attendees', { 
    event_id: eventId 
  });

  if (updateError) {
    console.error('Error updating event attendees count:', updateError);
  }

  return true;
};

// Check if user is registered for an event
export const isRegisteredForEvent = async (eventId: string): Promise<boolean> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    return false;
  }
  
  const { data, error } = await supabase
    .from('event_registrations')
    .select('id')
    .eq('event_id', eventId)
    .eq('user_id', userData.user.id);

  if (error) {
    console.error('Error checking event registration:', error);
    return false;
  }

  return data && data.length > 0;
};

// Get registered events for current user
export const getUserRegisteredEvents = async (): Promise<Event[]> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error('User not authenticated');
  }
  
  const { data, error } = await supabase
    .from('event_registrations')
    .select(`
      events:event_id (*)
    `)
    .eq('user_id', userData.user.id);

  if (error) {
    console.error('Error fetching user registered events:', error);
    throw error;
  }

  return data.map(registration => {
    const event = registration.events;
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      image: event.image_url,
      imageUrl: event.image_url,
      capacity: event.capacity,
      registeredAttendees: event.registered_attendees || 0,
      images: [],
      speakers: []
    };
  });
};
