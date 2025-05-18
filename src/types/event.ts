
export type EventCategory = 'social' | 'educational' | 'fundraising' | 'workshop' | 'networking' | 'community' | 'career' | string;

export interface Speaker {
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registeredAttendees: number;
  category: EventCategory;
  imageUrl?: string;
  image?: string;
  images?: string[];
  speakers?: Speaker[];
  highlights?: string[];
}

// Interface for event data coming from Supabase
export interface SupabaseEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered_attendees: number;
  category: string;
  image_url: string;
  event_images?: { url: string }[];
  event_speakers?: Speaker[];
  event_highlights?: { highlight: string }[];
  created_at?: string;
}
